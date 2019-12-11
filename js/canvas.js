let canvas=document.querySelector('canvas'),
ctx=canvas.getContext('2d')




function canvasImage(memeURL){
    base_image = new Image();
    base_image.src = memeURL
    base_image.onload = function(){
        ctx.drawImage(base_image, 0, 0)
    }
    }