const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INITINAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 600;


// 캔버스 기본 설정 
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
ctx .lineWidth = 2.5;
ctx.strokeStyle = INITINAL_COLOR;
ctx.fillStyle = INITINAL_COLOR;

let painting = false;
let filling = false;

function startPainting() {
    painting = true;
}
function stopPainting() {
    painting = false;

}
// 브러쉬 동작 기능
function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
//브러쉬 색 설정
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}
//브러쉬 크기 설정
function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}
//브러쉬기능 & 페인트 기능 설정
function handleModeClick() {
    if (filling === true) {
        filling = false;
        mode.innerText = "Fill";
    } else {
        filling = true;
        mode.innerText = "Paint";
        
    }
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
    }
}


if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}


//브러쉬 색 설정 기능
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));


// 브러쉬 크기 버튼 실행 기능
if (range) {
    range.addEventListener("input", handleRangeChange);
}

// Fill 버튼 실행 기능
if (mode) {
    mode.addEventListener("click", handleModeClick);
}
