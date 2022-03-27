import ShipType from './shipType';
import IBoardAssignable from './IBoardAssignable';
import Coordinates from './coordinates';
import IOccupier from './IOccupier';
import ShootType from './shootType';

abstract class Ship  implements IBoardAssignable, IOccupier{
    fields:Coordinates[];
    id:string;
    length:number;
    isDestroyed?:boolean = false;
    abstract type:ShipType;
    fieldType: ShootType = ShootType.None;
    protected constructor(){
        this.isDestroyed = false;
        this.fields = new Array<Coordinates>();
        this.length = 0;
        this.id = `ship_${this.length}`;
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

            
            if(Math.abs(this.fields[0].x - this.fields[this.length-1].x) != this.length-1
                &&  Math.abs(this.fields[0].y - this.fields[this.length-1].y) != this.length-1){
                throw new Error('wrong coordinates')
            }

            if(start.x != this.fields[0].x || start.y != this.fields[0].y || end.x != this.fields[this.length-1].x || end.y != this.fields[this.length-1].y){
                throw new Error('wrong coordinates')
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
            case ShipType.xxl : return new ShipXXL();
            default: throw Error('wrong ship type');
        }
    }
}

class ShipS extends Ship implements IBoardAssignable{
    type: ShipType=  ShipType.s;
    length = 1
}

class ShipM extends Ship implements IBoardAssignable{
    type: ShipType=  ShipType.m;
    length = 2
}
class ShipL extends Ship implements IBoardAssignable{
    type: ShipType=  ShipType.l;
    length = 3
}
class ShipXL extends Ship implements IBoardAssignable{
    type: ShipType=  ShipType.xl;
    length = 4
}
class ShipXXL extends Ship implements IBoardAssignable{
    type: ShipType=  ShipType.xxl;
    length = 5;
}


export {Ship};


