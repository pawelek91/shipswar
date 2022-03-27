import React from "react"
import boardType from "../models/boardType"
import HTMLReactParser from "html-react-parser";

const onCellClicked = (event:Event)=> {
    console.log(event);
}
const generateBoard = (boardType:boardType)=>{
    let boardTable = `<table className="chess-board" id=${boardType}><tbody>`
    for(let i=0;i<8;i++){
        boardTable += '<tr><th></th>'
        for(let j=0;j<8;j++){
            const cellId = `${i}_${j}`
            boardTable+=`<td className="light" id="${cellId}"></td>`
        }
        boardTable += '</tr>'
    }
    return boardTable
}
const Board= ()=>{
    return (
    <>
    <h2>Board</h2>
    <div className="row">
        <div className="column">
        {HTMLReactParser(generateBoard(boardType.playerShipsBoard))}
        </div>
        <div className="column">
        {HTMLReactParser(generateBoard(boardType.playerAttackBoard))}
        </div>
    </div>    
        </>)
}

export default Board

