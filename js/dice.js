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