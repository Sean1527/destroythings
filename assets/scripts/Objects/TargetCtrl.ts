import { _decorator, Component, Enum, Node ,Animation, BoxCollider, Vec3, quat} from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
import { constant } from '../framework/constant';
import { AudioMgr } from '../framework/AudioMgr';
const { ccclass, property } = _decorator;

enum TargetType {
    Building = 0,
    People = 1,
    Animal = 2,
    Tree = 3,
    Buff = 4,
  };

@ccclass('TargetCtrl')
export class TargetCtrl extends Component {
    
    @property()
    private m_cur_value:number = 3.0;//奖励经验值

    @property({type:Enum(TargetType),displayName:"目标类型"})
    private targetType:TargetType = TargetType.Building;
    
    @property()
    private myLevel:number = 3;//目标的等级

    private targetState:number = constant.TARGETSTATE.IDLE;
    // private  _oriRota = new Vec3()
    // private  _oriPos = new Vec3()

    start() {
        let Collider = this.node.getComponent(BoxCollider);
        Collider.on('onTriggerExit', this.onTriggerExit, this);
        
    }
    
    public init()
    {
        this.targetState = constant.TARGETSTATE.IDLE;
        let _targetAni = this.node.getComponent(Animation)
        _targetAni.play()
        AudioMgr.inst.stop();
        
    }

    public GetLevel():number
    {
        return this.myLevel;
    }

    public GetMyValue():number
    {
        return this.m_cur_value;
    }


    /** 惊吓（触碰但不吞噬） */
    public ScareTarget()
    {   //保存初始角度和位置
        // this.node.rotation.getEulerAngles(this._oriRota); 
        // this._oriPos = this.node.getPosition();

        console.log('targetscare')
        let _targetAni = this.node.getComponent(Animation)
        //避免重复播放
        if (this.targetState ===constant.TARGETSTATE.SCARE) {
            return
        }
        this.targetState = constant.TARGETSTATE.SCARE;
        
        switch (this.targetType)
        {
            case TargetType.Building:
                _targetAni.play('scare'); 
                // AudioMgr.inst.playOneShot("scarebuilding",0.6)
                break;
            case TargetType.Animal:
                _targetAni.play('scare'); 
                
                break;
            case TargetType.Tree:
                _targetAni.play('scare'); 
                // AudioMgr.inst.playOneShot("scaretree",0.6)
                break;
            case TargetType.People:
                // _targetAni.play('scare'); 
                // AudioMgr.inst.playOneShot("scarewoman",0.6)
                break;
        
            default:
                break;      
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
        let _targetAni = this.node.getComponent(Animation);
        console.log('targetdestroy')
        switch (this.targetType)
        {
            case TargetType.Building:
                _targetAni.crossFade('die'); 
                AudioMgr.inst.playOneShot("dieBuilding",0.4)
                break;
            case TargetType.Animal:
                _targetAni.crossFade('die'); 
                break;
            case TargetType.Tree:
                _targetAni.crossFade('die'); 
                AudioMgr.inst.playOneShot("dieTree",0.6)
                break;
            case TargetType.People:
                _targetAni.crossFade('CINEMA_4D_die'); 
                AudioMgr.inst.playOneShot("scarewoman",0.6)
                break;
        
            default:
                break;      
        }
         
        setTimeout(() => {
            //调用销毁方法
            this.DestroyMe(scriptPlayer);
            //调用增加经验的方法
            scriptPlayer.AddValueAndGrow(this.m_cur_value);
        }, 800);
      
    }

    private onTriggerExit(){
        if (this.targetState !==constant.TARGETSTATE.DIEING) {
            this.init();
        }
        
    }

    //目标销毁
    public DestroyMe(player:PlayerCtrl)
    {    
        this.node.destroy();
    }


    update(deltaTime: number) {
        
    }
}

