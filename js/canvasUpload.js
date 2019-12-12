function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById("imgData").value = canvas.toDataURL("image/jpeg");
  
    function onSuccess(uploadedImgUrl) {
      uploadedImgUrl = encodeURIComponent(uploadedImgUrl);
      document.querySelector(".share-container").innerHTML = `
      <a class='fb-container green' href="#" onclick="downloadCanvas(this)">Download</a>

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
      .catch(function(err) {
        console.error(err);
      });
  }


  function uploadToLocalStorage(href){
    localStorage.setItem("imgCanvas",href)
  }

  function getFromLocalStorage(){
    var img=new Image();
img.onload=function(){
    ctx.drawImage(img,0,0);
    gCanvasDraws
}
img.src=localStorage.getItem("imgCanvas");
  }