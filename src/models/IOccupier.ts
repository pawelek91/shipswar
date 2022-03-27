import Coordinates from "./coordinates";
import ShootType from "./shootType";

export default interface IOccupier{
    id:string,
    fields:Array<Coordinates>,
    fieldType:ShootType,
}

