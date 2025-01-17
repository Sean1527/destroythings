import { _decorator, absMax, Animation, BoxCollider, Component, ITriggerEvent, Label, Node, Vec2, Vec3 } from 'cc';
import { TargetCtrl } from './TargetCtrl';
import { LevelSceneLogic } from '../LevelSceneLogic';
import { constant } from '../framework/constant';
import { AudioMgr } from '../framework/AudioMgr';
const { ccclass, property } = _decorator;

@ccclass('PlayerCtrl')
export class PlayerCtrl extends Component {
    @property()
    m_isUser = false;

    @property(Node)
    m_TipsNode: Node = null;

    @property(Node)
    m_LevelTipsNode: Node = null;

    @property
    m_Speed:number = 5.0; // you can adjust this value to set the speed of the node

    @property(Node)
    CameraObj: Node = null;

    @property(Label)
    m_TextLabel: Label = null;
    
    @property(LevelSceneLogic)
    m_LevelSceneLogic:LevelSceneLogic = null

    protected m_cur_value:number = 0;

    public m_next_values:number[] = [3.0, 8.0, 15.0, 20,0];

    protected m_PlayerName:string = "";

    protected m_Direction:Vec3 = new Vec3(0,0,0);

    private targetState:number = constant.TARGETSTATE.IDLE;
    
    

    @property(Node)
    m_NameNode: Node = null;// 在levelSceneLogic里创建npc时会赋值成新创建的节点，如果是玩家的话则用当前绑定的节点

    @property(Node)
    m_namePos: Node = null;


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


        let pos = this.node.getPosition();


        if(this.m_PlayerName == "Player")
            console.log(pos.z)
        if (pos.x < LevelSceneLogic.GetInstance().Left) {
            pos.x = LevelSceneLogic.GetInstance().Left
        }
        if (pos.x > LevelSceneLogic.GetInstance().Right) {
            pos.x = LevelSceneLogic.GetInstance().Right
        }
        if (pos.z < LevelSceneLogic.GetInstance().Bottom) {
            pos.z = LevelSceneLogic.GetInstance().Bottom
        }
        if (pos.z > LevelSceneLogic.GetInstance().Top) {
            pos.z = LevelSceneLogic.GetInstance().Top
        }
        this.node.position = pos

        //名字跟随角色移动
        if(this.m_NameNode != null)
        {
            // Find the Camera component that renders your 3D object
            const camera = LevelSceneLogic.GetInstance().m_Camera;
            const canvas = LevelSceneLogic.GetInstance().m_Canvas;

            // Declare a variable to hold the screen position
            const screenPos = new Vec3();

            // Transform world position to camera screen space
            // Pcamera.worldToScreen(this.m_namePos.getWorldPosition(), screenPos);

            // // Find the Canvas node, which should be the parent of your UI elements

            // // Convert screen position to UI local position
            // const uiosition = canvas.convertToNodeSpaceAR(new Vec3(screenPos.x, screenPos.y, 0));
            const uiPosition = new Vec3();
            camera.convertToUINode(this.m_namePos.getWorldPosition(), this.m_NameNode.parent!,uiPosition);
            this.m_NameNode.position = uiPosition
        }
        
      
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
     * 根据相对距离判断是否能吞噬目标（玩家或物品），并调用相应的反馈
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
            let eatDistance = myRadius - targetRadius; //可吃掉目标的距离，如果小于0则不能吃
            let scareDistance = myRadius + targetRadius;

            //如果比对方半径大且两者距离小于半径差则可吞噬目标
            if (curDistance <= eatDistance && eatDistance >0) {
                target_ctrl.EatTarget(this.node,this)
            }
            else if(curDistance < scareDistance){
                //如果小于半径和，则目标惊吓
                target_ctrl.ScareTarget();
            }
            
            // let eatRatio = Math.max(0,(myRadius + targetRadius - curDistance)/ (targetRadius * 2))
            // // eatRatio >=1代表完全包裹，可吞噬目标，（方形的碰撞盒其实不严谨）
            // if (eatRatio >= 1) {
            //     target_ctrl.EatTarget(this.node,this)
            // }else{
            //     //如果需要根据吞噬程度来控制动画的播放程度可以再继续细分情况
            //     target_ctrl.ScareTarget();
            // }
        }



        //角色间的吞噬逻辑
        let player_ctrl = ndTarget.getComponent(PlayerCtrl);
        if(player_ctrl != null)
        {
            //计算当前距离
            let dx = this.node.position.x -ndTarget.worldPosition.x;
            let dz = this.node.position.z -ndTarget.worldPosition.z;
            let curDistance = Math.sqrt(dx*dx + dz*dz);
            //计算吞噬距离
            let myRadius =this.node.scale.x * this.node.getComponent(BoxCollider).size.x;
            let targetRadius =ndTarget.scale.x * ndTarget.getComponent(BoxCollider).size.x;
            let eatDistance = myRadius - targetRadius; //可吃掉目标的距离，如果小于0则不能吃
            let scareDistance = myRadius + targetRadius;

            //如果两者距离小于半径差且等级高于对方
            if (curDistance <= eatDistance && this.GetCurPhase() > player_ctrl.GetCurPhase()) {
                if (player_ctrl.m_isUser && LevelSceneLogic.GetInstance().InvincibleTime === 0) {
                    ndTarget.active = false;//玩家死亡时直接隐藏节点，复活时恢复
                    LevelSceneLogic.instance.LoseLevel();

                } else {
                    player_ctrl.EatTarget(this.node,this);//对方调用被吃掉的逻辑
                    AudioMgr.inst.playOneShot("eatNpc",1);
                }
                
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
        this.m_NameNode.active = false;//隐藏名字和血条
        
         
        setTimeout(() => {
            //调用销毁方法
            this.DestroyMe();
            //调用增加经验的方法
            scriptPlayer.AddValueAndGrow(this.GetCurPhase() +1);//吞噬我的人增加的经验，值等于我当前等级
        }, 800);
      
    }

    //目标销毁
    public DestroyMe()
    {    
        this.node.destroy();
    }


    public GetCurPhase():number
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
        let ani = this.m_TipsNode.getComponent(Animation);
        let tipsLab = this.m_TipsNode.getComponent(Label);
        //this.m_PlayerData.ExperiencePoints += value;
        let phase_cur = this.GetCurPhase();
        this.m_cur_value += value;
        if (this.m_isUser) {
            tipsLab.string = "+ " + value.toString();
            ani.play();
        }
        let phase_next = this.GetCurPhase();
        if(phase_next != phase_cur)
        {
            this.Upgrade(phase_next);

            let ani1 = this.m_LevelTipsNode.getComponent(Animation);
            if (this.m_isUser) {
                ani1.play();
            }
        }
    }

    private Upgrade(phase:number)
    {
        console.log("Upgrade");
        this.node.setScale(new Vec3(1.0 + phase * 0.35, 1.0 + phase * 0.35, 1.0 + phase * 0.35))
        if (this.m_isUser) {
            //角色的相机额外抬高一些，其实最好有缓动效果
            // this.CameraObj.setScale(new Vec3(1.0 - phase * 0.05, 1.0 - phase * 0.05, 1.0 - phase * 0.05))
        }
        //播放升级音效
        AudioMgr.inst.playOneShot("levelUp",1);
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
    
    public GetType():boolean
    {
        return this.m_isUser;
    }
}
