import { _decorator, Component, misc, Node } from 'cc';
import { FrogieController } from './FrogieController';
const { ccclass, property } = _decorator;

@ccclass('CameraController')
export class CameraController extends Component {
    @property({type: FrogieController})
    private frogieController: FrogieController;

    start() {

    }

    update(deltaTime: number) {
        let targerPos = this.frogieController.node.getPosition();
        targerPos.y = misc.clampf(targerPos.y, 0, 550);
        targerPos.x = misc.clampf(targerPos.x, -800, 800);
        let curPos = this.node.getPosition();
        curPos.lerp(targerPos, 0.2);
        this.node.setPosition(curPos);
    }
}


