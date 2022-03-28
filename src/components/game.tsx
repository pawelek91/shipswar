import React from "react";
import ShipBattleSimulator from "../models/battleSimulator/shipBattleSimulator";
import ShipPlacerSimulator from "../models/battleSimulator/shipPlacerSimulator";
import BoardShipCoordiantesHelper from "../models/helpers/BoardShipCoordinatesHelper";
import Player from "../models/player";
import Board from "./board";


const Game = () =>{
    const helper = new BoardShipCoordiantesHelper();
    const shipPlacerSim = new ShipPlacerSimulator(helper);
    const simulator = new ShipBattleSimulator(shipPlacerSim,helper);
    const player1 = new Player('player 1');
    const player2 = new Player('player 2');
    shipPlacerSim.PlaceAllShipsOnBoard(player1);
    shipPlacerSim.PlaceAllShipsOnBoard(player2);

    
    return(
    <>
    <div>
        <div className="row">
        <Board player={player1} />
        </div>

        <div className="row">
        <Board player={player2} />
        </div>
    </div>
    </>)
}

export default Game;