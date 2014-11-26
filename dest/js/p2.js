var ballcanvas, ballx, bally, beta, bounceDamping, colorList, context, draw, frame, gamma, gravity, height, oldTime, radius, sense, velx, vely, width;

ballcanvas = document.getElementById('ballcanvas');

context = ballcanvas.getContext('2d');

width = window.innerWidth;

height = window.innerHeight;

ballcanvas.width = width;

ballcanvas.height = height;

radius = 16;

ballx = 50;

bally = 50;

velx = 0;

vely = 0;

gravity = 5000;

gamma = 0;

beta = 0;

bounceDamping = .3;

oldTime = new Date;

colorList = ['#23AAA4', '#5AB5B0', '#78BEB2', '#686F89', '#DC5D54', '#DD6664', '#D94142', '#E78E21', '#E9A21F', '#EDB51C'];

draw = function(ctx) {
  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  ctx.fillStyle = '#999';
  ctx.beginPath();
  ctx.arc(ballx, bally, radius, 0, Math.PI * 2);
  return ctx.fill();
};

frame = function() {
  var elapsedTime, time;
  time = new Date;
  elapsedTime = (time - oldTime) / 1000;
  velx += gravity * elapsedTime * Math.sin(gamma);
  vely += gravity * elapsedTime * Math.sin(beta);
  ballx += velx * elapsedTime;
  bally += vely * elapsedTime;
  if (ballx + radius > width) {
    ballx = width - radius;
    velx *= -bounceDamping;
  }
  if (ballx - radius < 0) {
    ballx = radius;
    velx *= -bounceDamping;
  }
  if (bally + radius > height) {
    bally = height - radius;
    vely *= -bounceDamping;
  }
  if (bally - radius < 0) {
    bally = radius;
    vely *= -bounceDamping;
  }
  draw(context);
  return oldTime = time;
};

sense = sense.init({});

setInterval(frame, 40);

sense.orientation({
  alphaThreshold: 365,
  betaThreshold: 0.05,
  gammaThreshold: 0.05,
  radians: true
}, function(data) {
  gamma = data.gamma;
  return beta = data.beta;
});