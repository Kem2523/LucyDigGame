import MovingDirection from "./MovingDirection.js";
export default class Lucy {
  constructor(x, y, tileSize, velocity, tileMap) {
    this.x = x;
    this.y = y;
    this.tileSize = tileSize;
    this.velocity = velocity;
    this.tileMap = tileMap;
  


    this.currentMovingDirection = null;
    this.requestedMovingDirection = null;

    this.lucyAnimationTimerDefault = 10;
    this.lucyAnimationTimer = null;
    
    this.lucyRotation = this.Rotation.right;
    this.lucyBarkSound = new Audio('../sounds/lucyBarking.mp3')
  
    this.powerBallSound = new Audio('../sounds/Squeaky-toy-sound-effect.mp3')
    this.powerBallActive = false;
    this.powerBallAboutToExpire = false;
    this.timers= [];
    
    this.madeFirstMove = false;

    document.addEventListener("keydown", this.#keydown);
    this.#loadLucyImages();
  }

  Rotation = {
    right: 0,
    down: 1,
    left: 2,
    up: 3,

  };

  draw(ctx) {
    this.#move();
    this.#animate();
    this.#getBone();
    this.#getPowerBall();


    const size = this.tileSize / 2;

    ctx.save();
    ctx.translate(this.x + size, this.y + size);
    ctx.rotate((this.lucyRotation * 90 * Math.PI) / 180);
    ctx.drawImage(
      this.lucyImages[this.lucyImageIndex], 
      -size, 
      -size, 
      this.tileSize, 
      this.tileSize
      );

    ctx.restore();
    
  }

  #loadLucyImages() {
    const lucyImage1 = new Image();
    lucyImage1.src = "../images/dog (1).png";

    const lucyImage2 = new Image();
    lucyImage2.src = "../images/dog1.png";

    const lucyImage3 = new Image();
    lucyImage3.src = "../images/dog3.png";

    const lucyImage4 = new Image();
    lucyImage4.src = "../images/dog1.png";

    this.lucyImages = [lucyImage1, lucyImage2, lucyImage3, lucyImage4];

    this.lucyImageIndex = 3;
  }
  #keydown = (event) => {
    //up
    if (event.keyCode == 38) {
      if (this.currentMovingDirection == MovingDirection.down)
        this.currentMovingDirection = MovingDirection.up;
      this.requestedMovingDirection = MovingDirection.up;
      this.madeFirstMove = true;
    }
    //down
    if (event.keyCode == 40) {
      if (this.currentMovingDirection == MovingDirection.up)
        this.currentMovingDirection = MovingDirection.down;
      this.requestedMovingDirection = MovingDirection.down;
      this.madeFirstMove = true;
    }
    //left
    if (event.keyCode == 37) {
      if (this.currentMovingDirection == MovingDirection.right)
        this.currentMovingDirection = MovingDirection.left;
      this.requestedMovingDirection = MovingDirection.left;
      this.madeFirstMove = true;
    }
    //right
    if (event.keyCode == 39) {
      if (this.currentMovingDirection == MovingDirection.left)
        this.currentMovingDirection = MovingDirection.right;
      this.requestedMovingDirection = MovingDirection.right;
      this.madeFirstMove = true;
    }
  };
  #move() {
    if (this.currentMovingDirection !== this.requestedMovingDirection) {
      if (
        Number.isInteger(this.x / this.tileSize) &&
        Number.isInteger(this.y / this.tileSize)
      ) {
        if (
          !this.tileMap.didCollideWithEnvironment(
            this.x,
            this.y,
            this.requestedMovingDirection
          )
        )
          this.currentMovingDirection = this.requestedMovingDirection;
      }
    }

    if (
      this.tileMap.didCollideWithEnvironment(
        this.x,
        this.y,
        this.currentMovingDirection
      )
    ) {
      this.lucyAnimationTimer = null;
      this.lucyImageIndex = 1;
      return;
    } else if (
      this.currentMovingDirection != null &&
      this.lucyAnimationTimer == null
    ) {
      this.lucyAnimationTimer = this.lucyAnimationTimerDefault;
    }

    switch (this.currentMovingDirection) {
      case MovingDirection.up:
        this.y -= this.velocity;
        this.lucyRotation = this.Rotation.up;
        break;
      case MovingDirection.down:
        this.y += this.velocity;
        this.lucyRotation = this.Rotation.down;
        break;
      case MovingDirection.left:
        this.x -= this.velocity;
        this.lucyRotation = this.Rotation.left;
        break;
      case MovingDirection.right:
        this.x += this.velocity;
        this.lucyRotation = this.Rotation.right;
        break;
    }
  }

  #animate() {
    if (this.lucyAnimationTimer == null) {
      return;
    }
    this.lucyAnimationTimer--;
    if (this.lucyAnimationTimer == 0) {
      this.lucyAnimationTimer = this.lucyAnimationTimerDefault;
      this.lucyImageIndex++;
      if (this.lucyImageIndex == this.lucyImages.length)
        this.lucyImageIndex = 0;
    }
  }
  #getBone(){
    if(this.tileMap.getBone(this.x, this.y)){

      //play sound
      this.lucyBarkSound.play();

    }
  }
  #getPowerBall(){
   if (this.tileMap.getPowerBall(this.x, this.y)){
//gophers will be scared if lucy eats powerball
 this.powerBallSound.play();   
 this.powerBallActive = true;
 this.powerBallAboutToExpire = false;
 this.timers.forEach((timer) => clearTimeout(timer));
 this.timers = [];

 let powerBallTimer = setTimeout(() => {
this.powerBallActive=false;
this.powerBallAboutToExpire = false;
 }, 1000 *6)
 this.timers.push(powerBallTimer);
 let powerBallAboutToExpireTimer = setTimeout(()=>{
this.powerBallAboutToExpire= true;

 }, 1000* 3);
 this.timers.push(powerBallAboutToExpireTimer);
}
  }
}
