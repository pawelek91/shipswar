import Coordinates from './coordinates';
import {Ship} from './ship';
export default interface IBoardAssignable{
    assignToBoard(start:Coordinates, end:Coordinates):void;
    validateCanBeAssigned(ship:Ship):boolean;
}