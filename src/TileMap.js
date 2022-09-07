import Lucy from "./Lucy.js";
import Enemy from "./Enemy.js";
import MovingDirection from "./MovingDirection.js";

export default class TileMap {
  constructor(tileSize) {
    this.tileSize = tileSize;

    this.dirt = new Image();
    this.dirt.src = "../images/dirt2.png";

    this.tennisGlow = new Image();
    this.tennisGlow.src = "../images/tennisGlow.png";
   
    this.tennisBall = new Image();
    this.tennisBall.src= "../images/tennisBall.png"

    this.dirtGrass = new Image();
    this.dirtGrass.src = "../images/dirtGrass.png";

    this.bone = new Image();
    this.bone.src = "../images/bone.png";

    this.powerBall = this.tennisGlow;
    this.powerBallAnimationTimerDefault = 60;
    this.powerBallAnimationTimer = this.powerBallAnimationTimerDefault;
  }

  map = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 2, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 1],
    [1, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 4, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 2, 1],
    [1, 5, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 5, 2, 2, 4, 2, 2, 2, 2, 2, 6, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 4, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 4, 2, 5, 2, 2, 2, 2, 2, 2, 2, 5, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ];

  draw(ctx) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 2) {
          this.#drawDirt(ctx, column, row, this.tileSize);
        } else if (tile === 1) {
          this.#drawDirtGrass(ctx, column, row, this.tileSize);
        } else if (tile === 4) {
          this.#drawBone(ctx, column, row, this.tileSize);
        } 
        else if (tile ===7){
          this.#drawTennisBall(ctx, column, row, this.tileSize);
        }
        else if (tile === 5) {
          this.#drawPowerBall(ctx, column, row, this.tileSize);
        } else {
          this.#drawBlank(ctx, column, row, this.tileSize);
        }
      }
    }
  }
  #drawPowerBall(ctx, column, row, size) {
    this.tennisBallAnimationTimer--;
    if (this.powerBallAnimationTimer === 0) {
      this.powerBallAnimationTimer = this.powerBallAnimationTimerDefault;
      if (this.powerBall == this.tennisGlow) {
        this.powerBall = this.tennisBall;
      } else {
        this.powerBall = this.tennisGlow;
      }
    }
    ctx.drawImage(this.powerBall, column * size, row * size, size, size);
  }
  #drawTennisBall(ctx, column, row, size){
    ctx.drawImage(
      this.tennisBall,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }
  #drawDirt(ctx, column, row, size) {
    ctx.drawImage(
      this.dirt,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }
  #drawDirtGrass(ctx, column, row, size) {
    ctx.drawImage(
      this.dirtGrass,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawBone(ctx, column, row, size) {
    ctx.drawImage(
      this.bone,
      column * this.tileSize,
      row * this.tileSize,
      size,
      size
    );
  }

  #drawBlank(ctx, column, row, size) {
    ctx.fillstyle = "black";
    ctx.fillRect(column * this.tileSize, row * this.tileSize, size, size);
  }

  getLucy(velocity) {
    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        let tile = this.map[row][column];
        if (tile === 0) {
          this.map[row][column] = 2;
          return new Lucy(
            column * this.tileSize,
            row * this.tileSize,
            this.tileSize,
            velocity,
            this
          );
        }
      }
    }
  }
  getEnemies(velocity) {
    const enemies = [];

    for (let row = 0; row < this.map.length; row++) {
      for (let column = 0; column < this.map[row].length; column++) {
        const tile = this.map[row][column];
        if (tile == 6) {
          this.map[row][column] = 2;
          enemies.push(
            new Enemy(
              column * this.tileSize,
              row * this.tileSize,
              this.tileSize,
              velocity,
              this
            )
          );
        }
      }
    }
    return enemies;
  }

  setCanvasSize(canvas) {
    canvas.width = this.map[0].length * this.tileSize;
    canvas.height = this.map.length * this.tileSize;
  }

  didCollideWithEnvironment(x, y, direction) {
    if (direction == null) {
      return;
    }

    if (
      Number.isInteger(x / this.tileSize) &&
      Number.isInteger(y / this.tileSize)
    ) {
      let column = 0;
      let row = 0;
      let nextColumn = 0;
      let nextRow = 0;

      switch (direction) {
        case MovingDirection.right:
          nextColumn = x + this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.left:
          nextColumn = x - this.tileSize;
          column = nextColumn / this.tileSize;
          row = y / this.tileSize;
          break;
        case MovingDirection.up:
          nextRow = y - this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
        case MovingDirection.down:
          nextRow = y + this.tileSize;
          row = nextRow / this.tileSize;
          column = x / this.tileSize;
          break;
      }
      const tile = this.map[row][column];
      if (tile === 1) {
        return true;
      }
    }
    return false;
  }
  getBone(x, y) {
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)) {
      if (this.map[row][column] === 4) {
        this.map[row][column] = 2;
        return true;
      }
    }
    return false;
  }
  getPowerBall(x,y){
    const row = y / this.tileSize;
    const column = x / this.tileSize;
    if (Number.isInteger(row) && Number.isInteger(column)){
      const tile = this.map[row][column];
      if (tile === 5){
        this.map[row][column]= 2;
        return true;
      }
    }
return false;
  }
}
