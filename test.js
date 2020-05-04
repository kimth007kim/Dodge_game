const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const left = document.getElementById("left");
const right = document.getElementById("right");
const topb = document.getElementById("topb");
const bottomb = document.getElementById("bottomb");
const img = document.getElementById("myImage");

var round = 3; //라운드 처음에는 1
var finish = 5; //라운드가 끝나는 시점

var x = canvas.width / 2;
var y = canvas.height / 2;
var first = 20;
var mewidth = first;
var meheight = first;

var score = 0;

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
var grow = 0.2;

var fish_max = 10;
var efish = Array();

function Init() {
  for (c = 0; c < fish_max; c++) {
    var obj = new Object();
    var stp = Math.floor(Math.random() * 2) + 1;
    var randwht = Math.floor(Math.random() * 40) + 1;
    var xMaker = 1;
    if (stp == 1) {
      xMaker = 0;
    } else if (stp == 2) {
      xMaker = canvas.width - randwht;
    }
    obj.randwh = randwht;
    obj.tx = Math.random() * canvas.width - randwht;
    obj.ty = Math.random() * canvas.height - randwht;
    obj.status = 1;
    obj.speed = Math.floor(Math.random() * 3) + 2;
    obj.startPoint = stp;
    obj.tcolor = "#" + Math.round(Math.random() * 0xffffff).toString(16);
    efish.push(obj);
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
  for (var c = 0; c < fish_max; c++) {
    if (efish[c].status == 1) {
      ctx.beginPath();
      ctx.moveTo(efish[c].tx, efish[c].ty);
      ctx.rect(efish[c].tx, efish[c].ty, efish[c].randwh, efish[c].randwh);
      // var random = "#" + Math.round(Math.random() * 0xffffff).toString(16);
      ctx.fillStyle = efish[c].tcolor;
      ctx.fill();
      ctx.closePath();
    }
  }
}

// function enemyMove() {
//   for (var c = 0; c < fish_max; c++) {
//     if (efish[c].startPoint == 1) {
//       efish[c].tx += efish[c].randwh * 0.2;
//       //   efish[c].tx += 60 / efish[c].randwh;
//     } else if (efish[c].startPoint == 2) {
//       efish[c].tx -= efish[c].randwh * 0.2;
//       //   efish[c].tx -= 60 / efish[c].randwh;
//     }
//   }
//   enemyDraw();
// }

function drawBackgorund() {
  ctx.drawImage(img, 0, 0, 600, 420);
}

function collisionDetection() {
  for (var c = 0; c < fish_max; c++) {
    var f = efish[c];
    // console.log(efish[c].status);//동작 완료
    if (f.status == 1) {
      if (
        (x >= f.tx &&
          x <= f.tx + f.randwh &&
          y >= f.ty &&
          y <= f.ty + f.randwh) ||
        (x >= f.tx &&
          x <= f.tx + f.randwh &&
          y + meheight >= f.ty &&
          y + meheight <= f.ty + f.randwh) ||
        (x + mewidth >= f.tx &&
          x + mewidth <= f.tx + f.randwh &&
          y >= f.ty &&
          y <= f.ty + f.randwh) ||
        (x + mewidth >= f.tx &&
          x + mewidth <= f.tx + f.randwh &&
          y + meheight >= f.ty &&
          y + meheight <= f.ty + f.randwh)
      ) {
        console.log("aaa");
        // efish[c].status = 0;
        // if (mewidth < f.randwh) {
        //   gameover();
        //   document.location.reload();
        // } else {
        //   mewidth += grow;
        //   meheight += grow;
        //   score++;
        //   f.status = 0;
        // }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackgorund();
  Init();
  drawBall();
  //   enemyMove();
  collisionDetection();
  enemyDraw();

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
setInterval(draw, 20);
