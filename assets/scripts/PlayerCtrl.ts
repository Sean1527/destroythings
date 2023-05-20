import { _decorator, BoxCollider, Component, director, EventTouch, ITriggerEvent, Node, Vec3, view } from 'cc';
import { TargetCtrl } from './TargetCtrl';
const { ccclass, property } = _decorator;

@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {
    
    @property(Node)
    LevelMenu: Node = null;
    @property
    speed: number = 5; // you can adjust this value to set the speed of the node

    @property(Node)
    PlayerObj: Node = null;

    private direction: Vec3 = new Vec3();

    private m_cur_value:number = 0;

    private m_next_values:number[] = [10.0, 15.0, 20.0, 40,0];

    start () {
        // register touch event
        this.LevelMenu.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.LevelMenu.on(Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.LevelMenu.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);

        let Collider = this.node.getComponent(BoxCollider);
        Collider.on('onTriggerEnter', this.onTriggerEnter, this);
        
    }

    _onTouchStart(event: EventTouch) {

        
        for(let i = 0; i < director.root.cameraList.length; ++i)
        {

            if(director.root.cameraList[i].name == "UI")
            {
                let x = event.getLocationX();
                let y = event.getLocationY();
                let dx = x - view.getViewportRect().width / 2;
                let dy = y - view.getViewportRect().height / 2;

                this.direction.x = dx;
                this.direction.z = -dy;
                
                Vec3.normalize(this.direction, this.direction);
                // multiply direction by speed
                Vec3.multiplyScalar(this.direction, this.direction, this.speed);
            }
        }

        
    }

    _onTouchMove(event: EventTouch) {

        
        for(let i = 0; i < director.root.cameraList.length; ++i)
        {

            if(director.root.cameraList[i].name == "UI")
            {
                
                let x = event.getLocationX();
                let y = event.getLocationY();
                let dx = x - view.getViewportRect().width / 2;
                let dy = y - view.getViewportRect().height / 2;

                

                this.direction.x = dx;
                this.direction.z = -dy;
                Vec3.normalize(this.direction, this.direction);
                // multiply direction by speed
                Vec3.multiplyScalar(this.direction, this.direction, this.speed);
            }
        }

        
    }

    _onTouchEnd(event: EventTouch) {

        this.direction = new Vec3(0,0,0);
        
    }

    update (deltaTime: number) {
        // move the node
        const displacement = new Vec3();
        Vec3.multiplyScalar(displacement, this.direction, deltaTime);
        this.node.translate(displacement);
    }

    private onTriggerEnter (event: ITriggerEvent) {
        let node = event.otherCollider.node;
        let target_ctrl = node.getComponent(TargetCtrl)
        if(target_ctrl != null)
        {
            let value = target_ctrl.GetMyValue();
            this.AddValueAndGrow(value);
            target_ctrl.DestroyMe(this);
        }
    }

    private GetCurPhase():number
    {
        for(let i = 0; i < this.m_next_values.length; ++i)
        {
            if(this.m_cur_value < this.m_next_values[i])
            {
                return i;
            }
        }
        return this.m_next_values.length - 1;
    }

    private AddValueAndGrow(value:number)
    {
        let phase_cur = this.GetCurPhase();
        this.m_cur_value += value;
        let phase_next = this.GetCurPhase();
        if(phase_next != phase_cur)
        {
            this.Upgrade(phase_next);
        }
    }

    private Upgrade(phase:number)
    {
        this.PlayerObj.setScale(new Vec3(1.0 + phase * 0.2, 1.0 + phase * 0.2, 1.0 + phase * 0.2))
        this.node.setScale(new Vec3(1.0 + phase * 0.2, 1.0 + phase * 0.2, 1.0 + phase * 0.2))
    }
}
