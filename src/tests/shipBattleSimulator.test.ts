import ShipBattleSimulator from "../models/battleSimulator/shipBattleSimulator";
import ShipPlacerSimulator from "../models/battleSimulator/shipPlacerSimulator";
import BoardShipCoordiantesHelper from "../models/helpers/BoardShipCoordinatesHelper";
import Player from "../models/player";

test('main game test (battle between players',()=>{
    const player1 = new Player('player1');
    const player2 = new Player('player2');

    const helper = new BoardShipCoordiantesHelper();
    const simulator = new ShipBattleSimulator(
        new ShipPlacerSimulator(helper),helper
    );

    simulator.simulate(player1,player2);
    const someOneLost = player1.hasLost() || player2.hasLost();
    expect(someOneLost).toBe(true);
})