import TileMap from "./TileMap.js";

const tileSize = 32;
//velocity makes the character speed change
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const lucy = tileMap.getLucy(velocity);
const enemies = tileMap.getEnemies(velocity);

let gameOver= false;
let gameWin = false;
const gameOverSound = new Audio ('../sounds/loser.mp3');
const gameWinSound = new Audio ('../sounds/tadaa.mp3')

function gameLoop() {
  tileMap.draw(ctx);
  lucy.draw(ctx);
  enemies.forEach((enemy) => enemy.draw(ctx, pause(), lucy));
  checkGameOver();
}

function checkGameOver(){
  if(!gameOver){
    gameOver = isGameOver();
    if(gamOver){
      gameOverSound.play();
    }
  }
}
function isGameOver(){
  return enemies.some(enemy => !lucy.powerBallActive && enemy.collideWith(lucy));
}
function pause(){
  return !lucy.madeFirstMove
}
tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
