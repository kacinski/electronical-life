const winners = {
    "plant": 0,
    "animals": 0
};
let games = 0;

/* Refresh map - controls */


function RefreshMap(index) {
   this.index = index;
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
    new MaxCount("maxKangaroo", kangaroo);


    let snake = world
        .toString()
        .match(/Ö/g);
    new Count("Snake", snake);
    new MaxCount("maxSnake", snake);

    let rabbit = world
        .toString()
        .match(/o/g);
    new Count("Rabbit", rabbit);
    new MaxCount("maxRabbit", rabbit);

    let plant = world
        .toString()
        .match(/\*/g);
    new Count("Plant", plant);
    new MaxCount("maxPlant", plant);




    if (rabbit === null && kangaroo === null && snake === null) {
        winners.plant = winners.plant + 1;
        games = games + 1;
        clearInterval(int);
        let plantWin = confirm(`The game ended in victory of Plant!
         With a score: Plant: ${winners.plant} VS Animals: ${winners.animals}.
     Start new game?`);

        if(plantWin === true){
            new Game(map, legend);
        }
        if(confirm === false){
            window.location.reload();
        }

    } else {
        document.getElementById("steps").innerHTML = steps.toString();
    }

    if (plant === null) {
        winners.animals = winners.animals + 1;
        games = games + 1;
        clearInterval(int);
        let animalsWin = confirm(`The game ended in victory of Animals!
         With a score: Plant: ${winners.plant} VS Animals: ${winners.animals}.
     Start new game?`);
        if(animalsWin){
            new Game(map, legend);
        }else{
            window.location.reload();
        }



    } else {
        document.getElementById("steps").innerHTML = steps.toString();
    }

    if(!this.index) {
        document.getElementById("winnerPlant").innerHTML = winners.plant.toString();
        document.getElementById("winnerAnimals").innerHTML = winners.animals.toString();
        document.getElementById("games").innerHTML = games.toString();
    }

    document.getElementById("world").onclick = function(e){

        console.log(e)
    }

}



function SetMapInterval() {

    if (!mapRefreshState) {

        int = setInterval(RefreshMap, 1);

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

window.setInterval(()=>world.born(),300);

function Game(map, legend) {

    mapRefreshState = false;
    steps = 0;
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

function OneStep (){
   new RefreshMap(true);
}


