export default class Tile {
    constructor(type,team=0) {
        this.type = type;
        this.isCollider = false;
        this.isGoal = false;
        this.isBorder = true;
        this.isCircle = true;
        this.isSpawn = false;
        this.team = 0;

        switch (type) {
            case 1:
                {
                    this.color = "#b9fe55";
                    this.isCollider = true;
                }
                break;
            case 2:
                {
                    this.color = "#b4c5cd";
                    this.isCollider = true;
                    this.isCircle = false;
                }
                break;
            case 3:
                {
                    this.color = this.checkPlayer(team);
                    this.team = team;
                    this.isSpawn = true;
                }
                break;
            case 4:
                {
                    this.color = this.checkPlayer(team);
                    this.team = team;
                    this.isGoal = true;
                }
                break;
            case 0:
            default:
                {
                    this.color = "#10b952";
                    this.isBorder = false;
                }
                break;
        }
    }



}

Tile.prototype.checkPlayer = function(team)
{
    let color = "";

    switch (team) {
        case 1: color = "red"; break; // Red team
        case 2: color = "white"; break; // White team
        case 3: color = "yellow"; break; // Yellow team
        case 4: color = "#1d7ce6"; break; // Blue team
        case 5: color = "#555";break; // Beast
    }

    return color;
}




