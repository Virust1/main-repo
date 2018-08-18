class Player {
  var store, alive;

  function Player(x, y, camx, camy, mouseX, mouseY, id) {
    this.x = x;
    this.y = y;
    this.camx = camx;
    this.camy = camy;
    this.mouseX = mouseX;
    this.mouseY = mouseY;
    this.id = id;
  }
};

module.exports = Player;
