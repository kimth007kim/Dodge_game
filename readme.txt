1.배경화면 만들기-0

void ctx.drawImage(image, dx, dy);
void ctx.drawImage(image, dx, dy, dWidth, dHeight);
void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);



2. bottompressed가 동작하지 않는것 해결-0
	1)e.keyCode에서 c가 소문자여서 안됐었음(스펠링)

3.적 추가

1) 1라운드에는 1(라운드수)*10(나오는양) 으로 해서 배열을 생성한다
배열의 값에는 x좌표,y좌표, width,height, speed 값이 필요하다.
한번 생성되면 일직선으로 x축을따라 지나간다.


round: 라운드수
finish:나오는 양
ex:적의 x좌표
ey: 적의 y 좌표
ewidth:적의 크기
eheight: 적의 길이
espeed:적의 속도

1-1)배열만들기
빈배열을 만드는 방법

 var bricks = [];
      for (var c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
          bricks[c][r] = { x: 0, y: 0, status: 1 };
        }

1-2)그냥 적하나 추가해서 일자로 쭉가게 만들어보기-0

4:점수추가



4. 글자 반짝이게 하기



