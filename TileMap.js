export default class TileMap{
constructor(tileSize){
    this.tileSize = tileSize;
    this.dirt = this.#image("dirt2.png");
    this.dirtTop= this.#image("dirtgrass.png");
    this.dog= this.#image("dog.png");
}
#image(fileName){
    const img = new Image();
    img.src = `assets/${fileName}`;
    return img;
}
//1- wall (dirt)
//4- dirt w/grass
//0- dots (bones)
//2- pacman (lucy)
//3- enemies ()
map= [
    [3,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [4,4,4,4,4,4,4,4,4,4,4,4,4,4,4],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]

];


draw(canvas,ctx) {
    this.#setCanvasSize(canvas);
    this.#clearCanvas(canvas, ctx);
    this.#drawMap(ctx);
}
#drawMap(ctx){
    for(let row =0; row< this.map.length; row++){
        for(let column=0; column <this.map[row].length; column++){
            const tile= this.map[row][column];
            let image= null;
            switch(tile){
                case 4:
                    image= this.dirtTop;
                    break;
                case 1:
                    image= this.dirt;
                    break;
                case 3:
                    image=this.dog;
                    break;


            }
            if (image != null)
            ctx.drawImage(
                image, 
                column * this.tileSize, 
                row * this.tileSize, this.tileSize, 
                this.tileSize
                );
        }
    }
}
#clearCanvas(canvas, ctx){
    ctx.fillStyle= "black";
    ctx.fillRect(0,0, canvas.width, canvas.height);
}
#setCanvasSize(canvas){
    canvas.height = this.map.length * this.tileSize;
    canvas.width = this.map[0].length * this.tileSize;

}
}