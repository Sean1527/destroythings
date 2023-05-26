import { _decorator, BoxCollider, Component, director, EventTouch, ITriggerEvent, Node, Vec3, view } from 'cc';
import { TargetCtrl } from './TargetCtrl';
import { PlayerData } from '../UserData/PlayerData';
import { UserData } from '../UserData/UserData';
const { ccclass, property } = _decorator;

@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {
    
    @property(Node)
    LevelMenu: Node = null;
    @property
    m_Speed:number = 5.0; // you can adjust this value to set the speed of the node

    @property(Node)
    PlayerObj: Node = null;

    

    private m_cur_value:number = 0;

    private m_next_values:number[] = [10.0, 15.0, 20.0, 40,0];

    public m_PlayerData:PlayerData = null;

    private m_PressStarPoint:Vec3 = new Vec3(0,0,0);
    private m_Direction:Vec3 = new Vec3(0,0,0);

    start () {
        // register touch event
        this.LevelMenu.on(Node.EventType.TOUCH_MOVE, this.OnTouchMove, this);
        this.LevelMenu.on(Node.EventType.TOUCH_START, this.OnTouchStart, this);
        this.LevelMenu.on(Node.EventType.TOUCH_END, this.OnTouchEnd, this);

        let Collider = this.node.getComponent(BoxCollider);
        // Collider.on('onTriggerEnter', this.onTriggerEnter, this);
        Collider.on('onTriggerStay', this.onTriggerStay, this);
        Collider.on('onTriggerExit', this.onTriggerExit, this);
        this.m_PlayerData = UserData.GetInstance().GetPlayerData();
    }

    private OnTouchStart(event: EventTouch) 
    {
        this.m_PressStarPoint = new Vec3(event.getLocationX(), 0, event.getLocationY());
    }

    private OnTouchMove(event: EventTouch) 
    {
        let CurrentPressPoint = new Vec3(event.getLocationX(), 0, event.getLocationY());
        Vec3.subtract(this.m_Direction, CurrentPressPoint, this.m_PressStarPoint);
        Vec3.normalize(this.m_Direction, this.m_Direction);
        this.m_Direction.z = -this.m_Direction.z
        Vec3.multiplyScalar(this.m_Direction, this.m_Direction, this.m_Speed);
    }

    private OnTouchEnd(event: EventTouch) {

        this.m_PressStarPoint = this.m_Direction = new Vec3(0,0,0);
        
    }

    update (deltaTime: number) {
        // move the node
        const displacement = new Vec3();
        Vec3.multiplyScalar(displacement, this.m_Direction, deltaTime);
        this.node.translate(displacement);
    }


    // private onTriggerEnter (event: ITriggerEvent) {
    //     let node = event.otherCollider.node;
    //     let target_ctrl = node.getComponent(TargetCtrl)
    //     if(target_ctrl != null)
    //     {
    //         // let value = target_ctrl.GetMyValue();
    //         // this.AddValueAndGrow(value);
    //         target_ctrl.DestroyMe(this);
    //     }
    // }

    /** 
     * 根据相对距离判断是否能吞噬目标，并调用相应的反馈
     */
    private onTriggerStay (event: ITriggerEvent)
    {
        let ndTarget = event.otherCollider.node;
        let target_ctrl = ndTarget.getComponent(TargetCtrl);
        //计算当前距离
        let dx = this.node.position.x -ndTarget.position.x;
        let dz = this.node.position.z -ndTarget.position.z;
        let curDistance = Math.sqrt(dx*dx + dz*dz);
        //计算吞噬距离
        let myRadius =this.node.scale.x * this.node.getComponent(BoxCollider).size.x;
        let targetRadius =ndTarget.scale.x * this.node.getComponent(BoxCollider).size.x;
        let eatDistance = myRadius - targetRadius;

        let eatRatio = Math.max(0,(myRadius + targetRadius - curDistance)/ (targetRadius * 2))
        
        // eatRatio >=1代表完全包裹，可吞噬目标，（方形的碰撞盒其实不严谨）
        if (eatRatio >= 1) {
            target_ctrl.EatTarget(this.node,this)
        }else{
            //如果需要根据吞噬程度来控制动画的播放程度可以再继续细分情况
            target_ctrl.ScareTarget();
        }
    }

    private onTriggerExit(){
        
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

    public AddValueAndGrow(value:number)
    {
        this.m_PlayerData.ExperiencePoints += value;
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
        this.m_PlayerData.Level += phase;
    }
    

}
