const winners = {
    "plant": 0,
    "animals": 0
};
let games = 0;

/* Refresh map - controls */


function RefreshMap() {

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
            if (id === "maxKangaroo") {
                if (res > nature.kangaroo) {
                    nature.kangaroo = res;
                }
                document.getElementById(id).innerHTML = nature.kangaroo.toString();

            }
            if (id === "maxSnake") {
                if (res > nature.snake) {
                    nature.snake = res;
                }
                document.getElementById(id).innerHTML = nature.snake.toString();
            }
            if (id === "maxRabbit") {
                if (res > nature.rabbit) {
                    nature.rabbit = res;
                }
                document.getElementById(id).innerHTML = nature.rabbit.toString();

            }
            if (id === "maxPlant") {
                if (res > nature.plant) {
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


    if (snake === null && rabbit === null && kangaroo === null) {
        winners.plant = winners.plant + 1;
        games = games + 1;
        clearInterval(int);
        mapRefreshState = false;

    } else {
        document.getElementById("steps").innerHTML = steps.toString();
    }

    if (plant === null) {
        winners.animals = winners.animals + 1;
        games = games + 1;
        clearInterval(int);
        mapRefreshState = false;

    } else {
        document.getElementById("steps").innerHTML = steps.toString();
    }

    let pl = winners.plant;
    let ani = winners.animals;
    document.getElementById("winnerPlant").innerHTML = pl.toString();
    document.getElementById("winnerAnimals").innerHTML = ani.toString();
    document.getElementById("games").innerHTML = games.toString();

}
;


function SetMapInterval() {

    if (!mapRefreshState) {

        int = setInterval(RefreshMap, 2);

    }

    mapRefreshState = true;
};


/*Start world*/

map =
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
        "#####################################################################"];

legend =
    {
        "#": Wall,
        "o": Rabbit,
        "K": Kangoo,
        "Ö": Snake,
        "*": Plant
    };

let world = new LifelikeWorld(map, legend);


function Game(map, legend) {

    mapRefreshState = false;

    steps = 0;
    arrayOfLife = [];
    stopCountKangaroo = true;
    stopCountSnake = true;
    stopCountRabbit = true;
    stopCountPlate = true;
    res = 0;
    nature = {
        "kangaroo": 0,
        "snake": 0,
        "rabbit": 0,
        "plant": 0
    };
    world = new LifelikeWorld(map, legend);

    SetMapInterval();
}


