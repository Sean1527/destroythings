import { _decorator, BoxCollider, Component, ITriggerEvent, Label, Node, Vec3 } from 'cc';
import { TargetCtrl } from './TargetCtrl';
import { LevelSceneLogic } from '../LevelSceneLogic';
import { constant } from '../framework/constant';
const { ccclass, property } = _decorator;

@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {
    
    @property
    m_Speed:number = 5.0; // you can adjust this value to set the speed of the node

    @property(Node)
    PlayerObj: Node = null;

    @property(Label)
    m_TextLabel: Label = null;
    
    @property(LevelSceneLogic)
    m_LevelSceneLogic:LevelSceneLogic = null

    protected m_cur_value:number = 0;

    protected m_next_values:number[] = [10.0, 15.0, 20.0, 40,0];

    protected m_PlayerName:string = "";

    protected m_Direction:Vec3 = new Vec3(0,0,0);

    private targetState:number = constant.TARGETSTATE.IDLE;


    start () 
    {
        let Collider = this.node.getComponent(BoxCollider);
        // Collider.on('onTriggerEnter', this.onTriggerEnter, this);
        Collider.on('onTriggerStay', this.onTriggerStay, this);
        
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
        
        if(target_ctrl != null)
        {
            //计算当前距离
            let dx = this.node.position.x -ndTarget.worldPosition.x;
            let dz = this.node.position.z -ndTarget.worldPosition.z;
            let curDistance = Math.sqrt(dx*dx + dz*dz);
            //计算吞噬距离
            let myRadius =this.node.scale.x * this.node.getComponent(BoxCollider).size.x;
            let targetRadius =ndTarget.scale.x * ndTarget.getComponent(BoxCollider).size.x;
            let eatDistance = myRadius - targetRadius;

            let eatRatio = Math.max(0,(myRadius + targetRadius - curDistance)/ (targetRadius * 2))

            //判断碰撞盒大小比，根据比值判断能否有反馈以及反馈的程度


            
            // eatRatio >=1代表完全包裹，可吞噬目标，（方形的碰撞盒其实不严谨）
            if (eatRatio >= 1) {
                target_ctrl.EatTarget(this.node,this)
            }else{
                //如果需要根据吞噬程度来控制动画的播放程度可以再继续细分情况
                target_ctrl.ScareTarget();
            }
        }

        let player_ctrl = ndTarget.getComponent(PlayerCtrl);
        if(player_ctrl != null)
        {
            if(this.GetCurValue() > player_ctrl.GetCurValue())
            {
                player_ctrl.EatTarget(this.node,this)
            }
           
        }
    }

    /** 被吞噬 */
    public EatTarget(player:Node,scriptPlayer:PlayerCtrl)
    {   
        if (this.targetState ===constant.TARGETSTATE.DIEING) {
            return
        }
        this.targetState = constant.TARGETSTATE.DIEING;
        
        this.node.getComponent(BoxCollider).enabled = false;
        this.node.setParent(player);
        this.node.setPosition(0,0.2,0);
        
         
        setTimeout(() => {
            //调用销毁方法
            this.DestroyMe(scriptPlayer);
            //调用增加经验的方法
            scriptPlayer.AddValueAndGrow(this.m_cur_value);
        }, 800);
      
    }

    //目标销毁
    public DestroyMe(player:PlayerCtrl)
    {    
        this.node.destroy();
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

    public GetCurValue():number
    {
        return this.m_cur_value;
    }

    public AddValueAndGrow(value:number)
    {
        //this.m_PlayerData.ExperiencePoints += value;
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
        console.log("Upgrade");
        this.PlayerObj.setScale(new Vec3(1.0 + phase * 0.2, 1.0 + phase * 0.2, 1.0 + phase * 0.2))
        this.node.setScale(new Vec3(1.0 + phase * 0.2, 1.0 + phase * 0.2, 1.0 + phase * 0.2))
        //this.m_PlayerData.Level += phase;
    }
    
    public SetName(Name:string)
    {
        this.m_PlayerName = Name;
    }

    public SetValue(Value:number)
    {
        let phase_cur = this.GetCurPhase();
        this.m_cur_value = Value;
        let phase_next = this.GetCurPhase();
        if(phase_next != phase_cur)
        {
            this.Upgrade(phase_next);
        }
    }
    public GetName():string
    {
        return this.m_PlayerName
    }

    public GetValue():number
    {
        return this.m_cur_value
    }
}
