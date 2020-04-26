const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const left = document.getElementById("left");
const right = document.getElementById("right");

var espeed = 2;
var round = 1;
var finsh = 10;
var ex;
var ey;

var x = canvas.width / 2;
var y = canvas.height / 2;

var rightPressed = false;
var leftPressed = false;

var move = 10;

left.addEventListener("click", leftClicked);
right.addEventListener("click", rightClicked);

function nextRound() {
  var count = finish;
  if (ey == 0) {
    count++;
  }
}

function leftClicked() {
  x -= move;
}
function rightClicked() {
  x += move;
}
function drawBall() {
  ctx.beginPath();
  ctx.fillRect(x, y, 10, 10);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
}
setInterval(draw, 10);
