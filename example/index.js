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
