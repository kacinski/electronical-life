//Wall
function Wall(){}

//BouncingCritter (basic world)
function BouncingCritter(){
      this.direction = randomElement(directionNames);
}
BouncingCritter.prototype.act = function(view){
      if(view.look(this.direction) != " ")
            this.direction = view.find(" ") || "s";
      return {type: "move", direction: this.direction}
}

//WallFollower (basic world)
function WallFollower(){
      this.dir = "s";
}

WallFollower.prototype.act = function(view){
      let start = this.dir;
      if(view.look(dirPlus(this.dir, -3)) != " ")
            start = this.dir = dirPlus(this.dir, -2);
      while(view.look(this.dir) != " "){
            this.dir = dirPlus(this.dir, 1);
            if (this.dir == start) break;
      }

      return {type:"move", direction: this.dir};
}

function dirPlus(dir, n){
      let index = directionNames.indexOf(dir);
      return directionNames[(index + n + 8) % 8];
}


/********************************************/

//Lifelike World


//Plant

function Plant(){

  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(context){

  if(this.energy > 15) {
    let space = context.find(" ");
    if (space) {
      return {type: "reproduce", direction: space};
    }
  }

  if(this.energy < 20){
    return {type: "grow"};
  }
};


// function Count(element, quantity){
//
//   return quantity;
// }

//Kangoo
function Kangoo(){
  this.energy = 20;
}
Kangoo.prototype.act = function(context){
  let space = context.find(" ");
  if(this.energy > 60 && space)
    return {type: "reproduce", direction: space};

  let plants = context.findAll("*");
  if(plants.length)
    return {type: "eat", direction: randomElement(plants)};

  if(space)
    return {type: "move", direction: space}
};

//Rabbit
function Rabbit(){
  this.energy = 30;
  this.direction = "s";
}
Rabbit.prototype.act = function(context){
  let space = context.find(" ");

  if(this.energy > 100 && space)
    return {type: "reproduce", direction: space};

  let plants = context.findAll("*");
  if(plants.length)
    return {type: "eat", direction: randomElement(plants)};

  if (context.look(this.direction) != " ")
    this.direction = context.find(" ") || "s";

  return {type: "move", direction: this.direction} 
}

//Snake
function Snake(){
  this.energy = 60;
  this.direction = "s";
  this.totalFood = [];
}
Snake.prototype.act = function(context){
  let space = context.find(" ");

  let foodRabbit = context.findAll( "o") ;
  this.totalFood.push(foodRabbit.length);

  let foodKangoo = context.findAll( "K") ;
  this.totalFood.push(foodKangoo.length);


  let foodInTurns = (this.totalFood.reduce(function(a, b){
    return a + b;
  }) / this.totalFood.length);

  if(this.totalFood.length > 6)
    this.totalFood.shift();

  if(this.energy > 200 && space){
    return {type:"reproduce", direction: space}
  }

  if(foodRabbit.length){
    return {type: "eat", direction: randomElement(foodRabbit)}
  }

  if(foodKangoo.length){
    return {type: "eat", direction: randomElement(foodKangoo)}
  }

  if(context.look(this.direction) != " ")
    this.direction = space || "s";

  return {type: "move", direction: this.direction};
}

//Action handler
let actionTypes = Object.create(null);

actionTypes.grow = function(critter){
  critter.energy += 0.5;
  return true;
};

actionTypes.move = function(critter, vector, action){
  let dest = this.checkDestination(action, vector);
  if(dest == null ||
    critter.energy <= 1 ||
    this.grid.get(dest) != null)
    return false;

  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

actionTypes.eat = function(critter, vector, action) {
  let dest = this.checkDestination(action, vector);
  let atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function(critter, vector, action){
  let baby = elementFromChar(this.legend, critter.originChar);
  let dest = this.checkDestination(action, vector);

  if(dest == null ||
    critter.energy <= 2 * baby.energy ||
    this.grid.set(dest) != null)
    return false;

  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};
