import { _decorator, Button, Component, Node, ProgressBar } from 'cc';
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
}

