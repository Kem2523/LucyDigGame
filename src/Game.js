import TileMap from "./TileMap.js";

const tileSize = 32;
//velocity makes the character speed change
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const lucy = tileMap.getLucy(velocity);
const enemies = tileMap.getEnemies(velocity);

function gameLoop() {
  tileMap.draw(ctx);
  lucy.draw(ctx);
  enemies.forEach((enemy) => enemy.draw(ctx, pause()));
}
function pause(){
  return !lucy.madeFirstMove
}
tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000 / 75);
