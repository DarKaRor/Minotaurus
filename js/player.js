export default class Player{
    constructor(team){
        this.team = team;
        this.isWinner = false;
        this.color = this.checkPlayer(team);
        this.posX = 0;
        this.posY = 0;
    }

    

}

Player.prototype.checkPlayer = function(team)
{
    let color = "";

    switch (team) {
        case 1: color = "red"; break; // Red team
        case 2: color = "white"; break; // White team
        case 3: color = "yellow"; break; // Yellow team
        case 4: color = "#1d7ce6"; break; // Blue team
    }

    return color;
}
