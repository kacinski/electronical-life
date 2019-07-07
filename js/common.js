/* Refresh map - controls */

let mapRefreshState = false;

function refreshMap() {
    world.turn();
    document.getElementById("world").innerHTML = world
        .toString()
        .replace(new RegExp(" ", "g"), "🌫")
        .replace(new RegExp("#", "g"), "⬛️")
        .replace(new RegExp("\\*", "g"), "🌿")
        .replace(new RegExp("o", "g"), "🐰")
        .replace(new RegExp("K", "g"), "🦘")
        .replace(new RegExp("Ö", "g"), "🐍");
}

function setMapInterval() {
    if (!mapRefreshState)
        int = setInterval(refreshMap, 200);
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
