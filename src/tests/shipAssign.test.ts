import {Ship} from '../models/ship';
import ShipType from '../models/shipType';

test('create S ship and place', () => {
  const shipS = Ship.createShip(ShipType.s);
  shipS.assignToBoardXY({x:1,y:1},{x:1,y:1});
  expect(shipS.validateCanBeAssigned()).toBe(true);
});

test('create S ship with wrong coodinates should throw error', () => {
  const shipS = Ship.createShip(ShipType.s);
  const assignWrongCoordinates = () =>{
    shipS.assignToBoardXY({x:1,y:1},{x:2,y:2})
  }
  expect(assignWrongCoordinates).toThrow();
});

test('create M ship and place', () => {
  const shipM = Ship.createShip(ShipType.m);
  shipM.assignToBoardXY({x:1,y:1},{x:1,y:2});
  expect(shipM.validateCanBeAssigned()).toBe(true);
});

test('create M ship with wrong coodinates should throw error', () => {
  const shipM = Ship.createShip(ShipType.m);
  const assignWrongCoordinates = () =>{
    shipM.assignToBoardXY({x:1,y:1},{x:1,y:3})
    shipM.validateCanBeAssigned();
  }
  expect(assignWrongCoordinates).toThrow();
});


test('create L ship and place', () => {
  const shipM = Ship.createShip(ShipType.l);
  shipM.assignToBoardXY({x:1,y:1},{x:3,y:1});
  expect(shipM.validateCanBeAssigned()).toBe(true);
});

test('create L ship with wrong coodinates should throw error', () => {
  const shipM = Ship.createShip(ShipType.l);
  const assignWrongCoordinates = () =>{
    shipM.assignToBoardXY({x:1,y:1},{x:1,y:2})
    shipM.validateCanBeAssigned();
  }
  expect(assignWrongCoordinates).toThrow();
});



test('create XL ship and place', () => {
  const shipM = Ship.createShip(ShipType.xl);
  shipM.assignToBoardXY({x:1,y:1},{x:1,y:4});
  expect(shipM.validateCanBeAssigned()).toBe(true);
});

test('create XL ship with wrong coodinates should throw error', () => {
  const shipM = Ship.createShip(ShipType.xl);
  const assignWrongCoordinates = () =>{
    shipM.assignToBoardXY({x:1,y:1},{x:1,y:3})
    shipM.validateCanBeAssigned();
  }
  expect(assignWrongCoordinates).toThrow();
});



test('create xll ship and place', () => {
  const shipM = Ship.createShip(ShipType.xxl);
  shipM.assignToBoardXY({x:1,y:1},{x:5,y:1});
  expect(shipM.validateCanBeAssigned()).toBe(true);
});

test('create xxl ship with wrong coodinates should throw error', () => {
  const shipM = Ship.createShip(ShipType.xxl);
  const assignWrongCoordinates = () =>{
    shipM.assignToBoardXY({x:1,y:1},{x:2,y:4})
    shipM.validateCanBeAssigned();
  }
  expect(assignWrongCoordinates).toThrow();
});


