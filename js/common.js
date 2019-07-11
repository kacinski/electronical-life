/* Refresh map - controls */

let mapRefreshState = false;
let steps = 0;
let arrayOfLife = [];
let stopCountKangaroo = true;
let stopCountSnake = true;
let stopCountRabbit = true;
let stopCountPlate = true;
let max = 0;
let res;
let nature = {
    "kangaroo": 0,
    "snake": 0,
    "rabbit": 0,
    "plant": 0
};

function refreshMap() {

    ++steps;
    world.turn();
    document.getElementById("world").innerHTML = world
        .toString()
        .replace(new RegExp(" ", "g"), "🌫")
        .replace(new RegExp("#", "g"), "⬛️")
        .replace(new RegExp("\\*", "g"), "🌽")
        .replace(new RegExp("o", "g"), "🐰")
        .replace(new RegExp("K", "g"), "🦘")
        .replace(new RegExp("Ö", "g"), "🐍");


    function Count(id, result) {
        let res;
        if (result != null) {
            res = result.length;
            document.getElementById(id).innerHTML = res
                .toString();
        } else {
            res = 0;
            document.getElementById(id).innerHTML = res
                .toString();

        }
    }

    function MaxCount(id, result) {


        if (result != null) {
            res = result.length;
            if(id === "maxKangaroo"){
                if(res > nature.kangaroo){
                    nature.kangaroo = res;
                }
                    document.getElementById(id).innerHTML = nature.kangaroo.toString();

            }
            if(id === "maxSnake"){
                if(res > nature.snake){
                    nature.snake = res;
                }
                document.getElementById(id).innerHTML = nature.snake.toString();
            }
            if(id === "maxRabbit"){
                if(res > nature.rabbit){
                    nature.rabbit = res;
                }
                document.getElementById(id).innerHTML = nature.rabbit.toString();

            }
            if(id === "maxPlant"){
                if(res > nature.plant){
                    nature.plant = res;
                }
                document.getElementById(id).innerHTML = nature.plant.toString();
            }
        }
    }


    let kangaroo = world
        .toString()
        .match(/K/g);
    new Count("Kangaroo", kangaroo);
    if (kangaroo === null && stopCountKangaroo) {
        arrayOfLife.push(arrayOfLife.length + 1);
        stopCountKangaroo = false;
    }

    new MaxCount("maxKangaroo", kangaroo);


    let snake = world
        .toString()
        .match(/Ö/g);
    new Count("Snake", snake);
    if (snake === null && stopCountSnake) {
        arrayOfLife.push(arrayOfLife.length + 1);
        stopCountSnake = false;
    }
    new MaxCount("maxSnake", snake);

    let rabbit = world
        .toString()
        .match(/o/g);
    new Count("Rabbit", rabbit);
    if (rabbit === null && stopCountRabbit) {
        arrayOfLife.push(arrayOfLife.length + 1);
        stopCountRabbit = false;
    }
    new MaxCount("maxRabbit", rabbit);

    let plant = world
        .toString()
        .match(/\*/g);
    new Count("Plant", plant);
    if (plant === null && stopCountPlate) {
        arrayOfLife.push(arrayOfLife.length + 1);
        stopCountPlate = false;
    }
    new MaxCount("maxPlant", plant);

    if (arrayOfLife.length < 3)
        document.getElementById("steps").innerHTML = steps.toString();


}
;


function setMapInterval() {

    if (!mapRefreshState) {

        int = setInterval(refreshMap, 20);

    }

    mapRefreshState = true;
}

setMapInterval();


/*Start world*/

let world = new LifelikeWorld(
       ["#####################################################################",
        "#                  ***         ****                          *****#*#",
        "#   *Ö ##            ####       ########      ########   o   ****#*##",
        "#   *  ##    o        ##        ########    o ##    ##   **  K ***#*#",
        "#      ##  *          ##        ##            ##         Ö     *****#",
        "#      ##  ***  * K   ## **     #####         #####            *****#",
        "#* **  ##   *  ***    ##        #####   Ö     ##                 ***#",
        "#* **  ######## *     ##        ##          * ##    ## Ö          **#",
        "#      ########      ####       ## o     ***  ########              #",
        "#*            Ö                   *        o                        #",
        "#*          ##      ##  ***                   ##     ##         K   #",
        "#######     ##      ##  ***          ***         ##                 #",
        "#****##   o ##      ##                           ## o         **    #",
        "#****##         ##      ##                ***##       ##            #",
        "#****##*        ##      ##   K      *       o ### **### ***         #",
        "##***##*  o   o ## ***  ##   ***  ***           #####     ****     o#",
        "##***      ***     ***      *****            **        **           #",
        "#***  ##            ##       ##       #####      ##  Ö    #####     #",
        "#**    ##    ##    ##      ##  ##     ## * ##    ##       ## * ##   #",
        "#*     ##    ##    ##  K  ## ** ##    ## * ##    ##       ## *  ##  #",
        "#  K     ##  ##  ##       ##   ##     ######     ##   ##  ##   ##   #",
        "#         ########    **   ####   **  ##   ##    ######   ######    #",
        "#                     **          **                                #",
        "#####################################################################"],
    {
        "#": Wall,
        "o": Rabbit,
        "K": Kangoo,
        "Ö": Snake,
        "*": Plant
    }
);



