import { diceEvent} from "./dice.js";
//import Board from "./board.js";


const btn = document.getElementById("btn");
const randomBtn = document.getElementById("rnd");
const canvas = document.getElementById("canvas");

let ctx = canvas.getContext('2d');

const TILES_AMOUNT = 32;
const TILES_SIZE = Math.round(canvas.getAttribute('width') / TILES_AMOUNT)
const GAME_WIDTH = TILES_SIZE * TILES_AMOUNT;
const GAME_HEIGHT = TILES_SIZE * TILES_AMOUNT;

let thicc = 1;

canvas.setAttribute('width', GAME_WIDTH);
canvas.setAttribute('height', GAME_HEIGHT);

// Draw Floor

ClearCanvas();


randomBtn.addEventListener('click', function () {
    ClearCanvas();
    Randomize();
})

function ClearCanvas() {
    for (let x = 0; x < TILES_AMOUNT; x++) {
        for (let y = 0; y < TILES_AMOUNT; y++) {

            let xPos = x * TILES_SIZE;
            let yPos = y * TILES_SIZE;
            let color = "";
            let isBorder = false;
            let isCircle = false;
            let isEmpty = false;
            let currentSize = TILES_SIZE;

            if (x == 0 || y == 0 || x == TILES_AMOUNT - 1 || y == TILES_AMOUNT - 1) color = "#b9fe55";

            else {
                isCircle = true;
                isBorder = true;

                let half = TILES_AMOUNT / 2;

                if (x >= half - 1 && x <= half && y >= half - 1 && y <= half) color = "#555";

                else if (x >= half - 2 && x <= half + 1 && y >= half - 2 && y <= half + 1) {
                    if (x < half) {
                        if (y >= half) color = "#1d7ce6";
                        else color = "yellow";
                    }
                    else {
                        if (y >= half) color = "white";
                        else color = "red";
                    }
                }

                else if (x == 1 || y == 1 || x == TILES_AMOUNT - 2 || y == TILES_AMOUNT - 2) {
                    if (x < 3) {
                        if (y < 3) color = "#FF0";
                        else if (y > TILES_AMOUNT - 4) color = "#1d7ce6";
                        else isEmpty = true;
                    }

                    else if (x > TILES_AMOUNT - 4) {
                        if (y > TILES_AMOUNT - 4) color = "#FFF";
                        else if (y < 3) color = "#F00";
                        else isEmpty = true;
                    }

                    else isEmpty = true;
                }
                else isEmpty = true;
            }

            if (isEmpty) {
                color = "#10b952";
                isBorder = false;
            }

            if (isBorder) {
                currentSize = currentSize - (thicc * 2)
                drawBorder(xPos, yPos, currentSize, currentSize, thicc);
                xPos += thicc;
                yPos += thicc;
            }

            ctx.fillStyle = color;
            ctx.fillRect(xPos, yPos, currentSize, currentSize);

            if (isCircle) {
                ctx.beginPath();
                ctx.arc((x * TILES_SIZE) + TILES_SIZE / 2,(y * TILES_SIZE) + TILES_SIZE / 2, TILES_SIZE / 3.5, 0 * Math.PI, 2 * Math.PI);
                ctx.stroke();
            }
        }
    }
}

function Randomize() {
    for (let x = 1; x < TILES_AMOUNT - 1; x++) {
        for (let y = 1; y < TILES_AMOUNT - 1; y++) {

            let xPos = x * TILES_SIZE;
            let yPos = y * TILES_SIZE;

            var num = Math.floor(Math.random() * (1 - 10)) + 10;
            if (num <= 2) {
                drawBorder(xPos, yPos, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2), thicc)
                switch (num) {
                    case 1: ctx.fillStyle = "#b9fe55"; break;
                    case 2: ctx.fillStyle = "#b4c5cd"; break;
                }
                ctx.fillRect(xPos + thicc, yPos + thicc, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2));
                ctx.beginPath();
                ctx.arc(xPos + TILES_SIZE / 2, yPos + TILES_SIZE / 2, TILES_SIZE / 4, 0 * Math.PI, 2 * Math.PI);
                ctx.stroke();

            }

        }
    }
}

function drawBorder(xPos, yPos, width, height, thickness) {
    ctx.fillStyle = '#000';
    ctx.fillRect(xPos, yPos, width + (thickness * 2), height + (thickness * 2));
}

diceEvent(btn);

function rollDice(){

    dice.forEach(function(die){die.classList.add("shake");});

    setTimeout(function(){
        dice.forEach(function(die){
            die.classList.remove("shake");
        });

        let dieOneValue = Math.floor(Math.random()*6);
        let dieTwoValue = Math.floor(Math.random()*6);

        document.querySelector("#die-1").setAttribute("src", images[dieOneValue]);
        document.querySelector("#die-2").setAttribute("src", images[dieTwoValue]);

    },1000);
}