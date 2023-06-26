import { _decorator, Component, Node,Sprite } from 'cc';
import { Bullet } from './Bullet';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {
    @property({type: Node})
    private frogie: Node = null;

    public get Frogie() : Node {
        return this.frogie;
    }

    @property(Bullet)
    private weapon: Bullet ;

    public get Weapon() : Bullet {
        return this.weapon;
    }
    
}


