import Player from '../models/player';
import ShipType from '../models/shipType';

test('create player and place all ships', () => {
    const player1 = new Player("testPlayer");

    player1.addShip(ShipType.s, {x:1,y:1},{x:1,y:1});
    player1.addShip(ShipType.m, {x:2,y:1},{x:3,y:1});
    player1.addShip(ShipType.l, {x:4,y:1},{x:6,y:1});
    player1.addShip(ShipType.xl, {x:1,y:2},{x:4,y:2});
    player1.addShip(ShipType.xxl, {x:1,y:3},{x:5,y:3});

    expect(player1.hasPlacedAllShips()).toBe(true);

    expect(player1.boardWithShips.isOccupied({x:1,y:1})).toBe(true);
    expect(player1.boardWithShips.isOccupied({x:3,y:1})).toBe(true);
    expect(player1.boardWithShips.isOccupied({x:5,y:1})).toBe(true);
    expect(player1.boardWithShips.isOccupied({x:2,y:2})).toBe(true);
    expect(player1.boardWithShips.isOccupied({x:4,y:3})).toBe(true);
});


test('create player and place not all ships', () => {
    const player1 = new Player("testPlayer");

    player1.addShip(ShipType.s, {x:1,y:1},{x:1,y:1});
    player1.addShip(ShipType.m, {x:2,y:1},{x:3,y:1});
    // player1.addShip(ShipType.l, {x:4,y:1},{x:6,y:1});
    player1.addShip(ShipType.xl, {x:1,y:2},{x:4,y:2});
    player1.addShip(ShipType.xxl, {x:1,y:3},{x:5,y:3});
    
    expect(player1.hasPlacedAllShips()).toBe(false);
});