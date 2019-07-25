var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var canva = new Canvas()
var size = 20;
// var overflow = {}
function Canvas(map) {
    // let grid = new Grid(map[0].length, map.length);
    // this.grid = grid;
    // this.legend = legend;
    //
    // map.forEach(function(line, y) { //Line = contenido / y = index
    //     for (let x = 0; x < line.length; x++)
    //         grid.set(new Vector(x, y),
    //             elementFromChar(legend, line[x]));
    // });ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);

}


Canvas.prototype.map = function(map) {
    ctx.font = "21px serif";
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    map.split('\n').map(
        (line, i) => line.split("").map((el, j) => {
            //console.log("#", j * size,  size + i * size)
            ctx.fillText(el, j * size,  size + i * size)
        })
    )

}
Canvas.prototype.draw = function(x, y) {
    ctx.fillRect(x,y,size,size);
    //ctx.fillRect(x,y,10,10);

};
