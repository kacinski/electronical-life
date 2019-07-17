const winners = {
    "plant": 0,
    "animals": 0
};
let games = 0;
let activeAnimal = "*";
let action, inter;
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


    if (rabbit === null && kangaroo === null) {
        winners.plant = winners.plant + 1;
        games = games + 1;
        clearInterval(int);
        let plantWin = confirm(`The game ended in victory of Plant!
         With a score: Plant: ${winners.plant} VS Animals: ${winners.animals}.
     Start new game?`);

        if(plantWin === true){
            new Game(map, legend);
        }else{
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
}
document.onkeydown = function(e) {

    let x = e.charCode || e.keyCode;
    let y = String.fromCharCode(x);

    if (y === "R")
        activeAnimal = "o";
    if(y === "K")
        activeAnimal = "K";
    if(y === "S")
        activeAnimal = "Ö";
    if(y==="P")
        activeAnimal = "*";
    if(y==="W")
        activeAnimal = "#";
};

document.getElementById("world").onmousedown = function(e){
    console.log(e);
    action = true;
    click(e);
    inter = setInterval(click, 100, e);


};

document.getElementById("world").onmouseup = function(){
    action = false;
    clearInterval(inter);
};

document.getElementById("world").onmousemove = function(e) {

    if(action)
        click(e);
};

function SetMapInterval() {

    if (!mapRefreshState) {

        int = setInterval(RefreshMap, 1000);
    }
    mapRefreshState = true;
}

/*Start world*/ // play size = 67x22

map =
       ["#####################################################################",
        "#  #               ***         ****                          *****# #",
        "#  #*Ö ##            ####       ########      ########   o   ****## #",
        "#  #*  ##    o        ##        ########    o ##    ##   **  K ***# #",
        "#  #   ##  *          ##        ##            ##         Ö     ***# #",
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
        "# #K     ##  ##  ##       ##   ##     ######     ##   ##  ##   ## # #",
        "# #       ########    **   ####   **  ##   ##    ######   ######  # #",
        "# #                   **          **                              # #",
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

function click(e){
    let x1= Math.ceil((e.offsetX/21)-1);
    let y1 = Math.ceil((e.offsetY/21)-1);
    world.born(x1, y1, activeAnimal);
}

