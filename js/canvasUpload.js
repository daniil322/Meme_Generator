function uploadImg(elForm, ev) {
  ev.preventDefault();
  document.getElementById("imgData").value = canvas.toDataURL("image/jpeg");

  function onSuccess(uploadedImgUrl) {
    let url = uploadedImgUrl;
    uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
    document.querySelector(".endButtons").innerHTML = `
      <a class='fb-container' href="#" onclick="downloadCanvas(this)">Download</a>
    <a class='fb-container' href='#' onclick="uploadToLocalStorage('${canvas.toDataURL(
      "image/png",
      1.0
    )}')">UploadToSite</a>
          <a class='fb-container' href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
             Share   
          </a>`;
  }
  doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
  var formData = new FormData(elForm);
  fetch("http://ca-upload.com/here/upload.php", {
    method: "POST",
    body: formData
  })
    .then(function(res) {
      return res.text();
    })
    .then(onSuccess)
    .catch(function(err) {});
}

function downloadCanvas(elDownload) {
  image = canvas.toDataURL("image/png", 1.0);
  elDownload.download = "my-image.png";
  elDownload.href = image;
  uploadToLocalStorage(elDownload.href);
}

function uploadToLocalStorage(href) {
  let canvass = getFromLocalStorage();
  if (!canvass) {
    canvass = [];
  }
  canvass.push(href);
  localStorage.setItem("imgCanvas", JSON.stringify(canvass));
}

function getFromLocalStorage() {
  return (canvass = JSON.parse(localStorage.getItem("imgCanvas")));
}
