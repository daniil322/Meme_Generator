let canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  gCanvasDraws = [],
  drawId = 1;
(gCurrClickedID = 0), (gDragMode = false);

function canvasImage(memeURL) {
  base_image = new Image();
  base_image.src = memeURL;
  base_image.onload = function() {
    ctx.drawImage(base_image, 0, 0);
    canvasWrite();
  };
}
function canvasWrite(
  txt='hello',
  textSize = 50,
  color = "#000000",
  x = 180,
  y = 80,
  stroke = "#000000",
  id=drawId++,
) {
  ctx.fillStyle = color;
  ctx.strokeStyle = stroke;
  ctx.font = `${textSize}px Impact`;
  ctx.fillText(txt, x, y);
  ctx.strokeText(txt, x, y);
  ctx.fill();
  ctx.stroke();
  gCanvasDraws.unshift({
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
  let fontSize = gCanvasDraws[gCurrClickedID].textSize;
  switch (elInput.name) {
    case "borderColor":
      gCanvasDraws[gCurrClickedID].stroke = elInput.value;
      break;
    case "text":
      gCanvasDraws[gCurrClickedID].txt = elInput.value;
      break;
    case "color":
      gCanvasDraws[gCurrClickedID].color = elInput.value;
      break;
    case "fontUp":
      fontSize++;
      gCanvasDraws[gCurrClickedID].textSize = fontSize;
      break;
    case "fontDown":
      fontSize--;
      gCanvasDraws[gCurrClickedID].textSize = fontSize;
      break;
  }
  drawCanvas();
}

function findLine(id) {
  return gCanvasDraws.findIndex(draw => draw.id === id);
}

function drawCanvas() {
  ctx.drawImage(base_image, 0, 0);
  gCanvasDraws.forEach((draw, i) => {
    let temp = draw.type;
    temp(draw.txt, draw.textSize, draw.color, draw.x, draw.y,draw.stroke,draw.id);
    gCanvasDraws.splice(i, 1);
  });
}

function checkClick(ev) {
  event.stopPropagation();
  let x = ev.offsetX;
  let y = ev.offsetY;
  gCanvasDraws.forEach(draw => {
    if (
      x < draw.x + draw.wordWidth &&
      y < draw.y &&
      x > draw.x &&
      y > draw.y - draw.wordHeight / 2
    ) {
    //   if (gDragMode) {
    //     draw.x = x;
    //     draw.y = y;
    //     gDragMode = false;
    //     return drawCanvas();
    //   }
      document.querySelector(".text").value = draw.txt;
      document.querySelector(".color").value = draw.color;
      gCurrClickedID = draw.id-1;
    }
  });
}
function deleteDraw() {
  gCanvasDraws.splice(gCurrClickedID, 1);
  drawCanvas();
}
function addLine() {
  canvasWrite('hi',50,'',200,200);
  gCurrClickedID=gCanvasDraws.length-1
}

// function dragMode() {
//   gDragMode = true;
// }
