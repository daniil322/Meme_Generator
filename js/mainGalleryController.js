function renderMemes() {
  let strHTML = "";
  filterdMemes = filterMemes();
  filterdMemes.forEach(meme => {
    strHTML += `<img class='img' src=${meme.url} onclick=showEditor('${meme.url}')>`;
  });
  return (document.querySelector(".content").innerHTML = strHTML);
}

function searchMemes(elFilter) {
  changeGSearchWord(elFilter.value);
  renderMemes();
}

function showEditor(memeURL) {
  document.querySelector("editor").style.display = "flex";
  document.querySelector("main").style.display = "none";
  canvasImage(memeURL);
}

function getDetails(){
  
}
