import React, { useEffect, useState } from "react"
import BoardType from "../models/boardType"
import HTMLReactParser from "html-react-parser";
import Player from "../models/player";
import ReactDOM from 'react-dom';
import $ from 'jquery';
interface Props {
    player: Player
 }



const generateBoard = (boardType:BoardType, player:Player)=>{
    let boardTable = `<table className="chess-board" id=${boardType}><tbody>`
    for(let i=0;i<8;i++){
        boardTable += '<tr><th></th>'
        for(let j=0;j<8;j++){
            const cellId = `${i}_${j}`
            boardTable+=`<td className="light" id="${player.name}_${cellId}"></td>`
        }
        boardTable += '</tr>'
    }
    return boardTable
}

const assignShipsToBoard = (player:Player)=>{
    const coordinatesWithShips = player.ships.map(ship=>ship.fields);
    coordinatesWithShips.forEach(coordinates=>
        coordinates.forEach(coordinate=>{
            const idOnBoard = `${player.name}_${coordinate.x}_${coordinate.y}`;
            const element = document.getElementById(idOnBoard)as HTMLElement
            element.className="ship"
        }));
}
const Board = (props:Props)=>{
    
    useEffect(()=>{
        assignShipsToBoard(props.player);
    })

    return (
    <>
   
    <div className="row">
    
        <div className="column">
        <h2>Ships board for player {props.player.name}</h2>
        {HTMLReactParser(generateBoard(BoardType.playerShipsBoard,props.player))}
        </div>
        <div className="column">
        <h2>Attack board for player {props.player.name}</h2>
        {HTMLReactParser(generateBoard(BoardType.playerAttackBoard,props.player))}
        </div>
    </div>    
        </>)
}

export default Board

