import Coordinates from "../coordinates";
import BoardShipCoordiantesHelper from "../helpers/BoardShipCoordinatesHelper";
import Player from "../player";
import ShipPlacerSimulator from "./shipPlacerSimulator";

class ShipBattleSimulator{
    constructor(private shipPlaceSimulatur:ShipPlacerSimulator, private helper: BoardShipCoordiantesHelper){}
    
    public simulate(player1:Player,player2:Player){
        this.shipPlaceSimulatur.PlaceAllShipsOnBoard(player1);
        this.shipPlaceSimulatur.PlaceAllShipsOnBoard(player2);
        do{
            this.simulateShoot(player1,player2);
            this.simulateShoot(player2,player1);
        }
        while(player1.hasLost() == false && player2.hasLost()==false)
    }
    
    public async simulateShoot(player:Player, attackedPlayer:Player){
        const allowedFields = player.boardToShoot.fields.filter(x=>!x.isOccupied);
        let field = null;
        do{
            const x = this.helper.getRandomFieldValue();
            const y = this.helper.getRandomFieldValue();
            field = allowedFields.find(f=>f.x==x && f.y == y) as Coordinates
        }
        while(field==null)
        const coordinate = field as Coordinates;
        player.shootToEnemy(coordinate,attackedPlayer);
    }
}

export default ShipBattleSimulator;