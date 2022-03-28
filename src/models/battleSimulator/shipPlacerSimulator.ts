import Player from "../player";
import Board from "../board";
import { Ship } from "../ship";
import BoardShipCoordiantesHelper from "../helpers/BoardShipCoordinatesHelper";
import ShipType from "../shipType";
import Coordinates from "../coordinates";
class ShipPlacerSimulator{
    constructor(private helper:BoardShipCoordiantesHelper){
    }
    PlaceAllShipsOnBoard(player:Player){
      this.addXXLShip(player);
      this.addXLShip(player);
      this.addLShip(player);
      this.addMShip(player);
      this.addSShip(player);
    }

    addXXLShip(player:Player){
        const coordinatesStart = this.getXXLCoordinates(player.boardWithShips);
        const coordinatesEnd = {...coordinatesStart};
        coordinatesEnd.x = coordinatesStart.x +this.helper.getShipLengthByType(ShipType.xxl)-1;
        player.addShip(ShipType.xxl,coordinatesStart,coordinatesEnd)    
    }

    getXXLCoordinates(board:Board){

        const shipLength = new BoardShipCoordiantesHelper().getShipLengthByType(ShipType.xl);
        const {x,y} =this.getCoordintesByLength(board,shipLength);
        return <Coordinates>{
            x,
            y,
            isOccupied:false,
            occupier: {fieldType:0,fields:[],id:''}
        }
    }

    addXLShip(player:Player){
        const coordinatesStart = this.getXlCoordinates(player.boardWithShips);
        const coordinatesEnd = {...coordinatesStart};
        coordinatesEnd.x = coordinatesStart.x +this.helper.getShipLengthByType(ShipType.xl)-1;
        player.addShip(ShipType.xl,coordinatesStart,coordinatesEnd)    
    }

    getCoordintesByLength(board:Board,shipLength:number){
        let isOccupied = false;
        let x = 0;
        let y = 0;
        do
        {
            y = this.getRandomFieldValue();
            x = this.getRandomFieldValue();
            isOccupied = board.isOccupiedRange(x,y,shipLength);
        }
        while(x+shipLength > Board.xLength-1 || isOccupied)
        return {x,y};
    }
    
    getXlCoordinates(board:Board){
        const shipLength = new BoardShipCoordiantesHelper().getShipLengthByType(ShipType.xl);
        const {x,y} =this.getCoordintesByLength(board,shipLength);
        return <Coordinates>{
            x,
            y,
            isOccupied:false,
            occupier: {fieldType:0,fields:[],id:''}
        }
    }

    addLShip(player:Player){
        const coordinatesStart = this.getlCoordinates(player.boardWithShips);
        const coordinatesEnd = {...coordinatesStart};
        coordinatesEnd.x = coordinatesStart.x +this.helper.getShipLengthByType(ShipType.l)-1;
        player.addShip(ShipType.l,coordinatesStart,coordinatesEnd)    
    }

    getlCoordinates(board:Board){
        const shipLength = new BoardShipCoordiantesHelper().getShipLengthByType(ShipType.l);
        const {x,y} =this.getCoordintesByLength(board,shipLength);
        return <Coordinates>{
            x,
            y,
            isOccupied:false,
            occupier: {fieldType:0,fields:[],id:''}
        }
    }

    getMCoordinates(board:Board){
        const shipLength = new BoardShipCoordiantesHelper().getShipLengthByType(ShipType.m);
        const {x,y} =this.getCoordintesByLength(board,shipLength);
        return <Coordinates>{
            x,
            y,
            isOccupied:false,
            occupier: {fieldType:0,fields:[],id:''}
        }
    }

    addMShip(player:Player){
        const coordinatesStart = this.getMCoordinates(player.boardWithShips);
        const coordinatesEnd = {...coordinatesStart};
        coordinatesEnd.x = coordinatesStart.x +this.helper.getShipLengthByType(ShipType.m)-1;
        player.addShip(ShipType.m,coordinatesStart,coordinatesEnd)    
    }

    getSCoordinates(board:Board){
        const shipLength = new BoardShipCoordiantesHelper().getShipLengthByType(ShipType.s);
        const {x,y} =this.getCoordintesByLength(board,shipLength);
        return <Coordinates>{
            x,
            y,
            isOccupied:false,
            occupier: {fieldType:0,fields:[],id:''}
        }
    }

    addSShip(player:Player){
        const coordinatesStart = this.getSCoordinates(player.boardWithShips);
        const coordinatesEnd = {...coordinatesStart};
        coordinatesEnd.x = coordinatesStart.x +this.helper.getShipLengthByType(ShipType.s)-1;
        player.addShip(ShipType.s,coordinatesStart,coordinatesEnd)    
    }

    
    

    getRandomFieldValue(){
        return this.helper.getRandomFieldValue();
    }
}

export default ShipPlacerSimulator;