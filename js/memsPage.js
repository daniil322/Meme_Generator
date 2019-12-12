function renderMemesPage() {
  let Memes = getFromLocalStorage();
  let strHTML = "";
  Memes.forEach(meme => {
    strHTML += `<img class='img' src=${meme}>`;
  });
  return (document.querySelector(".readyMemes").innerHTML = strHTML);
}
