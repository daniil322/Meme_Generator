function renderMemes() {
  let strHTML = "";
  filterdMemes = filterMemes();
  filterdMemes.forEach(meme => {
    strHTML += `<img class='img' src=${meme.url} onclick=showEditor('${meme.url}')>`;
  });
  return (document.querySelector(".content").innerHTML = strHTML);
}

function searchMemes(elFilter) {
  if (elFilter.type !== "text") {
    changeGSearchWord(elFilter);
    return renderMemes();
  }
  changeGSearchWord(elFilter.value);
  renderMemes();
}

function showEditor(memeURL) {
  restartEditor();
  document.querySelector("editor").style.display = "flex";
  document.querySelector("main").style.display = "none";
  document.querySelector("mems").style.display = "none";
  document.querySelector("about").style.display = "none";
  canvasImage(memeURL);
}

function showAbout() {
  document.querySelector("editor").style.display = "none";
  document.querySelector("main").style.display = "none";
  document.querySelector("about").style.display = "inline-block";
  document.querySelector("mems").style.display = "none";
}

function showGallery() {
  document.querySelector("editor").style.display = "none";
  document.querySelector("main").style.display = "block";
  document.querySelector("about").style.display = "none";
  document.querySelector("mems").style.display = "none";
  gSearchWord = "";
  renderMemes();
}
function showMemes() {
  document.querySelector("editor").style.display = "none";
  document.querySelector("main").style.display = "none";
  document.querySelector("about").style.display = "none";
  document.querySelector("mems").style.display = "flex";
  renderMemesPage();
}

function showNav() {
  document.querySelector(".callNav").style.display = "none";
  document.querySelector(".navCenter").style.display = "flex";
  document.querySelector(".navCenter").style.flexDirection = "column";
  document.querySelector(".closeNav").style.display = "inline-block";
}

function hideNav() {
  if (window.innerWidth > 700) {
    document.querySelector(".callNav").style.display = "none";
    document.querySelector(".navCenter").style.display = "flex";
    document.querySelector(".closeNav").style.display = "none";
    return (document.querySelector(".navCenter").style.flexDirection = "row");
  }
  document.querySelector(".callNav").style.display = "flex";
  document.querySelector(".navCenter").style.display = "none";
  document.querySelector(".navCenter").style.flexDirection = "row";
  document.querySelector(".closeNav").style.display = "none";
}
function restartEditor() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.querySelector(".endButtons").innerHTML = "";
}

function getFile(elFile) {
  let reader = new FileReader();

  reader.onloadend = function() {
    showEditor(reader.result);
  };
  reader.readAsDataURL(elFile.files[0]);
}
