import ShipPlacerSimulator from "../models/battleSimulator/shipPlacerSimulator";
import BoardShipCoordiantesHelper from "../models/helpers/BoardShipCoordinatesHelper";
import Player from "../models/player";

test('simulate place ships randomlny XXL',()=>{
    const player = new Player('testPlayer');
    const simulator = new ShipPlacerSimulator(new BoardShipCoordiantesHelper());
    simulator.addXXLShip(player);
    expect(player.ships.length).toBe(1);
})

test('simulate place ships randomlny XL',()=>{
    const player = new Player('testPlayer');
    const simulator = new ShipPlacerSimulator(new BoardShipCoordiantesHelper());
    simulator.addXLShip(player);
    expect(player.ships.length).toBe(1);
})

test('simulate place ships randomlny L',()=>{
    const player = new Player('testPlayer');
    const simulator = new ShipPlacerSimulator(new BoardShipCoordiantesHelper());
    simulator.addLShip(player);
    expect(player.ships.length).toBe(1);
})

test('simulate place ships randomlny M',()=>{
    const player = new Player('testPlayer');
    const simulator = new ShipPlacerSimulator(new BoardShipCoordiantesHelper());
    simulator.addMShip(player);
    expect(player.ships.length).toBe(1);
})

test('simulate place ships randomlny S',()=>{
    const player = new Player('testPlayer');
    const simulator = new ShipPlacerSimulator(new BoardShipCoordiantesHelper());
    simulator.addSShip(player);
    expect(player.ships.length).toBe(1);
})

test('simulate place ships randomly TOGETHER',()=>{
    const player = new Player('testPlayer');
    const simulator = new ShipPlacerSimulator(new BoardShipCoordiantesHelper());
    simulator.PlaceAllShipsOnBoard(player);
    expect(player.ships.length).toBe(5);
})