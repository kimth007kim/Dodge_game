const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const left = document.getElementById("left");
const right = document.getElementById("right");
const topb = document.getElementById("topb");
const bottomb = document.getElementById("bottomb");
const img = document.getElementById("myImage");

var round = 3; //라운드 처음에는 1
var finish = 5; //라운드가 끝나는 시점
var status = 0;

var x = canvas.width / 2;
var y = canvas.height / 2;
var first = 20;
var mewidth = first;
var meheight = first;

//테스트용
var tx = 10;
var ty = 10;
var theight = 10;
var twidth = 10;
var tspeed = 1;
var startPoint = 0;

var max = 500; //500중에 하나의
var rand = Math.random() * 1.0; //난수 생성
var Rint = 0;
var erand = 0;

// var efish = [];
// for (var c = 0; c < round; c++) {
//   efish[c] = [];
//   for (var r = 0; r < finish; r++) {
//     var randwh = Math.floor(Math.random() * 20) + 1;
//     var stp = Math.floor(Math.random() * 2) + 1;
//     var yMaker = Math.random() * canvas.height - randwh; //(int) y축의 좌표를 랜덤으로 받아와야한다.
//     var speedMaker = Math.random() * 5;
//     if (stp == 1) {
//       var xMaker = 0;
//     } else if (stp == 2) {
//       var xMaker = canvas.width - randwh;
//     }
//     efish[c][r] = {
//       twidth: randwh,
//       theight: randwh,
//       tx: xMaker,
//       ty: yMaker,
//       status: 1,
//       tspeed: speedMaker,
//       startPoint: stp,
//       tcolor: "#" + Math.round(Math.random() * 0xffffff).toString(16),
//     };
//   }
// }

var efish = [];
for (var c = 0; c < round; c++) {
  efish[c] = [];
  for (var r = 0; r < finish; r++) {
    efish[c][r] = {
      twidth: 0,
      theight: 0,
      tx: 0,
      ty: 0,
      status: 1,
      tspeed: 0,
      startPoint: 0,
      tcolor: 0,
    };
  }
}

function MakeEnemy() {
  for (var c = 0; c < round; c++) {
    for (var r = 0; r < finish; r++) {
      var f = efish[c][r];
      var randwh = Math.floor(Math.random() * 20) + 1;
      var stp = Math.floor(Math.random() * 2) + 1;
      var yMaker = Math.random() * canvas.height - randwh; //(int) y축의 좌표를 랜덤으로 받아와야한다.
      var speedMaker = Math.random() * 5;
      if (stp == 1) {
        var xMaker = 0;
      } else if (stp == 2) {
        var xMaker = canvas.width - randwh;
      }
      efish[c][r] = {
        twidth: randwh,
        theight: randwh,
        tx: xMaker,
        ty: yMaker,
        status: 1,
        tspeed: speedMaker,
        startPoint: stp,
        tcolor: "#" + Math.round(Math.random() * 0xffffff).toString(16),
      };
      // alert(efish[c]);
    }
  }
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
    for (var r = 0; r < finish; r++) {
      if (efish[c][r].status == 1) var f = efish[c][r];
      var efishColor = f.tcolor;
      var efishX = f.tx;
      var efishY = f.ty;
      var efishWidth = f.twidth;
      var efishHeight = f.theight;
      ctx.beginPath();
      ctx.rect(efishX, efishY, efishWidth, efishHeight);
      // var random = "#" + Math.round(Math.random() * 0xffffff).toString(16);
      ctx.fillStyle = efishColor;
      ctx.fill();
      ctx.closePath();
    }
  }
}
function enemyMove() {
  for (var c = 0; c < round; c++) {
    for (var r = 0; r < finish; r++) {
      var f = efish[c][r];
      if (f.startPoint == 1) {
        f.tx += tspeed;
      } else if (f.startPoint == 2) {
        f.tx -= tspeed;
      }
    }
  }
}
function drawBackgorund() {
  ctx.drawImage(img, 0, 0, 600, 420);
}

function collisionDetection() {
  for (var c = 0; c < round; c++) {
    for (var r = 0; r < finish; r++) {
      var f = efish[c][r];
      if (
        f.status == 1 &&
        x > f.tx &&
        x < f.tx + f.twidth &&
        y > f.ty &&
        y < f.ty + f.theight
      ) {
        if (first >= f.randwh) {
          fisrt + 2;
          f.status == 0;
        } else {
          gameover();
        }
      }
    }
  }
}
function gameover() {
  alert("Game OVER");
  document.location.reload();
}

function getRandSec() {
  return Math.floor(Math.random() * 120) + 1;
} //그리고 2분마다 실행하는 인터벌 함수를 정의한다.

// var _interval = setInterval(targetFunction, 120000);

//실행할 함수 내에서 setTimeout 으로 실행하되 시간 값을 랜덤으로 준다.

// function targetFunction() {
//   var sec = getRandSec();
//   console.log(sec);
//   if (_autoStartStatus) {
//     setTimeout(function () {
//       //여기가 실제로 실행되는 비지니스 로직.
//     }, sec * 1000);
//   }
// }

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackgorund();
  drawBall();
  enemyDraw();
  enemyMove();

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
}
setInterval(draw, 100);
