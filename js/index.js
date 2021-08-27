import { roll } from "./dice.js"
import { layout } from "./board.js";
import Tile from "./tile.js";
import Player from "./player.js";
import Goal from "./goals.js";



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
let currentTeam = 0;
let currentChar = 0;

let goals = [];

// Draw Floor
ClearCanvas();


// CreatePlayers
for (let i = 0; i < spawnerCount / 3; i++) {
    if (!players[i]) players[i] = [];

    if (!goals[i]) goals[i] = [];
    let counter = 0;

    for (let j = 0; j < spawnerCount / 4; j++) {
        if (!players[i][j]) players[i][j] = [];
        let current = new Player(i + 1);
        current.posX = 2 + counter + counterCounter;
        current.posY = 2;
        players[i][j] = current;
        if (j == (spawnerCount / 4) - 1) counterCounter = 2 + counter + counterCounter;
        counter++;
        DrawPlayer(current);
    }
}


GetData();

console.log(players);




// Inputs

document.addEventListener('keydown', (event) => {

    const keyName = event.key;
    let currentPlayer = players[currentTeam][currentChar];
    let shouldDraw = false;


    // Optimize
    switch (keyName) {
        case "ArrowDown":
            shouldDraw = MoveTo(0, 1, currentPlayer, event);
            break;

        case "ArrowUp":
            shouldDraw = MoveTo(0, -1, currentPlayer, event);
            break;

        case "ArrowRight":
            shouldDraw = MoveTo(1, 0, currentPlayer, event);
            break;

        case "ArrowLeft":
            shouldDraw = MoveTo(-1, 0, currentPlayer, event);
            break;

        case "q":
            if (currentChar < 2) currentChar++;
            else currentChar = 0;
            break;
        case "e":
            if (currentTeam < 3) currentTeam++;
            else currentTeam = 0;
            break;
    }


    players[currentTeam][currentPlayer] = currentPlayer;

    if (shouldDraw) {
        ClearCanvas();
        for (let i = 0; i < players.length; i++) {
            for (let j = 0; j < players[i].length; j++) {
                DrawPlayer(players[i][j]);
            }
        }
    }
})

function MoveTo(x, y, player, event) {
    event.preventDefault;

    if (CanPlace(player.posX + x, player.posY + y, player)) {
        if(!player.isWinner)
        {player.posX += x;
        player.posY += y;}
        return true;
    }
    return false;
}

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

    //console.log(tile);

    if (tile) {
        if (tile.isCollider) return false;
        if ((tile.isSpawn || tile.isGoal) && tile.team != player.team) return false;
        // delete
        if (tile.isGoal) {
            console.log(player.posX);
            player = PlaceHouse(player);
            console.log(player.posX);
            player.isWinner = true; 
         }
        return true;
    }
    return false;
}


function DrawPlayer(player) {
    let posX = player.posX;
    let posY = player.posY;
    DrawCircle(posX, posY, player.color, TILES_SIZE, 2.1);

}

function DrawCircle(posX, posY, color = "", size, radius) {
    ctx.beginPath();
    ctx.arc((posX * size) + size / 2, (posY * size) + size / 2, size / radius, 0 * Math.PI, 2 * Math.PI);
    if (color) {
        ctx.fillStyle = color;
        ctx.fill();
    }
    ctx.stroke();
}

function GetData() {
    for (let x = 1; x < TILES_AMOUNT - 1; x++) {
        for (let y = 1; y < TILES_AMOUNT - 1; y++) {
            let current;
            let value = level[y - 1][x - 1];

            if (value.length >= 2) current = new Tile(value[0], value[1]);
            else current = new Tile(value);

            if (current.isGoal) {
                let goal = new Goal(current.team);
                goal.posX = x;
                goal.posY = y;
                goals[current.team - 1].push(goal);

            }
        }
    }
}

function PlaceHouse(player) {
    let index = -1;
    for (let i = 0; i < goals.length; i++) {
        if (goals[i][0].team == player.team) {
            index = i;
            break;
        }
    }

    for (let i = 0; i < goals[index].length; i++) {
        let goal = goals[index][i];
        console.log(goal);
        if (!goal.isOccupied) {
            goal.isOccupied = true;
            player.posX = goal.posX;
            player.posY = goal.posY;
            break;
        }
    }

    return player;
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

                // Getting the amount of spawners in the level. Should be Equal for all.
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
                    DrawCircle(x, y, "", TILES_SIZE, radius);
                }
            }
        }
    }
}

console.log(goals);

function drawBorder(xPos, yPos, width, height, thickness) {
    ctx.fillStyle = '#000';
    ctx.fillRect(xPos, yPos, width + (thickness * 2), height + (thickness * 2));
}

