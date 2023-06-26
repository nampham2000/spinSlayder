import { _decorator, Component, Node,Animation, Vec2, misc, Vec3, Collider2D, RigidBody2D, Contact2DType, IPhysics2DContact, view, randomRange, Camera, director, tween, VerticalTextAlignment, instantiate, Prefab } from 'cc';
import { BaseEnemy } from './BaseEnemy';
const { ccclass,property} = _decorator;

@ccclass('BatGhostMove')

export class BatGhostMove extends BaseEnemy {
    move(dt: number, character: Node): void {
        super.move(dt, character,60);
    }
    useSkill(dt: number, character: Node, clonePrefab: Prefab): void {
        let cloneCount = 0; 
        const maxClones = 3; 
    
        for (let i = 0; i < maxClones; i++) {
            if (cloneCount >= maxClones) {
                break; 
            }
            const newClone = instantiate(clonePrefab);
            newClone.addComponent(BaseEnemy);
            newClone.getComponent(Collider2D).tag=2;
            newClone.parent = director.getScene().getChildByName("2D").getChildByName("CloneMonster");
            const offset = 50; 
            const newPosition = new Vec3(this.node.position.x + ((i-1) + 1) * offset, this.node.position.y + (i-1) * offset);
            newClone.setPosition(newPosition); 
            newClone.getComponent(Collider2D).apply();
            newClone.active = true;
            cloneCount++; 
        }
        
    }

    Slow(slow:Prefab){
        const slowNode = instantiate(slow);
        slowNode.parent = director.getScene().getChildByName("2D").getChildByName("SlimeSlow");
        slowNode.setPosition(this.node.position);
        setTimeout(() => {
            slowNode.removeFromParent();
        }, 5000);
    }
    
}





