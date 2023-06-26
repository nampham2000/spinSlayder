import { _decorator, Component, EventKeyboard, Input, input, tween, KeyCode, Node, Vec3, Animation, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact, director } from 'cc';
import { GameModel } from './GameModel';
const { ccclass, property } = _decorator;

@ccclass('FrogieController')
export class FrogieController extends Component {
    private anim: Animation | null = null;
    public speed:number=50;
    private rigidbody:RigidBody2D;
    private collider:Collider2D;
    protected start(): void {
        this.rigidbody=this.node.getComponent(RigidBody2D);
        this.collider=this.node.getComponent(Collider2D);
        this.anim = this.node.getComponent(Animation);
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionMonser, this);
        this.collider.on(Contact2DType.STAY_CONTACT, this.onCollision, this);
        this.collider.on(Contact2DType.END_CONTACT, this.onCollisionEnd, this);
        
    }
    
    protected onLoad(): void {
        input.on(Input.EventType.KEY_PRESSING, this.onKeyDown, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    
    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    
    protected onKeyDown(event: EventKeyboard): void {
        switch (event.keyCode){
            case KeyCode.ARROW_LEFT:
                const leftDirection = new Vec3(this.node.position.x-this.speed,this.node.position.y, 0);
                    tween(this.node)
                    .to(0, {scale: new Vec3(1, 1, 1)})
                    .to(0.48, {position: leftDirection})
                    .start();
                this.anim.play('WizardRun')
                break;
            case KeyCode.ARROW_RIGHT:
                this.anim.play('WizardRun')
                const rightDirection = new Vec3(this.node.position.x+this.speed,this.node.position.y, 0);
                    tween(this.node)
                    .to(0, {scale: new Vec3(-1, 1, 1)})
                    .to(0.48,{position: rightDirection})
                    .start();
                break;
            case KeyCode.ARROW_UP:
                this.anim.play('WizardRun')
                const upDirection = new Vec3(this.node.position.x,this.node.position.y+this.speed, 0);
                tween(this.node)
                .to(0.48, { position: upDirection})
                .start();
                break;
             case KeyCode.ARROW_DOWN:
                this.anim.play('WizardRun')
                const downDirection = new Vec3(this.node.position.x,this.node.position.y-this.speed, 0);
                tween(this.node)
                .to(0.48, {position: downDirection})
                .start();
                break;
        }
    }
    private onCollisionMonser(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact):void
    {
        
        if(otherCollider.group===4)
        {
            console.log("aaaa");
        }
    }
    private onCollision (selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact):void
    { 
    
        if(otherCollider.tag===3)
        {
            this.speed=40;
        }
    }
    private onCollisionEnd (selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact):void
    { 
        if(otherCollider.tag===3)
        {
            this.speed=50;
        }
    }

}


