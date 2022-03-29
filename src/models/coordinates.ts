import IOccupier from "./IOccupier";

export default interface Coordinates{
    x:number;
    y:number;
    isOccupied?:boolean;
    occupier:IOccupier;
    isShooted?:boolean;
}

export interface CoordinatesXY{
    x:number;
    y:number;
}