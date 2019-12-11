let canvas = document.querySelector("canvas"),
  ctx = canvas.getContext("2d"),
  gCanvasDraws = [],
  drawId = 1
  gCurrClickedID=0,
  gDragMode=false;

function canvasImage(memeURL) {
  base_image = new Image();
  base_image.src = memeURL;
  base_image.onload = function() {
    ctx.drawImage(base_image, 0, 0);
    canvasWrite()
  };
}
function canvasWrite(txt, textSize = 50, color = "#000000", x = 180, y = 80) {
  ctx.font = `${textSize}px Impact`;
  ctx.fillStyle = color;
  ctx.fillText(txt, x, y);
  gCanvasDraws.push({
    id: (memeId = drawId++),
    wordWidth: ctx.measureText(txt).width,
    wordHeight: textSize * 1.5,
    type: canvasWrite,
    txt,
    textSize,
    color,
    x,
    y
  });
}

function changeDraw(elInput) {
    let fontSize=   gCanvasDraws[gCurrClickedID].textSize
  switch (elInput.name) {
    case "text":
      gCanvasDraws[gCurrClickedID].txt = elInput.value;
      break;
    case "color":
      gCanvasDraws[gCurrClickedID].color = elInput.value;
      break;
    case "fontUp":
        fontSize++
      gCanvasDraws[gCurrClickedID].textSize = fontSize
      break;
    case "fontDown":
        fontSize--
      gCanvasDraws[gCurrClickedID].textSize = fontSize
      break;
  }
  drawCanvas();
}

function findLine(id) {
  return gCanvasDraws.findIndex(draw => draw.id === id);
}

function drawCanvas() {
    let canvas = document.querySelector("canvas")
  ctx = canvas.getContext("2d")
  ctx.drawImage(base_image, 0, 0);
  gCanvasDraws.forEach((draw,i)=> {
    let temp = draw.type;
    temp(draw.txt, draw.textSize, draw.color, draw.x, draw.y);
    gCanvasDraws.splice(i,1)
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
        if(gDragMode){
            debugger
            draw.x=x
            draw.y=y
            return drawCanvas()
        }
      document.querySelector(".text").value = draw.txt;
      document.querySelector(".color").value = draw.color;
      gCurrClickedID=draw.id
    }
  });
}

 function gDragMode(){
    gDragMode=true
}
