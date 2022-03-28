import Coordinates from '../models/coordinates';
import Player from '../models/player';
import ShipType from '../models/shipType';
import ShootType from '../models/shootType';
import {coordinateXY} from '../models/helpers/BoardShipCoordinatesHelper';


test('create players and shoot missing fire', () => {
    const player1 = createPlayer1WIthShips();
    const player2 = createPlayer2WIthShips();

    const coordinate = coordinateXY(7,7);
    player1.shootToEnemy( coordinate, player2);
    const shootedField = player1.boardToShoot.fields.find(field=>field.x == coordinate.x && field.y == coordinate.y) as Coordinates;

    expect(shootedField.isOccupied).toBe(true);
    expect(shootedField.occupier?.fieldType == ShootType.Missed);
    expect(player2.ships.find(x=>x.isDestroyed)).toBe(undefined);
});

test('create players and shoot accurace fire',()=>{
    const player1 = createPlayer1WIthShips();
    const player2 = createPlayer2WIthShips();

    const coordinate : Coordinates = {x:6,y:1, occupier: {fieldType: ShootType.None, fields:[], id:''}}
    player1.shootToEnemy( coordinate, player2);

    const shootedField = player1.boardToShoot.fields.find(field=>field.x == coordinate.x && field.y == coordinate.y) as Coordinates;
    expect(shootedField.isOccupied).toBe(true);
    expect(shootedField.occupier?.fieldType == ShootType.Goal);
})

test('destroy enemy ships and wins',()=>{
    const player1 = createPlayer1WIthShips();
    const player2 = createPlayer2WIthShips();

    const coordinatesToShot = player2.ships.map(ship=>ship.fields);
    coordinatesToShot.forEach(coordinates => {
        coordinates.forEach(coordinate=>{
            player1.shootToEnemy(coordinate,player2);
        })
    });
    expect(player2.ships.every(ship=>ship.isDestroyed)).toBe(true);
})



const createPlayer1WIthShips = () :Player =>{
    const player1 = new Player("testPlayer");
    player1.addShip(ShipType.s, coordinateXY(1,1),coordinateXY(1,1));
    player1.addShip(ShipType.m, coordinateXY(2,1),coordinateXY(3,1));
    player1.addShip(ShipType.l, coordinateXY(4,1),coordinateXY(6,1));
    player1.addShip(ShipType.xl, coordinateXY(1,2),coordinateXY(4,2));
    player1.addShip(ShipType.xxl, coordinateXY(1,3),coordinateXY(5,3));
    return player1;
}

const createPlayer2WIthShips = () :Player =>{
    const player2 = new Player("testPlayer");
    player2.addShip(ShipType.s, coordinateXY(1,1),coordinateXY(1,1));
    player2.addShip(ShipType.m, coordinateXY(3,1),coordinateXY(4,1));
    player2.addShip(ShipType.l, coordinateXY(5,1),coordinateXY(7,1));
    player2.addShip(ShipType.xl, coordinateXY(1,3),coordinateXY(4,3));
    player2.addShip(ShipType.xxl, coordinateXY(1,5),coordinateXY(5,5));
    return player2;
}