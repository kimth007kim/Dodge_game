const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const left = document.getElementById("left");
const right = document.getElementById("right");
const img = document.getElementById("myImage");

var round = 1; //라운드 처음에는 1
var finsh = 10; //라운드가 끝나는 시점

var espeed = 2;
var max = 500;
var rand = Math.random() * max;
var ex = 0;
var ey = 0;
var erand = 0;

var x = canvas.width / 2;
var y = canvas.height / 2;

var rightPressed = false;
var leftPressed = false;

var move = 10;

ctx.globalCompositeIoperation = "source-over";

left.addEventListener("click", leftClicked);
right.addEventListener("click", rightClicked);

function roundStart() {
  var count = finish;
  if (ey == 0) {
    //canvas 바깥으로 나가면
    count--;
    if (count == 0) {
      round++;
      newxtRound();
    }
  }
}
function newxtRound(round) {
  espeed = round * espeed;
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

function drawBackgorund() {
  ctx.drawImage(img, 0, 0, 100, 100);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawBackgorund();
}
setInterval(draw, 10);
