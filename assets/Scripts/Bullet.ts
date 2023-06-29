import { _decorator, CCFloat, CCInteger, Collider2D, Component, Contact2DType, IPhysics2DContact, Node, Prefab, Quat, randomRange, RigidBody2D, tween,Animation, Vec3, view } from 'cc';
import { BatGhostMove } from './BatGhostMove';
const { ccclass, property,requireComponent } = _decorator;

@ccclass('Bullet')
@requireComponent(RigidBody2D)
@requireComponent(Collider2D)
export class Bullet extends Component {
  
    @property({type:CCInteger})
    public Speed:number=2
    @property(Node)
    player:Node
    @property({type: CCFloat})
    public radius: number = 100;
    @property({ type: CCFloat })
    private angle: number = 0
    @property(BatGhostMove)
    BathGhostMove:BatGhostMove;
    @property(Prefab)
    Clonebat:Prefab;
    @property(Prefab)
    slimeSlow:Prefab;


    private rigidbody:RigidBody2D;
    private collider:Collider2D;
    private delta:number=0;
    public kill:number=0;
    public characterLevel:number=1;
    protected onLoad(): void {
      this.rigidbody=this.node.getComponent(RigidBody2D);
      this.collider=this.node.getComponent(Collider2D);
    }

    protected start(): void {
      this.collider.on(Contact2DType.BEGIN_CONTACT, this.onCollision, this);
    }
    update(deltaTime: number) {
      this.angle += this.Speed * deltaTime;
      const x = this.player.position.x + this.radius * Math.cos(this.angle);
      const y = this.player.position.y + this.radius * Math.sin(this.angle);
      this.node.setPosition(x, y);
      const rotation = new Quat();
      Quat.fromEuler(rotation, 0, 0, this.angle * (180 / Math.PI));
      this.node.setRotation(rotation);
      this.node.getComponent(Collider2D).apply();
      this.delta = deltaTime;
    }

    private onCollision (selfCollider:Collider2D,otherCollider:Collider2D,contact:IPhysics2DContact):void
   { 
     if(otherCollider.tag===1)
     {
        this.kill=this.kill+1
        otherCollider.node.active=false;
        otherCollider.node.getComponent(Collider2D).enabled=false;
        otherCollider.node.getComponent(BatGhostMove).useSkill(this.delta,this.player,this.Clonebat);
        otherCollider.node.getComponent(BatGhostMove).Slow(this.slimeSlow);
        setTimeout(() => {
          otherCollider.node.position=this.getRandomPositionOutsideScreen();
          otherCollider.node.getComponent(Animation).play('Move');
          otherCollider.node.getComponent(Collider2D).enabled=true;
        }, 1000);
          
    }
    if(otherCollider.tag===2)
    {
     otherCollider.node.removeFromParent();
    }
    if(otherCollider.tag===5)
    {
      this.kill=this.kill+1
      console.log(this.kill);
      otherCollider.node.getComponent(Animation).play('Die');
      otherCollider.node.getComponent(Collider2D).enabled=false;
      setTimeout(() => {
        otherCollider.node.active=false;
        otherCollider.node.position=this.getRandomPositionOutsideScreen();
        otherCollider.node.getComponent(Animation).play('GhostMove');
        otherCollider.node.getComponent(Collider2D).enabled=true;

      }, 0.46*1000);
    }
  }

   private getRandomPositionOutsideScreen() {
    const screenSize = view.getVisibleSize(); 
    const screenWidth = screenSize.width;
    const screenHeight = screenSize.height;
    const padding = 100; 
    let randomX = 0;
    let randomY = 0;
    if (Math.random() < 0.5) {
      randomX = randomRange(-screenWidth - padding, -padding);
    } else {
      randomX = randomRange(screenWidth + padding, screenWidth);
    }
    if (Math.random() < 0.5) {
      randomY = randomRange(-screenHeight - padding, -padding);
    } else {
      randomY = randomRange(screenHeight + padding, screenHeight);
    }

    return new Vec3(randomX, randomY, 0);
  }
}


