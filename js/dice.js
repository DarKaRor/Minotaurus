export function diceEvent(element) {
    element.addEventListener('click', () => {
        element.innerText = getAction(getRandomInt(1, 7));
    })
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function getAction(num) {
    switch (num) {
        case 1: return "Vos si sois bestia";
        case 2: return "Mueve 3 y salta la talanquera";
        case 3: return "Muro";
        case 4: return "Mueve 5";
        case 5: return "Mueve 4";
        case 6: return "Mueve 6";
        default: return "No se que coño hiciste";
    }
}

let images = ["./img/dice-f-3.svg", "./img/dice-f-4.svg", "./img/dice-f-5.svg", "./img/dice-f-6.svg", "./img/dice-troll-face.png", "./img/dice-wall-face.jpg"];

let dice = document.querySelectorAll("img.dice-btn-img");

let dieOneValue = 1;

export function roll() {

    dice.forEach(function (die1) { die1.classList.add("shake"); });

    setTimeout(function () {
        dice.forEach(function (die) {
            die.classList.remove("shake");
            dice.forEach(function (die1) { die1.classList.add("dice-fade"); });
        });

        dieOneValue = getRandomInt(1, 6);

        document.querySelector("#die1").setAttribute("src", images[dieOneValue]);

    }, 1000);

    setTimeout(function () {
        dice.forEach(function (die) {
            die.classList.remove("dice-fade");
        });

    }, 1500);
}

document.getElementById("dice").addEventListener("click", roll)

//3D Dice Script
let scene = document.querySelector('.scene');
var cube = document.querySelector('.cube');
var rollBtn = document.querySelector('.rollBtn');
var currentClass = '';



export function d3dice() {

    document.querySelectorAll('img.d3-img').forEach((image) =>
        image.classList.add("dice-fade")
    )

    setTimeout(function () {
    document.querySelectorAll('img.d3-img').forEach((image) =>
        image.classList.remove("dice-fade")
    )
    }, 1000);

    
    dieOneValue = getRandomInt(1, 7);   

    let showClass = 'show-' + dieOneValue;
    if (currentClass) {
        cube.classList.remove(currentClass);
    }
    cube.classList.add(showClass);
    currentClass = showClass;

    


};

rollBtn.addEventListener("click", d3dice)

let displayBtn = document.querySelector('.dice-display-btn');
let d2DiceDisplay = document.querySelector('.d2-dice-container');
let d3DiceDisplay = document.querySelector('.d3-dice-container');

function SwapDice(){
    if(d2DiceDisplay.classList.contains("show")) 
    {
        d2DiceDisplay.classList.add("hide");
        d2DiceDisplay.classList.remove("show");
        d3DiceDisplay.classList.remove("hide");
        d3DiceDisplay.classList.add("show");
    }
    else{
        d2DiceDisplay.classList.add("show");
        d2DiceDisplay.classList.remove("hide");
        d3DiceDisplay.classList.remove("show");
        d3DiceDisplay.classList.add("hide");
    }

}



displayBtn.addEventListener("click", SwapDice);