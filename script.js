
const colorCircles = document.querySelectorAll('.color-circle');
const drawingColors = document.querySelector('.drawing-colors');
const penSizeElm = document.querySelector('#pen-size');
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const clearBtn = document.querySelector('.btn-clear');
const downloadBtn = document.querySelector('.btn-download')
let pensize = +penSizeElm.value;
let isDrawing,x,y;

canvas.addEventListener('mousedown',(e) => {
    isDrawing = true;
    x= e.offsetX;
    y= e.offsetY;
});

canvas.addEventListener('mouseout', (e) => {
    isDrawing = false;
    x = undefined;
    y = undefined;
})
canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
    x = undefined;
    y = undefined;
})

canvas.addEventListener('mousemove', (e) => {
    draw(e.offsetX, e.offsetY);
})

clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}); 

downloadBtn.addEventListener('click', (e) => {
    e.target.href = canvas.toDataURL();
})


ctx.fillStyle = document.querySelector('.color-circle.active').getAttribute('data-color');
ctx.strokeStyle = ctx.fillStyle;
function draw(x2,y2) {
    if (isDrawing) {
        ctx.beginPath();
        ctx.arc(x2,y2, pensize,0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
         // drawline
        drawLine(x,y,x2,y2);
    }
    x = x2;

   y = y2;
}

function drawLine(x,y,x2,y2) {
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineWidth = pensize * 2;
    ctx.stroke();
}

drawingColors.onclick = (e) => {
    const elm = e.target.closest('.color-circle');
    removeActive(colorCircles);
    elm.classList.add('active');
}

function renderColor() {
    colorCircles.forEach((colorItem) => {
        colorItem.style.backgroundColor = colorItem.getAttribute('data-color');
    })
}

function removeActive(elm) {
    elm.forEach((elm) => elm.classList.remove('active'));
}

function selectColor(elm) {
        ctx.fillStyle = elm.getAttribute('data-color');
}

function penSizeChanged(value) {
    pensize = value;
}

function favColor(elm) {
    removeActive(colorCircles);
    ctx.fillStyle = elm.value;
}

window.onload = () => {
    renderColor();
}