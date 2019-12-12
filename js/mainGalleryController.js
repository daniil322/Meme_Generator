function renderMemes() {
  let strHTML = "";
  filterdMemes = filterMemes();
  filterdMemes.forEach(meme => {
    strHTML += `<img class='img' src=${meme.url} onclick=showEditor('${meme.url}')>`;
  });
  return (document.querySelector(".content").innerHTML = strHTML);
}

function searchMemes(elFilter) {
  if (elFilter.type!=='text') {
     changeGSearchWord(elFilter);
   return renderMemes()
  }
  changeGSearchWord(elFilter.value);
  renderMemes();
}

function showEditor(memeURL) {
  gSearchWord=''
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.querySelector("editor").style.display = "flex";
  document.querySelector("main").style.display = "none";
  canvasImage(memeURL);
}

function showAbout() {
  gSearchWord=''
  document.querySelector("editor").style.display = "none";
  document.querySelector("main").style.display = "none";
  document.querySelector("about").style.display = "flex";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function showGallery() {
  gSearchWord=''
  document.querySelector("editor").style.display = "none";
  document.querySelector("main").style.display = "block";
  document.querySelector("about").style.display = "none";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  renderMemes()
}

function showNav(){
  document.querySelector('.callNav').style.display='none'
  document.querySelector('.navCenter').style.display='flex'
  document.querySelector('.navCenter').style.flexDirection ='column'
  document.querySelector('.closeNav').style.display ='inline-block'
}

function hideNav(){
  if (window.innerWidth > 700){
    document.querySelector('.callNav').style.display='none'
    document.querySelector('.navCenter').style.display='flex'
    document.querySelector('.closeNav').style.display ='none'

 return   document.querySelector('.navCenter').style.flexDirection ='row'
  }
  document.querySelector('.callNav').style.display='flex'
  document.querySelector('.navCenter').style.display='none'
  document.querySelector('.navCenter').style.flexDirection ='row'
  document.querySelector('.closeNav').style.display ='none'

}