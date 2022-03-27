import BoardType from "./boardType";
import Coordinates from "./coordinates";
import IOccupier from "./IOccupier";
import ShootType from "./shootType";
class Board{
    public static xLength = 8;
    public static yLength = 8;
    boardType: BoardType;
    fields:Coordinates[];

    constructor(type:BoardType){
        this.fields = new Array<Coordinates>();
        this.boardType = type;
        for(let i=0;i<Board.xLength;i++){
            for(let j=0;j<Board.yLength;j++)
            {
                this.fields.push({
                    x:i,
                    y:j,
                    isOccupied:false,
                    occupier: {fieldType: ShootType.None, fields:[],id:''}
                })
            }
        }
    }

    public setOccupier(occupier:IOccupier){
        const startField = occupier.fields[0];
        const endField = occupier.fields[occupier.fields.length-1];

        const sameLineInX = startField.x === endField.x;
        const sameLineInY = startField.y === endField.y;
        
        if(!sameLineInX && !sameLineInY){
            throw new Error('wrong coordinates for occupier');
        }

        if(sameLineInX){
            for(let i= startField.x; i<=endField.y;i++){
                const field = this.fields.find(field=> field.y == i && field.x == startField.x) as Coordinates;
                
                if(field.isOccupied){
                    throw Error(`field is already occupied by ${field.occupier?.id}`);
                }

                field.isOccupied = true;
                field.occupier = occupier;
            }
        }

        else if(sameLineInY){
            for(let i= startField.x; i<=endField.x;i++){
                const field = this.fields.find(field=> field.x == i && field.y == startField.y) as Coordinates;

                if(field.isOccupied){
                    throw Error(`field is already occupied by ${field.occupier?.id}`);
                }

                field.isOccupied = true;
                field.occupier = occupier;
            }
        }
    }



    public isOccupied(coordinates:Coordinates){
        return this.fields.find(field=>field.x == coordinates.x && field.y == coordinates.y)?.isOccupied;
    }
}

export default Board;