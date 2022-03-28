import Board from "../board";
import Coordinates from "../coordinates";
import ShipType from "../shipType";

export default class BoardShipCoordiantesHelper{
    getCoordinates = (coordinates:string) : Coordinates =>{
        const [x,y] = coordinates.split("_");
        if(!x || !y || Number.isInteger(x) || Number.isInteger(y) ){
            throw console.error('Wrong coordinates');
        }
        return {
            x: +x,
            y:+y,
            occupier: {fieldType:0,fields:[],id:''}
        }
    }

    getShipLengthByType(type: ShipType){
        return type+1; //it is an enum 
    }

    getRandomFieldValue(){
        const min = 0;
        const max = Board.xLength-1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}