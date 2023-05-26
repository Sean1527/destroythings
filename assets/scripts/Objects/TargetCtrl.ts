import { _decorator, Component, Enum, Node ,Animation, BoxCollider} from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
import { constant } from '../framework/constant';
const { ccclass, property } = _decorator;

enum TargetType {
    Building = 0,
    People = 1,
    Animal = 2,
    Buff = 3,
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


    start() {
        let Collider = this.node.getComponent(BoxCollider);
        Collider.on('onTriggerExit', this.onTriggerExit, this);
    }
    
    public init()
    {
        this.targetState = constant.TARGETSTATE.IDLE;
        let _targetAni = this.node.getComponent(Animation)
        _targetAni.play();
        
    }

    public GetMyValue():number
    {
        return this.m_cur_value;
    }


    /** 惊吓（触碰但不吞噬） */
    public ScareTarget()
    {   
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
                
                break;
            case TargetType.Animal:
            
                break;
            case TargetType.Buff:
            
                break;
            case TargetType.People:
                _targetAni.play('TankScareAnim'); 
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
                
                break;
            case TargetType.Animal:
            
                break;
            case TargetType.Buff:
            
                break;
            case TargetType.People:
                _targetAni.crossFade('TankDestroyAnim'); 
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
        this.init();
        
    }

    //目标销毁
    public DestroyMe(player:PlayerCtrl)
    {    
        this.node.destroy();
    }


    update(deltaTime: number) {
        
    }
}

