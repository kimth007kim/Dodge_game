const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const left = document.getElementById("left");
const right = document.getElementById("right");
const topb = document.getElementById("topb");
const bottomb = document.getElementById("bottomb");
const img = document.getElementById("myImage");

var round = 1; //라운드 처음에는 1
var finish = 10; //라운드가 끝나는 시점
var status = 0;

var x = canvas.width / 2;
var y = canvas.height / 2;
var mewidth = 20;
var meheight = 20;

//테스트용
var tx = 10;
var ty = 10;
var theight = 10;
var twidth = 10;
var tspeed = 1;
var startPoint = 0;

var ex = 0;
var ey = 0;
var ewidth = 0;
var eheight = 0;
var espeed = 2;

var max = 500; //500중에 하나의
var rand = Math.random() * 1.0; //난수 생성
var Rint = 0;

var erand = 0;

var efish = [];
for (var c = 0; c < round; c++) {
  var randwh = Math.floor(Math.random() * 10) + 1; //(int)적의 길이와 높이를 랜덤으로 받아온다.
  var randx = Math.floor(Math.random()) + 1; //(int)적의 x축 좌표를 0~10의 숫자중 랜덤으로 받아온다 받아온숫자중 0~5이면 0 5이상이면 1을으로 스트타포인트를 지목
  // var randy = Math.random() * canvas.height; //(int) y축의 좌표를 랜덤으로 받아와야한다.
  // var randspeed = Math.random() * 3; //(float) 물고기의 속도를 0~1.0중의 속도로 받아온다.

  efish[c] = {
    twidth: randwh,
    theight: randwh,
    tx: td,
    ty: Math.random() * canvas.height, //(int) y축의 좌표를 랜덤으로 받아와야한다.
    status: 1,
    tspeed: Math.random() * 3,
    startPoint: 0,
  };
  if (randx < 5) {
    // efish[c].tx = 290;
    var td = 290;
    startPoint = 1;
  } else if (randx >= 5) {
    // efish[c].tx = 0;
    // var td = efish[c].tx;
    var td = 0;
    startPoint = 0;
  }
  console.log(efish[c]);
}

var rightPressed = false;
var leftPressed = false;
var topPressed = false;
var bottomPressed = false;

var move = 10;

// ctx.globalCompositeIoperation = "source-over";

left.addEventListener("click", leftClicked);
right.addEventListener("click", rightClicked);
topb.addEventListener("click", topClicked);
bottomb.addEventListener("click", bottomClicked);

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// function roundStart() {
//   var count = finish;
//   if (ey == 0) {
//     //canvas 바깥으로 나가면
//     count--;
//     if (count == 0) {
//       round++;
//       newxtRound();
//     }
//   }
// }
// function newxtRound(round) {
//   espeed = round * espeed;
// }

function keyDownHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = true;
  } else if (e.keyCode == 39) {
    rightPressed = true;
  } else if (e.keyCode == 38) {
    topPressed = true;
  } else if (e.keyCode == 40) {
    bottomPressed = true;
  }
}

function keyUpHandler(e) {
  if (e.keyCode == 37) {
    leftPressed = false;
  } else if (e.keyCode == 39) {
    rightPressed = false;
  } else if (e.keyCode == 38) {
    topPressed = false;
  } else if (e.keyCode == 40) {
    bottomPressed = false;
  }
}
function leftClicked() {
  x -= move;
}
function rightClicked() {
  x += move;
}
function topClicked() {
  y -= move;
}
function bottomClicked() {
  y += move;
}

function drawBall() {
  ctx.beginPath();
  ctx.rect(x, y, mewidth, meheight);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.closePath();
}

function enemyDraw() {
  for (var c = 0; c < round; c++) {
    var efishX = efish[c].tx;
    var efishY = efish[c].ty;
    var efishWidth = efish[c].twidth;
    var efishHeight = efish[c].theight;
    ctx.beginPath();
    ctx.rect(efishX, efishY, efishWidth, efishHeight);
    var random = "#" + Math.round(Math.random() * 0xffffff).toString(16);
    ctx.fillStyle = random;
    ctx.fill();
    ctx.closePath();
  }
}

function drawBackgorund() {
  ctx.drawImage(img, 0, 0, 600, 420);
}

function collisionDetection() {
  if (x > tx && x < tx + twidth && y > ty && y < ty + theight) {
    gameover();
  }
}
function gameover() {
  alert("Game OVER");
  document.location.reload();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackgorund();
  drawBall();
  // enemyMove();
  enemyDraw();
  collisionDetection();

  if (rightPressed && x < canvas.width - mewidth) {
    x += 3;
  } else if (leftPressed && x > 0) {
    x -= 3;
  } else if (topPressed && y > 0) {
    y -= 3;
  } else if (bottomPressed && y < canvas.height - meheight) {
    y += 3;
  }
  for (var c = 0; c < round; c++) {
    var estartPoint = efish[c].tx;
    console.log(estartPoint, efish[c].ty);
    if (estartPoint == 290) {
      efish[c].tx += efish[c].tspeed;
    } else if (estartPoint == 0) {
      efish[c].tx -= efish[c].tspeed;
    }
  }
}
setInterval(draw, 10);
