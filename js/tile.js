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
                    this.isCircle = false;
                    this.isCollider = true;
                }
                break;
            case 2:
                {
                    this.color = "#b4c5cd";
                    this.isCollider = true;
                }
                break;
            case 3:
                {
                    this.color = this.checkPlayer(team);
                    this.team = team;
                    this.isSpawn = true;
                }
            case 4:
                {
                    this.color = this.checkPlayer(team);
                    this.team = team;
                    this.isGoal = true;
                }
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
        case 1: color = "red"; break;
        case 2: color = "white"; break;
        case 3: color = "yellow"; break;
        case 4: color = "blue"; break;
    }

    return color;
}




