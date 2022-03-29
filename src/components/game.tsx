import React, { useEffect, useState } from "react";
import ShipBattleSimulator from "../models/battleSimulator/shipBattleSimulator";
import ShipPlacerSimulator from "../models/battleSimulator/shipPlacerSimulator";
import BoardShipCoordiantesHelper from "../models/helpers/BoardShipCoordinatesHelper";
import Player from "../models/player";
import Board from "./board";

const player1:Player = new Player('player 1');
const player2 = new Player('player 2');
const helper = new BoardShipCoordiantesHelper();
    const shipPlacerSim = new ShipPlacerSimulator(helper);
    const shipBattleSimulator = new ShipBattleSimulator(shipPlacerSim,helper);
const Game = () =>{
    const [lastShootTime,setlastShootTime] = useState(0);
    
    useEffect(()=>{
    shipPlacerSim.PlaceAllShipsOnBoard(player1);
    shipPlacerSim.PlaceAllShipsOnBoard(player2);

    const int = setInterval(()=>{
        if(!player1.hasLost() && !player2.hasLost()){
            shipBattleSimulator.simulateShoot(player1,player2);
            setlastShootTime(new Date().getMilliseconds());
            shipBattleSimulator.simulateShoot(player2,player1);
            setlastShootTime(new Date().getMilliseconds());
        }
        else{
            clearInterval(int);
            if(player1.hasLost()){
                alert('player 1 has lost');
            }else if(player2.hasLost()){
                alert('player 2 has lost');
            }
        }
        },100)
    },[])

  
    return(
    <>
    <div>
        <div className="row">
        <Board lastShootTime={lastShootTime} player={player1} />
        </div>

        <div className="row">
        <Board lastShootTime={lastShootTime} player={player2} />
        </div>
    </div>
    </>)
}

export default Game;