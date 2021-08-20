import { diceEvent } from "./dice.js";
import {layout} from "./board.js";
import Tile from "./tile.js";

const btn = document.getElementById("btn");
const randomBtn = document.getElementById("rnd");
const canvas = document.getElementById("canvas");

let ctx = canvas.getContext('2d');

const TILES_AMOUNT = 32;
const TILES_SIZE = Math.round(canvas.getAttribute('width') / TILES_AMOUNT)
const GAME_WIDTH = TILES_SIZE * TILES_AMOUNT;
const GAME_HEIGHT = TILES_SIZE * TILES_AMOUNT;

let thickness = 1;
let radius = 3.5;

canvas.setAttribute('width', GAME_WIDTH);
canvas.setAttribute('height', GAME_HEIGHT);

let numLevel = 2;
let level = layout[numLevel-1];


// Draw Floor

ClearCanvas();

randomBtn.addEventListener('click', function () {
    ClearCanvas();
    Randomize();
})

function ClearCanvas(){
    for(let x = 0; x< TILES_AMOUNT;x++){
        for(let y =0;y<TILES_AMOUNT;y++){

            let xPos = x * TILES_SIZE;
            let yPos = y * TILES_SIZE;
            let currentSize = TILES_SIZE;
            if (x == 0 || y == 0 || x == TILES_AMOUNT - 1 || y == TILES_AMOUNT - 1) 
            {
                ctx.fillStyle ="#b9fe55";
                ctx.fillRect(xPos, yPos, currentSize, currentSize);
            }

            else
            {
                let current;
                
                if(level[y-1][x-1].length>=2) current = new Tile(level[y-1][x-1][0],level[y-1][x-1][1]);
                else current= new Tile(level[y-1][x-1]);

                if (current.isBorder) {
                    currentSize = currentSize - (thickness * 2)
                    drawBorder(xPos, yPos, currentSize, currentSize, thickness);
                    xPos += thickness;
                    yPos += thickness;
                }

                ctx.fillStyle = current.color;
                ctx.fillRect(xPos, yPos, currentSize, currentSize);
    
                if (current.isCircle) {
                    ctx.beginPath();
                    ctx.arc((x * TILES_SIZE) + TILES_SIZE / 2,(y * TILES_SIZE) + TILES_SIZE / 2, TILES_SIZE / radius, 0 * Math.PI, 2 * Math.PI);
                    ctx.stroke();
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
                drawBorder(xPos, yPos, TILES_SIZE - (thickness * 2), TILES_SIZE - (thickness * 2), thickness)
                switch (num) {
                    case 1: ctx.fillStyle = "#b9fe55"; break;
                    case 2: ctx.fillStyle = "#b4c5cd"; break;
                }
                ctx.fillRect(xPos + thickness, yPos + thickness, TILES_SIZE - (thickness * 2), TILES_SIZE - (thickness * 2));
                ctx.beginPath();
                ctx.arc(xPos + TILES_SIZE / 2, yPos + TILES_SIZE / 2, TILES_SIZE / radius, 0 * Math.PI, 2 * Math.PI);
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