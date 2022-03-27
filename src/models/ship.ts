import ShipType from './shipType';
import IBoardAssignable from './IBoardAssignable';
import Coordinates from './coordinates';

class Ship  implements IBoardAssignable
{
    fields:Coordinates[];
    length:number;
    isDestroyed?:boolean = false;
    
    protected constructor(){
        this.isDestroyed = false;
        this.length = 0;
        this.fields = new Array<Coordinates>();
    }

    public assignToBoard = (start:Coordinates, end:Coordinates) => {
        if(start.x == end.x){
            for(let i=0;i<this.length;i++){
                this.fields[i] = {x:start.x,y:start.y+i,}
            }

            if(Math.abs(this.fields[0].y - this.fields[this.length-1].y) != this.length-1
                &&  Math.abs(this.fields[0].x - this.fields[this.length-1].x) != this.length-1){
                throw new Error('wrong coordinates')
            }

            if(start.x != this.fields[0].x || start.y != this.fields[0].y || end.x != this.fields[this.length-1].x || end.y != this.fields[this.length-1].y){
                throw new Error('wrong coordinates')
            }
        }
        else if(start.y == end.y){
            for(let i=0;i<this.length;i++){
                this.fields[i] = {x:start.x+i,y:start.y,}
            }
        }
        

        if(!this.validateCanBeAssigned()){
            throw new Error('wrong coodinates');
        }
    }

    public validateCanBeAssigned(): boolean {
        if(this.fields?.length != this.length){
            return false;
        }
        let result = true;
        for(let i=0;i<this.length-1;i++){
            if(this.fields[i].x === this.fields[i+1].x){
                result = this.fields[i].y === this.fields[i+1].y +1 || this.fields[i].y === this.fields[i+1].y -1;
                if(!result){
                    return false;
                }
            }

            if(this.fields[i].y == this.fields[i+1].y){
                result =  this.fields[i].x === this.fields[i+1].x +1 || this.fields[i].x === this.fields[i+1].x -1;
                if(!result){
                    return false;
                }
            }
        }
        return result;
    }

    static createShip = (type:ShipType) : Ship =>{
        switch(type){
            case ShipType.s : return new ShipS();
            case ShipType.m : return new ShipM();
            case ShipType.l : return new ShipL();
            case ShipType.xl : return new ShipXL();
            case ShipType.xll : return new ShipXXL();
            default: throw Error('wrong ship type');
        }
    }
}

class ShipS extends Ship implements IBoardAssignable{
    length = 1
}

class ShipM extends Ship implements IBoardAssignable{
    length = 2
}
class ShipL extends Ship implements IBoardAssignable{
    length = 3
}
class ShipXL extends Ship implements IBoardAssignable{
    length = 4
}
class ShipXXL extends Ship implements IBoardAssignable{
    length = 5;
}


export {Ship};


