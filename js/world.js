//Common functions, objects

let directions = {
  "n":  new Vector( 0, -1),
  "ne": new Vector( 1, -1),
  "e":  new Vector( 1,  0),
  "se": new Vector( 1,  1),
  "s":  new Vector( 0,  1),
  "sw": new Vector(-1,  1),
  "w":  new Vector(-1,  0),
  "nw": new Vector(-1, -1)
};

let directionNames = "n ne e se s sw w nw".split(" ");

function randomElement(array){
      //Math.floor round number to integer
      return array[Math.floor(Math.random() * array.length)];
}

function elementFromChar(legend, ch){
      if(ch == " ")
            return null;

      let element = new legend[ch](); // legend["#"] = Wall  legend["o"] = BouncingCritter
      element.originChar = ch;
      return element;
}

function charFromElement(element){
      if (element == null)
            return " ";
      else
            return element.originChar;
}

//Vector

function Vector(x , y){
      this.x = x;
      this.y = y;
}
Vector.prototype.plus = function(other){
      return new Vector(this.x + other.x, this.y + other.y);
}

//Grid

function Grid(width, height){
      this.space = new Array(width * height);
      this.width = width;
      this.height = height;
}
Grid.prototype.isInside = function(vector){
      return vector.x >= 0 && vector.x < this.width &&
             vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector){
      return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value){
      this.space[vector.x + this.width * vector.y] = value;
};
Grid.prototype.forEach = function(f, context){
      for(let y = 0; y < this.height; y++){
            for(let x = 0; x < this.width; x++){
                  let value = this.space[x + y * this.width];
                  if(value != null)
                        f.call(context, value, new Vector(x, y));
            }
      }
};

//World

function World(map, legend) {
  let grid = new Grid(map[0].length, map.length);
  this.grid = grid;
  this.legend = legend;

  map.forEach(function(line, y) { //Line = contenido / y = index
    for (let x = 0; x < line.length; x++)
      grid.set(new Vector(x, y),
               elementFromChar(legend, line[x]));
  });
}
World.prototype.toString = function(){
      let output = "";
      for(let y = 0; y < this.grid.height; y++){
            for(let x = 0; x < this.grid.width; x++){
                  let element = this.grid.get(new Vector(x, y));
                  output += charFromElement(element);
            }
            output += "\n";
      }
      return output;
}
World.prototype.turn = function() {
  let acted = [];
  this.grid.forEach(function(critter, vector) {
    if (critter.act && acted.indexOf(critter) == -1) {
      acted.push(critter);
      this.letAct(critter, vector);
    }
  }, this);
};
World.prototype.letAct = function(critter, vector){
      let action = critter.act(new View(this, vector));
      if (action && action.type == "move") {
            let dest = this.checkDestination(action, vector);
            if (dest && this.grid.set(dest) == null) {
                  this.grid.set(vector, null);
                  this.grid.set(dest, critter);
            };
      };
};
World.prototype.checkDestination = function(action, vector){
      if (directions.hasOwnProperty(action.direction)) {
            let dest = vector.plus(directions[action.direction]);
            if (this.grid.isInside(dest))
                  return dest;
      }
};

World.prototype.born = function (x,y, ch) {
    this.grid.set(new Vector(x, y),
        elementFromChar(this.legend, ch));


};

//View

function View(world, vector){
      this.world = world;
      this.vector = vector;
}

View.prototype.look = function(dir){
      let target = this.vector.plus(directions[dir]);
      if (this.world.grid.isInside(target))
            return charFromElement(this.world.grid.get(target));
      else
            return '#';
};

View.prototype.findAll = function(ch){
      let found = [];
      for(let dir in directions){
            if (this.look(dir) == ch) {
                found.push(dir);
            }
      }
      return found;
};

View.prototype.find = function(ch){
      let found = this.findAll(ch);
      if(found.length == 0) return null;
      return randomElement(found);
};

//Lifelike World
function LifelikeWorld(map, legend){
  World.call(this, map, legend);
   // World.born

}

LifelikeWorld.prototype = Object.create(World.prototype);

LifelikeWorld.prototype.letAct = function(critter, vector){
  let action = critter.act(new View(this, vector));
  let handled = action &&
                action.type in actionTypes &&
                actionTypes[action.type].call(this, critter, vector, action);

  if(!handled){
    critter.energy -= 0.2;
    if(critter.energy <= 0)
      this.grid.set(vector, null);
  }
};
