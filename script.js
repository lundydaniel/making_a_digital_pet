// console.log('connected');
function Tamogotchi(tamoName) {
    //
    this.petName;
    this.initialFood = 60;
    this.metabolismRate = 1000;

    this.init = () => {
        this.petName = tamoName;
        console.log(`Hi!  I'm ${this.petName}`);
        this.hatch();
    }
    fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
        // this.myMoods = data.moods; Do not need for this assignment
        this.myFoods = data.foods;
    });
    this.init();
}
//* This is how I was thinking before I figured out the above solution.
// fetch("./data.json")
//     .then((response) => response.json())
//     .then((data) => {
//         this.myInfo = data.moods;
//         console.log(myInfo);
// });
Tamogotchi.prototype.resetFood = function() {
    this.food=this.initialFood;
}

Tamogotchi.prototype.hatch = function() {
    this.resetFood();
    this.startMetabolism();
}
Tamogotchi.prototype.die = function() {
    clearInterval(this.metabolism);
    console.log("I am dead!");
}
Tamogotchi.prototype.changeMeta = function() {
    this.die();
    this.metabolismRate = 500;
    this.startMetabolism();
}
Tamogotchi.prototype.startMetabolism = function() {
    this.metabolism = setInterval(()=> {
        this.food -=1;
        console.log(`${this.food} until I starve`);
        if(this.food<=0){
            this.die();
        }
    },this.metabolismRate);
}
Tamogotchi.prototype.randoFoods = function() {
    this.myFood = this.myFoods[Math.floor(this.myFoods.length*Math.random())];
    console.log(this.myFood.foodName);
    // console.log(this.myFood.foodPoints);
    // this.food += `${this.myFood.foodPoints}`; Couldn't seem to get this to add properly. 
    this.food += this.myFood.foodPoints; // GOT ITTTTT!!! This method works. No need for template literal format. 
}
Tamogotchi.prototype.eatLasagna = function() {
    console.log(`can I see the food? ${this.food}`);
    this.food +=20;
}

let alberto = new Tamogotchi("Alberto");
alberto.changeMeta();
alberto.randoFoods();