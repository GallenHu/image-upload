export default function imageUpload({ path, file, headers, beforeUpload, uploading, success, error }) {
  console.log(path, headers, success, error);

  const r = new XMLHttpRequest();
  const errorCallback = error || function () { console.log('AJAX ERROR!'); }
  const method = 'POST';
  const nameInForm = 'img';
  const nameInServer = `img_${Date.now()}`;

  const isFunction = (arg) => typeof arg === 'function';

  const readFile = (file) => {
    const reader = new FileReader();

    return new Promise((resolve) => {
      reader.onload = (e) => {
        resolve(e);
      };

      reader.readAsDataURL(file);
    });
  };

  if (isFunction(beforeUpload)) beforeUpload();

  r.onreadystatechange = () => {
    if (r.readyState === XMLHttpRequest.DONE) {
      if (r.status === 200) {
        // success
        let json = r.responseText;
        try {
          json = JSON.parse(json);
        } catch (_e) {
          errorCallback(_e);
        }
        if (isFunction(success)) success(json);
      } else {
        // error
        errorCallback(r.responseText);
      }
    }
  };

  r.upload.onprogress = (e) => {
    const loaded = e.loaded;
    const total = e.total;
    const percent = Math.floor(100*loaded/total);
    if (isFunction(uploading)) uploading(percent);
  };

  r.open(method, path, true);

  if (typeof headers === 'object') {
    for (let key in headers) {
      r.setRequestHeader(key, headers[key]);
    }
  }

  // const formData = new FormData();
  // formData.append(nameInForm, file, nameInServer);

  // start
  // r.send(formData);
  readFile(file).then((evt) => {
    const { result } = evt.target;  // data:image/jpeg;base64,/9j/4QAYRXhpZgAASUk...
    r.send(result.split(',')[1]);
  });

  return r;
}

window.imageUpload = imageUpload;
