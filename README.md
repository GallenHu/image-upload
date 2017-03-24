# image-upload
Another Small And Simple JavaScript Image Uploader Library

## Usage
```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>image-upload</title>
</head>
<body>
<h1>
  image-upload
</h1>
<div>
  <input type="file" id="uploader">
</div>

<script src="../dist/image-upload.js"></script>
<script src="./index.js"></script>
</body>
</html>

```

```js
document.getElementById('uploader').addEventListener('change', function (e) {
  const file = e.target.files && e.target.files[0];
  const token = 'yourToken';
  const headers = {
    'Host': 'upload.qiniu.com',
    'Content-Type': 'application/octet-stream',
    'Authorization': "UpToken " + token,
  };
  const fileSize = file.size;

  // start
  imageUpload({
    path: 'http://upload.qiniu.com/putb64/' + fileSize,
    file: file,
    headers: headers,
    beforeUpload: function () {
      console.log('beforeUploadCallback');
    },
    uploading: function (percent) {
      console.log(percent);
    },
    success: function (res) {
      console.log(res);
    },
    error: function (err) {
      console.log(err);
    }
  });
}, false);
```
