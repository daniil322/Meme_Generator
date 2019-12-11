let canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  gCanvasDraws = [],
  drawId = 1,
  gCurrClickedIDX = 0,
  gDragWords = false,
  gDragMode = false;

function canvasImage(memeURL) {
  base_image = new Image();
  base_image.src = memeURL;
  base_image.onload = function() {
    ctx.drawImage(base_image, 0, 0);
    canvasWrite();
  };
}
function canvasWrite(
  txt = "hello",
  textSize = 50,
  color = "#000000",
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

function findLine(id) {
  return gCanvasDraws.findIndex(draw => draw.id === id);
}

function drawCanvas() {
  ctx.drawImage(base_image, 0, 0);
  gCanvasDraws.forEach(draw => {
    let temp = draw.type;
    temp(
      draw.txt,
      draw.textSize,
      draw.color,
      draw.x,
      draw.y,
      draw.stroke,
      draw.id
    );
    gCanvasDraws.pop();
  });
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
      y < draw.y &&
      x > draw.x &&
      y > draw.y - draw.wordHeight / 2
    ) {
      document.querySelector(".text").value = draw.txt;
      document.querySelector(".color").value = draw.color;
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
  canvasWrite("hi", 50, "", 200, 200);
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
}
