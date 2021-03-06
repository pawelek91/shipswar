import { Ship } from "../models/ship";
import Coordinates from "../models/coordinates";
import IOccupier from "../models/IOccupier";
import ShipType from "../models/shipType";
import Board from "../models/board";
import BoardType from "../models/boardType";
import exp from "constants";

test('place ship S at empty board', () => {
    const board = new Board(BoardType.playerShipsBoard);
    const shipS = Ship.createShip(ShipType.s);
    shipS.assignToBoardXY({x:1,y:1},{x:1,y:1});
    board.setOccupier(shipS);
    const isOccupied = board.isOccupiedXY({x:1,y:1});
    expect(board.isOccupiedXY({x:1,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:1,y:2})).toBe(false);
  });

  
test('place ship XL at empty board', () => {
    const board = new Board(BoardType.playerShipsBoard);
    const shipS = Ship.createShip(ShipType.xxl);
    shipS.assignToBoardXY({x:1,y:1},{x:1,y:5});
    board.setOccupier(shipS);
    expect(board.isOccupiedXY({x:1,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:1,y:3})).toBe(true);
    expect(board.isOccupiedXY({x:1,y:5})).toBe(true);
    expect(board.isOccupiedXY({x:2,y:1})).toBe(false);
  });

    
test('place ship XL at empty board', () => {
    const board = new Board(BoardType.playerShipsBoard);
    const shipS = Ship.createShip(ShipType.xxl);
    shipS.assignToBoardXY({x:1,y:1},{x:5,y:1});
    board.setOccupier(shipS);
    expect(board.isOccupiedXY({x:1,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:2,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:3,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:4,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:1,y:2})).toBe(false);
  });

  test('place ship XL at occupier board with no conflicts', () => {
    const board = new Board(BoardType.playerShipsBoard);
    const ship1 = Ship.createShip(ShipType.xxl);
    const ship2 = Ship.createShip(ShipType.xxl);
    
    ship1.assignToBoardXY({x:1,y:1},{x:5,y:1});
    board.setOccupier(ship1);

    ship2.assignToBoardXY({x:2,y:2},{x:2,y:6});
    board.setOccupier(ship2);

    expect(board.isOccupiedXY({x:1,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:2,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:3,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:4,y:1})).toBe(true);
    expect(board.isOccupiedXY({x:1,y:2})).toBe(false);
  });

  test('place ship XL at occupier board with conflict should throw error', () => {
    const board = new Board(BoardType.playerShipsBoard);
    const ship1 = Ship.createShip(ShipType.xxl);
    const ship2 = Ship.createShip(ShipType.xxl);
    
    ship1.assignToBoardXY({x:1,y:2},{x:5,y:2});
    board.setOccupier(ship1);

    const funcCauseError = () =>{
        ship2.assignToBoardXY({x:1,y:2},{x:1,y:6});
        board.setOccupier(ship2);
    }
    expect(funcCauseError).toThrow();
  });