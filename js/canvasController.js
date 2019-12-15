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
    canvasWrite('hello')
  };
}

function drawCanvas() {
  ctx.drawImage(base_image, 0, 0, gWidth, gHeight);
  gCanvasDraws.forEach(draw => {
    let temp = draw.type;
    let y = draw.y;
    temp(draw.txt, draw.textSize, draw.color, draw.x, y, draw.stroke, draw.id);
  });
  gCanvasDraws.splice(0, gCanvasDraws.length / 2);
}

function checkClick(ev) {
  let x = ev.offsetX;
  let y = ev.offsetY;
  if (x === undefined || y === undefined) {
    x = ev.touches[0].clientX;
    y = ev.touches[0].clientY;
    y = y - canvas.offsetTop + scrollY;
  }
  gCanvasDraws.forEach(draw => {
    if (
      x < draw.x + draw.wordWidth &&
      y > draw.y - draw.wordHeight / 2 &&
      x > draw.x &&
      y < draw.y
    ) {
      gCurrClickedIDX = findLine(draw.id);
      gDragWords = findLine(draw.id);
      gDragMode = true;
      showSlected(draw);
    }
  });
}

function showSlected(draw = gCurrClickedIDX) {
  if (draw !== gCurrClickedIDX) {
    draw = findLine(draw.id);
  }
  document.querySelector(".text").value = gCanvasDraws[draw].txt;
  document.querySelector(".color").value = gCanvasDraws[draw].color;
  let temp = gCanvasDraws[draw].color;
  gCanvasDraws[draw].color = "#000";
  drawCanvas();
  setTimeout(() => {
    gCanvasDraws[draw].color = temp;
    drawCanvas();
  }, 200);
}
