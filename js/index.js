import { diceEvent } from "./dice.js";
//import Board from "./board.js";

const btn = document.getElementById("btn");
const randomBtn = document.getElementById("rnd");
const canvas = document.getElementById("canvas");

let ctx = canvas.getContext('2d');

const TILES_AMOUNT = 32;
const TILES_SIZE = Math.round(canvas.getAttribute('width') / TILES_AMOUNT)
const GAME_WIDTH = TILES_SIZE * TILES_AMOUNT;
const GAME_HEIGHT = TILES_SIZE * TILES_AMOUNT;

let thicc = 0.5;

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

            if (x == 0 || y == 0 || x == TILES_AMOUNT - 1 || y == TILES_AMOUNT - 1) {
                ctx.fillStyle = "#b9fe55";
                ctx.fillRect(xPos, yPos, TILES_SIZE, TILES_SIZE);
            }

            else {
                     
                let half = TILES_AMOUNT/2;
                
                if(x>=half-1 && x<=half && y>=half-1 && y<=half){
                    
                    ctx.fillStyle = "#555";
                    ctx.fillRect(xPos, yPos, TILES_SIZE, TILES_SIZE);
                }

                else if(x>=half-2 && x<=half+1 && y>=half-2 && y<=half+1){
                    drawBorder(xPos, yPos, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2), thicc)
                    if(x<half){
                        if(y>=half) ctx.fillStyle="#1d7ce6";
                        else ctx.fillStyle="yellow";
                    }
                    else{
                        if(y>=half) ctx.fillStyle="white";
                        else ctx.fillStyle="red";
                    }
                    ctx.fillRect(xPos + thicc, yPos + thicc, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2));
                }

                else{
                    ctx.fillStyle = "#10b952";
                    ctx.fillRect(xPos, yPos, TILES_SIZE, TILES_SIZE);
                    
                }
                
                
                ctx.beginPath();
                ctx.arc(xPos + TILES_SIZE / 2, yPos + TILES_SIZE / 2, TILES_SIZE / 3.5, 0 * Math.PI, 2 * Math.PI);
                ctx.stroke();
                

                if (x == 1 || y == 1 || x == TILES_AMOUNT - 2 || y == TILES_AMOUNT - 2) {

                    if (x < 3) {

                        if (y < 3) {
                            drawBorder(xPos, yPos, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2), thicc)
                            ctx.fillStyle = "#FF0";

                        }

                        if (y > TILES_AMOUNT - 4) {
                            drawBorder(xPos, yPos, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2), thicc)
                            ctx.fillStyle = "#1d7ce6";

                        }

                        ctx.fillRect(xPos + thicc, yPos + thicc, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2));
                        ctx.beginPath();
                        ctx.arc(xPos + TILES_SIZE / 2, yPos + TILES_SIZE / 2, TILES_SIZE / 3.5, 0 * Math.PI, 2 * Math.PI);
                        ctx.stroke();

                    }

                    else if (x > TILES_AMOUNT - 4) {

                        if (y > TILES_AMOUNT - 4) {

                            drawBorder(xPos, yPos, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2), thicc)
                            ctx.fillStyle = "#FFF";
                            
                        }

                        else if(y<3){
                            drawBorder(xPos, yPos, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2), thicc)
                            ctx.fillStyle = "#F00";
                        }

                        ctx.fillRect(xPos + thicc, yPos + thicc, TILES_SIZE - (thicc * 2), TILES_SIZE - (thicc * 2));
                            ctx.beginPath();
                            ctx.arc(xPos + TILES_SIZE / 2, yPos + TILES_SIZE / 2, TILES_SIZE / 3.5, 0 * Math.PI, 2 * Math.PI);
                            ctx.stroke();
                    }


                }
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