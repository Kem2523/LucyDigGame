import MovingDirection from "./MovingDirection.js";

export default class Enemy {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;

    this.#loadImages();

    this.movingDirection = Math.floor(
      Math.random() * Object.keys(MovingDirection).length);

      this.directionTimerDefault = this.#random(1,3)
  }
  draw(ctx, pause) {
    if(!pause){
      this.#move();
      this.#changeDirection();
    }
 
    
  
    ctx.drawImage(this.image, this.x, this.y, this.tileSize, this.tileSize);
  }


  #changeDirection(){
    this.directionTimer--;
    let newMoveDirection = null;
    if (this.directionTimer == 0) {
      this.directionTimer = this.directionTimerDefault;
      newMoveDirection = Math.floor(
        Math.random() * Object.keys(MovingDirection).length);
      
    }

    if(newMoveDirection != null && this.movingDirection != newMoveDirection){
      if(
        Number.isInteger(this.x / this.tileSize) && 
        Number.isInteger (this.y / this.tileSize)
        ){
        if(this.tileMap.didCollideWithEnvironment(
          this.x, 
          this.y, 
          newMovingDirection
          )
          ){
this.movingDirection = newMoveDirection;
        }
      }

    }
  }
#move(){
  if(!this.tileMap.didCollideWithEnvironment(this.x, this.y, this.movingDirection))
  {
    switch(this.movingDirection){
      case MovingDirection.up:
      this.y -= this.velocity;
      break;
      case MovingDirection.down:
      this.y += this.velocity;
      break;
      case MovingDirection.left:
      this.x -= this.velocity;
      break;
      case MovingDirection.right:
      this.x += this.velocity;
      break;
    }
  }

}

#random(min, max){
  return Math.floor(Math.random() * (max-min + 1)) + min;
}

  #loadImages() {
    this.normalGopher = new Image();
    this.normalGopher.src = "../images/Gopher.png";

    this.scaredGopher = new Image();
    this.scaredGopher.src = "../images/scaredGopher.png";

    this.blinkGopher = new Image();
    this.blinkGopher.src = "../images/blinkGopher.png";

    this.image = this.normalGopher;
  }
}
