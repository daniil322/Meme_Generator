let gMemes,
  memeId = 1,
  gSearchWord = "";

function init() {
  CreateMemes();
  renderMemes();
}

function CreateMeme(keywords) {
  return {
    url: `meme-imgs(square)/${memeId}.jpg`,
    id: memeId++,
    keywords: keywords
  };
}

function CreateMemes() {
  gMemes = [
    CreateMeme("kid"),
    CreateMeme("tell me more"),
    CreateMeme("kid"),
    CreateMeme("Aliens"),
    CreateMeme("what if"),
    CreateMeme("cute"),
    CreateMeme("one does not"),
    CreateMeme("toys"),
    CreateMeme("Cheers"),
    CreateMeme("trump"),
    CreateMeme("cute"),
    CreateMeme("adult"),
    CreateMeme("facepalm"),
    CreateMeme("cute"),
    CreateMeme("cute"),
    CreateMeme("putin"),
    CreateMeme("obama"),
    CreateMeme("adult")
  ];
}

function changeGSearchWord(value) {
  
  return (gSearchWord = value);
}

function filterMemes() {
  return gMemes.filter(meme => {
    if (!gSearchWord)return meme
    return meme.keywords.includes(gSearchWord.toLocaleLowerCase());
  });
}
