const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const clear = document.getElementById("jsClear");
const INITIAL_COLOR ="2c2c2c";
const saveBT = document.getElementById("jsSave");


canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

ctx.fillstyle = "white";
ctx.fillRect(0,0,canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillstyle =INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting = false;
let filling = false;

function stopPainting () {
  painting = false;
}

function startPainting () {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {
    ctx.beginPath ();
    ctx.moveTo(x,y);
  } else {
    ctx.lineTo(x,y);
    ctx.stroke();
  }
 
}

function onMouseUp(event) {
  stopPainting(); 
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange (event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleMoedClick () {
  if(filling === true) {
    filling=false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleResetClick() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  }

function handleCanvasClick() {
  if(filling){
    ctx.fillRect(0,0,700,700);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[😝]";
  link.click();
}

if(canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
  

}

Array.from(colors). forEach(color => 
  color.addEventListener("click", handleColorClick)
  );

if(range) {
  range.addEventListener("input", handleRangeChange)

}

if(mode) {
  mode.addEventListener("click", handleMoedClick)
}

if(clear) {
  clear.addEventListener("click", handleResetClick)
  }

if(saveBT) {
  saveBT.addEventListener('click', handleSaveClick)
}  