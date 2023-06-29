import { _decorator, Component, EventKeyboard, Input, input, tween, KeyCode, Node, Vec3, Animation, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact, director, Vec2, v3 } from 'cc';
import { GameModel } from './GameModel';
const { ccclass, property } = _decorator;

@ccclass('FrogieController')
export class FrogieController extends Component {
    private anim: Animation | null = null;
    public speed:number=100;
    private rigidbody:RigidBody2D;
    public life:number=3;
    private collider:Collider2D;
    private arrowLeftPressed: boolean = false;
    private arrowRightPressed: boolean = false;
    private arrowUpPressed: boolean = false;
    private arrowDownPressed: boolean = false;
    private animationPlaying;
    private axis: Vec2 = new Vec2();
    private offset:number=0;
    private animjoy;
    @property(Node)
    HeartLife:Node;
    protected start(): void {
        this.rigidbody=this.node.getComponent(RigidBody2D);
        this.collider=this.node.getComponent(Collider2D);
        this.anim = this.node.getComponent(Animation);
        this.collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionMonser, this);
        this.collider.on(Contact2DType.STAY_CONTACT, this.onCollision, this);
        this.collider.on(Contact2DType.END_CONTACT, this.onCollisionEnd, this);
    }
    
    protected onLoad(): void {
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_PRESSING, this.onKeyDown, this);
        this.animationPlaying = false; 
        this.animjoy=false;
    }
    
    protected update(dt: number): void {
        const isMoving = this.arrowLeftPressed || this.arrowRightPressed || this.arrowUpPressed || this.arrowDownPressed;
        this.offset=this.speed*dt;
        this.movePlayer();
        this.JoyStickmovePlayer();
    }

    protected onKeyDown(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.arrowLeftPressed = true;
                break;
            case KeyCode.ARROW_RIGHT:
                this.arrowRightPressed = true;
                break;
            case KeyCode.ARROW_UP:
                this.arrowUpPressed = true;
                break;
            case KeyCode.ARROW_DOWN:
                this.arrowDownPressed = true;
                break;
        }
    
        this.movePlayer();
    }

    protected onKeyUp(event: EventKeyboard): void {
        switch (event.keyCode) {
            case KeyCode.ARROW_LEFT:
                this.arrowLeftPressed = false;
                break;
            case KeyCode.ARROW_RIGHT:
                this.arrowRightPressed = false;
                break;
            case KeyCode.ARROW_UP:
                this.arrowUpPressed = false;
                break;
            case KeyCode.ARROW_DOWN:
                this.arrowDownPressed = false;
                break;
        }
    
        this.movePlayer();
    }
    
    protected movePlayer(): void {
        const isMoving = this.arrowLeftPressed || this.arrowRightPressed || this.arrowUpPressed || this.arrowDownPressed;

        if (isMoving && !this.animationPlaying) {
            this.anim.play('WizardRun');
            this.animationPlaying = true;
        } else if (!isMoving && this.animationPlaying) {
            this.anim.play('WizardIde');
            this.animationPlaying = false;
            return;
        }
    
        if (this.arrowLeftPressed && this.arrowUpPressed) {
            if (this.node.position.x > -1200 && this.node.position.y < 700) {
                const diagonalDirection = new Vec3(this.node.position.x -this.offset, this.node.position.y +this.offset, 0);
                this.node.setPosition(diagonalDirection);
            }
        } else if (this.arrowLeftPressed && this.arrowDownPressed) {
            if (this.node.position.x > -1200 && this.node.position.y > -235) {
                const diagonalDirection = new Vec3(this.node.position.x - this.offset, this.node.position.y - this.offset, 0);
                this.node.setPosition(diagonalDirection)
            }
        } else if (this.arrowRightPressed && this.arrowUpPressed) {
            if (this.node.position.x < 850 && this.node.position.y < 700) {
                const diagonalDirection = new Vec3(this.node.position.x + this.offset, this.node.position.y + this.offset, 0);
                this.node.setPosition(diagonalDirection)
            }
        } else if (this.arrowRightPressed && this.arrowDownPressed) {
            if (this.node.position.x < 850 && this.node.position.y > -235) {
                const diagonalDirection = new Vec3(this.node.position.x + this.offset, this.node.position.y - this.offset, 0);
                this.node.setPosition(diagonalDirection)
            }
        } else if (this.arrowLeftPressed) {
            if (this.node.position.x > -1200) {
                const leftDirection = new Vec3(this.node.position.x - this.offset, this.node.position.y, 0);
                this.node.setPosition(leftDirection);
            }
        } else if (this.arrowRightPressed) {
            if (this.node.position.x < 850) {
                const rightDirection = new Vec3(this.node.position.x + this.offset, this.node.position.y, 0);
                this.node.setPosition(rightDirection)
            }
        } else if (this.arrowUpPressed) {
            if (this.node.position.y < 700) {
                const upDirection = new Vec3(this.node.position.x, this.node.position.y + this.offset, 0);
                this.node.setPosition(upDirection)
            }
        } else if (this.arrowDownPressed) {
            if (this.node.position.y > -235) {
                const downDirection = new Vec3(this.node.position.x, this.node.position.y - this.offset, 0);
                this.node.setPosition(downDirection);
            }
        } 
    }
    
    protected JoyStickmovePlayer(): void {
        if (!this.axis.equals(Vec2.ZERO) && !this.animjoy) {
            this.anim.play('WizardRun');
            this.animjoy = true;
        } else if ( this.axis.equals(Vec2.ZERO)&&this.animjoy) {
            this.anim.play('WizardIde');
            this.animjoy = false;
            return;
        }
    
        if ( this.axis.x<0&&this.axis.x>-0.97&& this.axis.y>0&&this.axis.y<0.97) {
            if (this.node.position.x > -1200 && this.node.position.y < 700) {
                const diagonalDirection = new Vec3(this.node.position.x -this.offset, this.node.position.y +this.offset, 0);
                this.node.setPosition(diagonalDirection);
            }
        } else if ( this.axis.x<0&&this.axis.x>-0.97 && this.axis.y<0&&this.axis.y>-0.97) {
            if (this.node.position.x > -1200 && this.node.position.y > -235) {
                const diagonalDirection = new Vec3(this.node.position.x - this.offset, this.node.position.y - this.offset, 0);
                this.node.setPosition(diagonalDirection)
            }
        } else if ( this.axis.x>0&&this.axis.x<0.97 && this.axis.y>0&&this.axis.y<0.97) {
            if (this.node.position.x < 850 && this.node.position.y < 700) {
                const diagonalDirection = new Vec3(this.node.position.x + this.offset, this.node.position.y + this.offset, 0);
                this.node.setPosition(diagonalDirection)
            }
        } else if (this.axis.x>0 && this.axis.x<0.97 && this.axis.y<0&&this.axis.y>-0.97) {
            if (this.node.position.x < 850 && this.node.position.y > -235) {
                const diagonalDirection = new Vec3(this.node.position.x + this.offset, this.node.position.y - this.offset, 0);
                this.node.setPosition(diagonalDirection)
            }
        } else if (this.axis.x<-0.97) {
            if (this.node.position.x > -1200) {
                const leftDirection = new Vec3(this.node.position.x - this.offset, this.node.position.y, 0);
                this.node.setPosition(leftDirection);
            }
        } else if (this.axis.x>0.97) {
            if (this.node.position.x < 850) {
                const rightDirection = new Vec3(this.node.position.x + this.offset, this.node.position.y, 0);
                this.node.setPosition(rightDirection)
            }
        } else if (this.axis.y>0.97) {
            if (this.node.position.y < 700) {
                const upDirection = new Vec3(this.node.position.x, this.node.position.y + this.offset, 0);
                this.node.setPosition(upDirection)
            }
        } else if (this.axis.y<-0.97) {
            if (this.node.position.y > -235) {
                const downDirection = new Vec3(this.node.position.x, this.node.position.y - this.offset, 0);
                this.node.setPosition(downDirection);
            }
        } 
    }
    private waitAndEnableCollision(waitTime: number): void {
        this.collider.off(Contact2DType.BEGIN_CONTACT, this.onCollisionMonser, this);
        this.collider.off(Contact2DType.STAY_CONTACT, this.onCollision, this);
        this.collider.off(Contact2DType.END_CONTACT, this.onCollisionEnd, this);
        setTimeout(() => {
            this.collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionMonser, this);
            this.collider.on(Contact2DType.STAY_CONTACT, this.onCollision, this);
            this.collider.on(Contact2DType.END_CONTACT, this.onCollisionEnd, this);
        }, waitTime * 1000);
      }

    private onCollisionMonser(selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact):void
    {
        
        if(otherCollider.group===4)
        {
            if(this.life!==0)
            {
            this.HeartLife.children[this.life-1].getComponent(Animation).play('HeartDown');
            this.life-=1
            this.waitAndEnableCollision(4);
            }
        }
    }
    private onCollision (selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact):void
    { 
    
        if(otherCollider.tag===3)
        {
            this.speed=80;
        }
    }
    private onCollisionEnd (selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact):void
    { 
        if(otherCollider.tag===3)
        {
            this.speed=100;
        }
    }
   
    public OnMove(event: Event, customEventData: Vec2) {
		this.axis = customEventData;
	}
}


