let canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  gCanvasDraws = [],
  drawId = 1,
  gCurrClickedIDX = 0,
  gDragWords = false,
  gDragMode = false,
  gWidth = 500,
  gHeight = 500,
  gOriginal=0,
  gNotOriginal=0

function canvasImage(memeURL) {
  gCanvasDraws = [];
  base_image = new Image();
  base_image.src = memeURL;
  windowSize();

  window.addEventListener("resize", () => {
    windowSize();
  });
  base_image.onload = function() {
    ctx.drawImage(base_image, 0, 0, gWidth, gHeight);
    canvasWrite("hello", 50, "#FFFFFF", 100, 100);
  };
}
function canvasWrite(
  txt,
  textSize = 50,
  color = "#FFFFFF",
  x = 180,
  y = 80,
  stroke = "#000000",
  id = drawId++
) {
  ctx.fillStyle = color;
  ctx.strokeStyle = stroke;
  ctx.font = `${textSize}px Impact`;
  ctx.fillText(txt, x, y);
  ctx.strokeText(txt, x, y);
  ctx.fill();
  ctx.stroke();
  gCanvasDraws.push({
    stroke: stroke,
    wordWidth: ctx.measureText(txt).width,
    wordHeight: textSize * 1.5,
    type: canvasWrite,
    txt,
    textSize,
    color,
    x,
    y,
    id
  });
}

function changeDraw(elInput) {
  if (!gCanvasDraws[gCurrClickedIDX]) return;
  let fontSize = gCanvasDraws[gCurrClickedIDX].textSize;
  let x = gCanvasDraws[gCurrClickedIDX].x;
  let y = gCanvasDraws[gCurrClickedIDX].y;
  switch (elInput.name) {
    case "borderColor":
      gCanvasDraws[gCurrClickedIDX].stroke = elInput.value;
      break;
    case "text":
      gCanvasDraws[gCurrClickedIDX].txt = elInput.value;
      break;
    case "color":
      gCanvasDraws[gCurrClickedIDX].color = elInput.value;
      break;
    case "fontUp":
      fontSize += 2;
      gCanvasDraws[gCurrClickedIDX].textSize = fontSize;
      break;
    case "fontDown":
      fontSize -= 2;
      gCanvasDraws[gCurrClickedIDX].textSize = fontSize;
      break;
    case "up":
      y -= 2;
      gCanvasDraws[gCurrClickedIDX].y = y;
      break;
    case "down":
      y += 2;
      gCanvasDraws[gCurrClickedIDX].y = y;
      break;
    case "right":
      x += 2;
      gCanvasDraws[gCurrClickedIDX].x = x;
      break;
    case "left":
      x -= 2;
      gCanvasDraws[gCurrClickedIDX].x = x;
      break;
  }
  drawCanvas();
}

function drawCanvas() {
  ctx.drawImage(base_image, 0, 0, gWidth, gHeight);
  gCanvasDraws.forEach(draw => {
    let temp = draw.type;
    let y = draw.y;
    if (gOriginal&& gWidth===300) {
      gOriginal=0
      draw.y=y+150
    }
    if (gNotOriginal&& gWidth===300) {
      gNotOriginal=0
      draw.y=y-150
    }
    temp(draw.txt, draw.textSize, draw.color, draw.x, y, draw.stroke, draw.id);
  });
  gCanvasDraws.splice(0, gCanvasDraws.length / 2);
}

function moveTo(ev) {
  if (gDragWords === false) return;
  let x = ev.offsetX;
  let y = ev.offsetY;
  if (gDragMode) {
    gCanvasDraws[gDragWords].x = x;
    gCanvasDraws[gDragWords].y = y;
    return drawCanvas();
  }
}

function checkClick(ev) {
  let x = ev.offsetX;
  let y = ev.offsetY;
  let chosen=false
  console.log(x,y)
  gCanvasDraws.forEach(draw => {
    if (
      x < draw.x + draw.wordWidth &&
      y < draw.y + draw.wordHeight / 2 &&
      x > draw.x - draw.wordWidth / 2 &&
      y > draw.y - draw.wordHeight / 2
    ) {
      gCurrClickedIDX = findLine(draw.id);
      gDragWords = findLine(draw.id);
      gDragMode = true;
    showSlected(draw)
      chosen=true
    }
  });
}
function deleteDraw() {
  gCanvasDraws.splice(gCurrClickedIDX, 1);
  drawCanvas();
}
function addLine() {
  canvasWrite("hello", 50, "#FFFFFF", 100, 100);
  gCurrClickedIDX = gCanvasDraws.length - 1;
}

function exitDragMode() {
  gDragMode = false;
  gDragWords = false;
}
function downloadCanvas(elDownload) {
  image = canvas.toDataURL("image/png", 1.0);
  elDownload.download = "my-image.png";
  elDownload.href = image;
  uploadToLocalStorage(elDownload.href);
}

function findLine(id) {
  return gCanvasDraws.findIndex(draw => draw.id === id);
}
function nextWord(operator){
  if (gCanvasDraws.length===1)return showSlected()
  if (gCurrClickedIDX===0&&operator==='-') {
    gCurrClickedIDX=gCanvasDraws.length-1
    return showSlected()
  }
  switch(operator){
    case '+':
      gCurrClickedIDX++
      break;
      default:
        gCurrClickedIDX--
    }
    gCurrClickedIDX= gCurrClickedIDX%gCanvasDraws.length
    showSlected()
}
function showSlected(draw=gCurrClickedIDX){
  if (draw!==gCurrClickedIDX){
    draw= findLine(draw.id)
  }
  document.querySelector(".text").value = gCanvasDraws[draw].txt;
      document.querySelector(".color").value = gCanvasDraws[draw].color;
      let temp = gCanvasDraws[draw].color;
      gCanvasDraws[draw].color = "#000";
      drawCanvas();
      setTimeout(() => {
        gCanvasDraws[draw].color = temp;
        drawCanvas();
      }, 500);
}


function windowSize() {
  if (window.innerWidth < 700) {
    gWidth = 200;
    gHeight = 200;
    canvas.width = 200;
    canvas.height = 200;
   
  } else if (window.innerWidth<900){
    gWidth = 300;
    gHeight = 300;
    canvas.width = 300;
    canvas.height = 300;
  } else{
    gWidth = 500;
    gHeight = 500;
    canvas.width = 500;
    canvas.height = 500;
  }
  drawCanvas()

}
