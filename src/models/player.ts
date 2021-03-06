import Board from "./board";
import BoardType from "./boardType";
import Coordinates, { CoordinatesXY } from "./coordinates";
import IOccupier from "./IOccupier";
import { Ship } from "./ship";
import ShipType from "./shipType";
import ShootType from "./shootType";
import {coordinateXY} from '../models/helpers/BoardShipCoordinatesHelper';
export default class Player{
    boardWithShips:Board;
    boardToShoot: Board;
    ships:Ship[];
    readonly name:string;
    
    constructor(name:string){
        this.name = name;
        this.boardWithShips = new Board(BoardType.playerShipsBoard);
        this.boardToShoot = new Board(BoardType.playerAttackBoard);
        this.ships = new Array<Ship>();
    }

    public shootToEnemy(coordinate: Coordinates, enemy:Player){
        const field = this.boardToShoot.fields.find(field=>field.x == coordinate.x && field.y == coordinate.y) as Coordinates;
        if(field.isOccupied){
            throw new Error('already shooted there');
        }
        const shootType = enemy.boardWithShips.isOccupied(coordinate) ? ShootType.Goal : ShootType.Missed

        field.isOccupied = true;
        field.occupier ={
            fields : [coordinate],
            id: 'shoot',
            fieldType: shootType,
        }

        if(shootType == ShootType.Goal){
            enemy.onBeeingShooted(coordinate);
        }
        
    }

    public addShipXY(shipType:ShipType, coordinatesStart:CoordinatesXY, coordinatesEnd:CoordinatesXY){
        const start = coordinateXY(coordinatesStart.x,coordinatesStart.y);
        const end = coordinateXY(coordinatesEnd.x,coordinatesEnd.y);
        this.addShip(shipType,start,end);
    }

    public addShip(shipType:ShipType, coordinatesStart:Coordinates, coordinatesEnd:Coordinates){
        if(this.ships.find(x=>x.type == shipType)){
            throw new Error('Ship this type already assigned');
        }
        const ship = Ship.createShip(shipType);
        ship.assignToBoard(coordinatesStart,coordinatesEnd);
        this.ships.push(ship);
        this.boardWithShips.setOccupier(ship);
    }

    public hasPlacedAllShips() :boolean{
        let placed = true;
        for(let i=1;i<5;i++){
            if(this.ships.find(x=>x.length == i) == null){
                placed = false;
                break;
            }
        }
        return placed;
    }

    public onBeeingShooted(coordinate:Coordinates){
        const shootedField = this.boardWithShips.fields.find(field=>field.x == coordinate.x && field.y == coordinate.y) as Coordinates;
        
        if(!shootedField?.isOccupied){
            throw new Error('should be occupied')
        };

        const ship = shootedField.occupier;
        
        ship.fields.forEach(field=>{
            if(field.x == coordinate.x && field.y == coordinate.y){
                field.isShooted=true;
            }
        })
        

        if(ship.fields.every(field=>field.isShooted)){
            const playerShip = this.ships.find(x=>x.id == ship.id) as Ship;
            playerShip.isDestroyed = true;
        }
    }

    public hasLost():boolean{
        return this.ships.every(ship=>ship.isDestroyed);
    }
}