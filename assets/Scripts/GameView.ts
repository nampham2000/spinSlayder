import { _decorator, Button, Component, Label, Node, ProgressBar } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property(ProgressBar)
    private levelPoint: ProgressBar ;

    public get LevelPoint() : ProgressBar {
        return this.levelPoint;
    }

    @property(Button)
    private chooseSize: Button ;

    public get ChooseSize() : Button {
        return this.chooseSize;
    }

    @property(Button)
    private chooseRadius: Button ;

    public get ChooseRadius() : Button {
        return this.chooseRadius;
    }

    @property(Button)
    private chooseSpeedSaw: Button ;

    public get ChooseSpeedSaw() : Button {
        return this.chooseSpeedSaw;
    }

    @property(Button)
    private chooseSpeedChar: Button ;

    public get ChooseSpeedChar() : Button {
        return this.chooseSpeedChar;
    }

    @property(Node)
    private gameOver: Node ;

    public get Gameover() : Node {
        return this.gameOver;
    }

    @property(Label)
    private levelText: Label
    
    public get LevelText() : Label {
        return this.levelText;
    }
    public set LevelText(value: Label){
        value= this.levelText;
    }


}

