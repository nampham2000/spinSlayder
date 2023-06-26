import { _decorator, Button, Component, EventMouse, input, Input, Node, UITransform, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('OptionPandel')
export class OptionPandel extends Component {
    isHovering: boolean = false;

    onMouseMove(event: EventMouse) {
        const mousePos = event.getLocation();
        const buttonPos = this.node.inverseTransformPoint(new Vec3(mousePos.x,mousePos.y,0),this.node.position);
        const buttonRect = this.node.getComponent(UITransform).contentSize;
        console.log(buttonPos);
        // if (buttonRect) {
        //     if (!this.isHovering) {
        //         this.isHovering = true;
        //         console.log("Mouse entered the button");
        //     }
        // } else {
        //     if (this.isHovering) {
        //         this.isHovering = false;
        //         console.log("Mouse left the button");
        //     }
        // }
    }

    onEnable() {
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }

    onDisable() {
        input.off(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
    }
}



