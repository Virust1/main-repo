var socket = io();
socket.on('message', function(data) {
  console.log(data);
});

var loc = {
  x: 400,
  y: 300
}

var movement = {
  up: false,
  down: false,
  left: false,
  right: false
}
document.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = true;
      break;
    case 87: // W
      movement.up = true;
      break;
    case 68: // D
      movement.right = true;
      break;
    case 83: // S
      movement.down = true;
      break;
  }
});

document.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 65: // A
      movement.left = false;
      break;
    case 87: // W
      movement.up = false;
      break;
    case 68: // D
      movement.right = false;
      break;
    case 83: // S
      movement.down = false;
      break;
  }
});

socket.emit('new player');
setInterval(function() {
  move();
  socket.emit('movement', loc);
}, 1000 / 60);

function move() {
  if(movement.left) {
    loc.x-=5;
  }
  if(movement.right) {
    loc.x+=5;
  }
  if(movement.down) {
    loc.y+=5;
  }
  if(movement.up) {
    loc.y-=5;
  }
}

var canvas = document.getElementById('canvas');
canvas.width = 800;
canvas.height = 600;
var ctx = canvas.getContext('2d');
socket.on('state', function(players) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 600);

  ctx.strokeStyle = 'white';
  var i;
  for(i = -loc.x%50; i<800; i+=50) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 600);
    ctx.lineWidth = 5;
    ctx.stroke();
  }
  var j;
  for(j = -loc.y%50; j<600; j+=50) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(800, j);
    ctx.lineWidth = 5;
    ctx.stroke();
  }

  ctx.fillStyle = 'white';
  var xdif = 400-loc.x;
  var ydif = 300-loc.y;
  for (var id in players) {
    var player = players[id];
    ctx.beginPath();
    ctx.arc(player.x+xdif, player.y+ydif, 10, 0, 2 * Math.PI);
    ctx.fill();
  }
});
