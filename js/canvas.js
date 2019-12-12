let canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  gCanvasDraws = [],
  drawId = 1,
  gCurrClickedIDX = 0,
  gDragWords = false,
  gDragMode = false,
  gWidth = 500,
  gHeight = 500;

function canvasImage(memeURL) {
  gCanvasDraws = [];
  base_image = new Image();
  base_image.src = memeURL;
  windowSize();

  window.addEventListener("resize", () => {
    windowSize();
  });
  canvas.addEventListener("touchstart", event => {
    checkClick(event);
  });
  canvas.addEventListener("touchmove", event => {
    moveTo(event);
    event.stopPropagation();
  });
  canvas.addEventListener("touchend", event => {
    exitDragMode(event);
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
      fontSize++;
      gCanvasDraws[gCurrClickedIDX].textSize = fontSize;
      break;
    case "fontDown":
      fontSize--;
      gCanvasDraws[gCurrClickedIDX].textSize = fontSize;
      break;
  }
  drawCanvas();
}

function drawCanvas() {
  ctx.drawImage(base_image, 0, 0, gWidth, gHeight);
  gCanvasDraws.forEach(draw => {
    let temp = draw.type;
    y = draw.y;
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
  gCanvasDraws.forEach(draw => {
    if (
      x < draw.x + draw.wordWidth &&
      y < draw.y + draw.wordHeight / 2 &&
      x > draw.x - draw.wordWidth / 2 &&
      y > draw.y - draw.wordHeight / 2
    ) {
      document.querySelector(".text").value = draw.txt;
      document.querySelector(".color").value = draw.color;
      let temp = draw.color;
      draw.color = "red";
      drawCanvas();
      setTimeout(() => {
        gCanvasDraws[gCurrClickedIDX].color = temp;
        drawCanvas();
      }, 500);
      gCurrClickedIDX = findLine(draw.id);
      gDragWords = findLine(draw.id);
      gDragMode = true;
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
  elDownload.click();
  uploadToLocalStorage(href);
}

function findLine(id) {
  return gCanvasDraws.findIndex(draw => draw.id === id);
}

function windowSize() {
  if (window.innerWidth < 900) {
    gWidth = 300;
    gHeight = 300;
    canvas.width = 300;
    canvas.height = 300;
    drawCanvas();
  } else {
    gWidth = 500;
    gHeight = 500;
    canvas.width = 500;
    canvas.height = 500;
    drawCanvas();
  }
}
