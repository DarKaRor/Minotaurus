import { roll } from "./dice.js"
import { layout } from "./board.js";
import Tile from "./tile.js";
import Player from "./player.js";



const canvas = document.getElementById("canvas");

let ctx = canvas.getContext('2d');

const TILES_AMOUNT = 32;
const TILES_SIZE = Math.round(canvas.getAttribute('width') / TILES_AMOUNT)
const GAME_WIDTH = TILES_SIZE * TILES_AMOUNT;
const GAME_HEIGHT = TILES_SIZE * TILES_AMOUNT;

let thickness = 1;
let radius = 3.5;

let spawnerCount = 0;


canvas.setAttribute('width', GAME_WIDTH);
canvas.setAttribute('height', GAME_HEIGHT);

let numLevel = 1;
let level = layout[numLevel - 1];
let players = [];
let counterCounter = 0;
let currentTeam = 1;
let currentChar = 1;

// Draw Floor

ClearCanvas();

// CreatePlayers
for (let i = 1; i <= spawnerCount / 3; i++) {
    if (!players[i]) players[i] = [];
    let counter = 0;

    for (let j = 1; j <= spawnerCount / 4; j++) {
        if (!players[i][j]) players[i][j] = [];
        let current = new Player(i);
        current.posX = 2 + counter + counterCounter;
        current.posY = 2;
        players[i][j] = current;
        if (j == spawnerCount / 4) counterCounter = 2 + counter + counterCounter;
        counter++;
        DrawPlayer(current);
    }
}

console.log(players);




// Inputs

document.addEventListener('keydown', (event) => {

    const keyName = event.key;
    console.log(keyName);
    let posX = players[currentTeam][currentChar].posX;
    let posY = players[currentTeam][currentChar].posY;
    ClearCanvas();


    // Optimize
    switch (keyName) {
        case "ArrowDown":
            {
                event.preventDefault();
                if (CanPlace(posX, posY + 1, players[currentTeam][currentChar])) {
                    posY++;
                }
                break;
            }
        case "ArrowUp":
            {
                event.preventDefault();
                if (CanPlace(posX, posY - 1, players[currentTeam][currentChar])) {
                    posY--;
                }
                break;
            };
        case "ArrowRight":
            {
                event.preventDefault();
                if (CanPlace(posX + 1, posY, players[currentTeam][currentChar])) {
                    posX++;
                }
                break;
            };
        case "ArrowLeft":
            {
                if (!players[currentTeam][currentChar].isWinner) {
                    event.preventDefault();
                    if (CanPlace(posX - 1, posY, players[currentTeam][currentChar])) {
                        posX--;
                    }
                }
                break;
            }
        case "q":
            {
                if (currentChar < 3) currentChar++;
                else currentChar = 1;
                posX = players[currentTeam][currentChar].posX;
                posY = players[currentTeam][currentChar].posY;
            }
            break;
        case "e": {
            if (currentTeam < 4) currentTeam++;
            else currentTeam = 1;
            posX = players[currentTeam][currentChar].posX;
            posY = players[currentTeam][currentChar].posY;
        }
            break;
    }

    players[currentTeam][currentChar].posX = posX;
    players[currentTeam][currentChar].posY = posY;

    for (let i = 1; i < players.length; i++) {
        for (let j = 1; j < players[i].length; j++) {
            DrawPlayer(players[i][j]);
        }
    }
})

function GetTile(posX, posY) {
    if (level[posY - 1] != undefined) {
        if (level[posY - 1][posX - 1] != undefined) {
            let value = level[posY - 1][posX - 1];
            if (value.length >= 2) return new Tile(value[0], value[1]);
            else return new Tile(value);
        };
    }
    return null;
}

function CanPlace(posX, posY, player) {

    let tile = GetTile(posX, posY);

    console.log(tile);
    if (tile) {
        if (tile.isCollider) return false;
        if ((tile.isSpawn || tile.isGoal) && tile.team != player.team) return false;
        // delete
        if(tile.isGoal){player.isWinner = true;}
        return true;
    }
    return false;
}

function DrawPlayer(player) {
    let posX = player.posX;
    let posY = player.posY;
    ctx.beginPath();
    ctx.arc((posX * TILES_SIZE) + TILES_SIZE / 2, (posY * TILES_SIZE) + TILES_SIZE / 2, TILES_SIZE / 2.1, 0 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = "black";
    ctx.fill();
    ctx.arc((posX * TILES_SIZE) + TILES_SIZE / 2, (posY * TILES_SIZE) + TILES_SIZE / 2, TILES_SIZE / 2.1, 0 * Math.PI, 2 * Math.PI);
    ctx.fillStyle = player.color;
    ctx.fill();
    ctx.stroke();
}

function ClearCanvas() {
    for (let x = 0; x < TILES_AMOUNT; x++) {
        for (let y = 0; y < TILES_AMOUNT; y++) {

            let xPos = x * TILES_SIZE;
            let yPos = y * TILES_SIZE;
            let currentSize = TILES_SIZE;


            if (x == 0 || y == 0 || x == TILES_AMOUNT - 1 || y == TILES_AMOUNT - 1) {
                ctx.fillStyle = "#b9fe55";
                ctx.fillRect(xPos, yPos, currentSize, currentSize);
            }

            else {
                let current;

                let value = level[y - 1][x - 1];

                if (value.length >= 2) current = new Tile(value[0], value[1]);
                else current = new Tile(value);

                if (current.isSpawn && current.team != 5) spawnerCount++;

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
                    ctx.arc((x * TILES_SIZE) + TILES_SIZE / 2, (y * TILES_SIZE) + TILES_SIZE / 2, TILES_SIZE / radius, 0 * Math.PI, 2 * Math.PI);
                    ctx.stroke();
                }

            }
        }
    }
}


function drawBorder(xPos, yPos, width, height, thickness) {
    ctx.fillStyle = '#000';
    ctx.fillRect(xPos, yPos, width + (thickness * 2), height + (thickness * 2));
}

