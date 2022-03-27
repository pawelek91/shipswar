import Board from "./board";
import BoardType from "./boardType";
import Coordinates from "./coordinates";
import { Ship } from "./ship";
import ShipType from "./shipType";
import ShootType from "./shootType";

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

        const  shootType = enemy.boardWithShips.isOccupied(coordinate) ? ShootType.Goal : ShootType.Missed

        field.isOccupied = true;
        field.occupier ={
            fields : [coordinate],
            id: 'shoot',
            fieldType: shootType,
        }
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



}