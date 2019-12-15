let canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  gCanvasDraws = [],
  drawId = 1,
  gCurrClickedIDX = 0,
  gDragWords = false,
  gDragMode = false,
  gWidth = 500,
  gHeight = 500;

function canvasWrite(
  txt,
  textSize = 50,
  color = "#FFFFFF",
  x = 50,
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
    case "fontUp":
      fontSize += 2;
      gCanvasDraws[gCurrClickedIDX].textSize = fontSize;
      break;
    case "fontDown":
      fontSize -= 2;
      gCanvasDraws[gCurrClickedIDX].textSize = fontSize;
      break;
    default:
      gCanvasDraws[gCurrClickedIDX][elInput.name] = elInput.value;
  }
  drawCanvas();
}

function moveTo(ev) {
  event.preventDefault();
  if (gDragWords === false) return;
  let x = ev.offsetX;
  let y = ev.offsetY;
  if (x === undefined || y === undefined) {
    x = ev.touches[0].clientX;
    y = ev.touches[0].clientY;
    y = y - canvas.offsetTop + scrollY;
  }
  if (gDragMode) {
    gCanvasDraws[gDragWords].x = x;
    gCanvasDraws[gDragWords].y = y;
    return drawCanvas();
  }
}

function deleteDraw() {
  gCanvasDraws.splice(gCurrClickedIDX, 1);
  gCurrClickedIDX -= 1;
  if (gCurrClickedIDX < 0) return (gCurrClickedIDX = 1);
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

function findLine(id) {
  return gCanvasDraws.findIndex(draw => draw.id === id);
}

function windowSize() {
  if (window.innerWidth < 700) {
    gWidth = 200;
    gHeight = 200;
    canvas.width = 200;
    canvas.height = 200;
  } else if (window.innerWidth < 900) {
    gWidth = 300;
    gHeight = 300;
    canvas.width = 300;
    canvas.height = 300;
  } else {
    gWidth = 500;
    gHeight = 500;
    canvas.width = 500;
    canvas.height = 500;
  }
  drawCanvas();
}
