import TileMap from "./TileMap.js";

const tileSize = 32;
//velocity makes the character speed change
const velocity = 2;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const tileMap = new TileMap(tileSize);
const lucy = tileMap.getLucy(velocity)

function gameLoop(){
tileMap.draw(ctx);
lucy.draw(ctx);
}
tileMap.setCanvasSize(canvas);
setInterval(gameLoop, 1000/75);