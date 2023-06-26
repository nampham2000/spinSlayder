import { _decorator, Component, Node, Prefab } from 'cc';
import { BaseEnemy } from './BaseEnemy';
const { ccclass, property } = _decorator;

@ccclass('Zombie')
export class Zombie extends BaseEnemy {
    start() {

    }

    update(deltaTime: number) {
        
    }
    move(dt: number, character: Node): void {
        // super.move(dt, character,60);
    }

    public useSkill(dt: number, Character: Node, clone: Prefab): void {
        
    }
}

