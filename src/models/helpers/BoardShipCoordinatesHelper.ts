import Coordinates from "../coordinates";

export default class BoardShipCoordiantesHelper{
    getCoordinates = (coordinates:string) : Coordinates =>{
        const [x,y] = coordinates.split("_");
        if(!x || !y || Number.isInteger(x) || Number.isInteger(y) ){
            throw console.error('Wrong coordinates');
        }
        return {
            x: +x,
            y:+y,
        }
    }
}