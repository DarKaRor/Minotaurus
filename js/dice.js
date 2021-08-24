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

let images = ["../img/dice-f-3.svg", "../img/dice-f-4.svg", "../img/dice-f-5.svg", "../img/dice-f-6.svg",  "../img/dice-troll-face.png",  "../img/dice-wall-face.jpg"];

let dice = document.querySelectorAll("img.dice-btn-img");

export function roll(){

    dice.forEach(function(die1){die1.classList.add("shake");});

    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake");
        });

        let dieOneValue = Math.floor(Math.random()*6);

        document.querySelector("#die1").setAttribute("src", images[dieOneValue]);

    },1000);
}

document.getElementById("dice").addEventListener("click" , roll)