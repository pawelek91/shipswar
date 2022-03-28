import IOccupier from "./IOccupier";

export default interface Coordinates{
    x:number;
    y:number;
    isOccupied?:boolean;
    occupier:IOccupier;
}

export interface CoordinatesXY{
    x:number;
    y:number;
}