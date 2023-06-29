import { _decorator, Collider2D, Component, director, instantiate, Node, Prefab, randomRange, randomRangeInt, Vec2, Vec3, view } from 'cc';
import { BaseEnemy } from './BaseEnemy';
import { BatGhostMove } from './BatGhostMove';
import { Bullet } from './Bullet';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
import { FrogieController } from './FrogieController';
const { ccclass, property } = _decorator;

@ccclass('Controller')
export class Controller extends Component {
   @property(GameModel)
   GameModel:GameModel;
   @property(GameView)
   GameView:GameView;
    @property(Prefab)
    private MonsterPrefab:Prefab;
    @property(Prefab)
    private GhostPrefab:Prefab;
    @property(Node)
    private MonstersNode:Node;
    @property(Node)
    private Character:Node;
    @property(Node)
    private CloneMonstersNode:Node;
    
    private monsters: (BaseEnemy | BatGhostMove)[] = [];
    private enemyTypes: { enemyClass: typeof BaseEnemy, prefab: Prefab }[] = [];
    private maxMonsters: number = 10; 
    private monsterCount: number = 0;
    private delta:number=0;
    private killToUpLevel:number=10;
    private BarPoint: number
    private weapon:Node ;
    private nodes:Node[];
    private nodesPos:Vec3[];
    private previousLevel:number;
    private levelup1:boolean=false
    private charLevel:number=0;
    private monsterPrefabsCount:number=1;
    start() {
      this.charLevel=this.GameModel.Weapon.characterLevel;
      this.previousLevel = this.charLevel;
      this.weapon=this.GameModel.Weapon.node;
      this.nodes = [this.GameView.ChooseRadius.node, this.GameView.ChooseSize.node, this.GameView.ChooseSpeedChar.node, this.GameView.ChooseSpeedSaw.node];
      this.enemyTypes = [
        { enemyClass: BaseEnemy, prefab: this.MonsterPrefab },
        { enemyClass: BatGhostMove, prefab: this.GhostPrefab},
      ];
    }
    
    update(deltaTime: number) {
      console.log(this.GameModel.Frogie.getComponent(FrogieController).life);
      this.delta=deltaTime;
      this.getMonster();
      this.getAllMonstersFromNode();
      this.monsters.forEach((monster) => {
        if (monster.node.active) {
          monster.move(deltaTime,this.Character,50);
        }
      });
      this.BarPoint = this.GameModel.Weapon.kill/this.killToUpLevel;
      this.levelBar();
      if (this.charLevel > this.previousLevel) {
        this.ShowAttribute();
        this.previousLevel = this.charLevel;
      }
      this.levelup()
      this.MonstersSpawn();
      this.CheckHeartLife();
      if(this.GameView.LevelText.string)
      {
        this.GameView.LevelText.string = 'Level:' + this.charLevel;
      }
    }
  
  private getMonster(): BaseEnemy | BatGhostMove {
    for (let i = 0; i < this.monsters.length; i++) {
      if (!this.monsters[i].node.activeInHierarchy) {
        this.monsters[i].node.active = true;
        return this.monsters[i];
      }
    }
    
    if (this.monsterCount < this.maxMonsters*this.monsterPrefabsCount) {
      const monsterPrefab = this.enemyTypes[this.monsterPrefabsCount-1].prefab;
      const monsterNode = instantiate(monsterPrefab);
      monsterNode.setPosition(this.getRandomPositionOutsideScreen());
      monsterNode.parent = this.MonstersNode;
      let monster: BaseEnemy | BatGhostMove;
      if (this.charLevel === 1 ) {
        monster = monsterNode.addComponent(BaseEnemy);
      } 
      else if (this.charLevel >= 2 ) 
      {
        this.monsterPrefabsCount=1
        monster = monsterNode.addComponent(BatGhostMove);
      }
      this.monsters.push(monster);
      this.monsterCount++;
      return monster;
    }
    return null;
  }

  private getAllMonstersFromNode(): void {
    const children = this.CloneMonstersNode.children;
    children.forEach((child) => {
      child.getComponent(BaseEnemy).move(this.delta,this.Character,50);
    });
  }

  private MonstersSpawn()
  {
    if(this.charLevel===3)
    {
      this.monsterPrefabsCount=2;
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

  private CheckHeartLife():void
  {
    if(this.GameModel.Frogie.getComponent(FrogieController).life===0)
    {
      this.GameOver();
    }
  }
  private levelBar():void
  {
    if(this.BarPoint<1)
    {
      this.GameView.LevelPoint.progress=this.BarPoint;
    }else if(this.BarPoint>=1)
    {
      this.GameView.LevelPoint.progress=0;
      this.killToUpLevel += 5
      this.GameModel.Weapon.kill = 0;
      this.levelup1=true;
    }
  }

  private levelup()
  {
    if(this.levelup1===true)
    {
      this.charLevel+=1;
      this.levelup1 = false; 
    }
  }

  private shuffleArray(array: any[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  private ShowAttribute():void
  {
    this.nodesPos=[new Vec3(-259,0), new Vec3(20.378,0),  new Vec3(300.247,0)];
    this.shuffleArray(this.nodes);
    const selectedNodes = this.nodes.slice(0, 3);
    selectedNodes.forEach(node => node.active = true);    
    selectedNodes.forEach((node, index) => {
      node.active = true;
      node.position = this.nodesPos[index];
    });  
    director.pause();
  }

  private increaseSize():void
  {
    this.weapon.scale = new Vec3(this.weapon.scale.x + 0.05, this.weapon.scale.y, this.weapon.scale.z);
    this.resume();
  }

  private increaseSpeed():void
  {
    this.weapon.getComponent(Bullet).Speed+=1;
    this.resume();
  }

  private increaseRadius():void
  {
    this.weapon.getComponent(Bullet).radius+=1;
    this.resume();
  
  }

  private increaseSpeedRun():void
  {
    this.GameModel.Frogie.getComponent(FrogieController).speed+=1;
    this.resume();

  }

  private resume():void
  {
    const selectedNodes = this.nodes;
    selectedNodes.forEach(node => node.active = false);  
    director.resume()
  }

  private GameOver():void
  {
    this.GameView.Gameover.active=true;
  }
}

