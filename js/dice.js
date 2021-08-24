export function diceEvent(element){
element.addEventListener('click', ()=>{
    element.innerText = getAction(getRandomInt(1,7));
})
}

function getRandomInt(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function getAction(num){
    switch(num){
        case 1: return "Vos si sois bestia";
        case 2: return "Mueve 3 y salta la talanquera";
        case 3: return "Muro";
        case 4: return "Mueve 5";
        case 5: return "Mueve 4";
        case 6: return "Mueve 6";
        default: return "No se que coño hiciste";
    }
}

let images = ["./img/dice-f-3.svg", "./img/dice-f-4.svg", "./img/dice-f-5.svg", "./img/dice-f-6.svg",  "./img/dice-troll-face.png",  "./img/dice-wall-face.jpg"];

let dice = document.querySelectorAll("img.dice-btn-img");

let dieOneValue;

export function roll(){

    dice.forEach(function(die1){die1.classList.add("shake");});

    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake");
            dice.forEach(function(die1){die1.classList.add("dice-fade");});
        });

        dieOneValue = Math.floor(Math.random()*6);

        document.querySelector("#die1").setAttribute("src", images[dieOneValue]);

    },1000);

    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("dice-fade");
        });

    },1500);
}

document.getElementById("dice").addEventListener("click" , roll)

//3D Dice Script
let scene = document.querySelector('.scene');
var cube = document.querySelector('.cube');
var rollBtn = document.querySelector('.rollBtn');
var currentClass = '';

function getRandomInt2(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

export function d3dice(){

    var randNum = getRandomInt2(1,7)
    var showClass = 'show-' + randNum;
    if ( currentClass ) {
        cube.classList.remove( currentClass );
      }
    cube.classList.add( showClass );
    currentClass = showClass;

};

rollBtn.addEventListener("click", d3dice)

let displayBtn1 = document.querySelector('.dice-display-btn1');
let displayBtn2 = document.querySelector('.dice-display-btn2');
let d2DiceDisplay = document.querySelector('div.d2-dice-container');
let d3DiceDisplay = document.querySelector('div.d3-dice-container');

let d2Display = d2DiceDisplay.classList.contains("shown");

let d3Display = d3DiceDisplay.classList.contains("hidden");


function diceDisplay3d(){

    d2DiceDisplay.style.display = "none";
    d3DiceDisplay.style.display = "block";
    displayBtn1.style.display = "none";
    displayBtn2.style.display = "block";
    
}
function diceDisplay2d(){

    d3DiceDisplay.style.display = "none"
    d2DiceDisplay.style.display = "block"
    displayBtn1.style.display = "block";
    displayBtn2.style.display = "none";

}

displayBtn1.addEventListener("click", diceDisplay3d);
displayBtn2.addEventListener("click", diceDisplay2d);