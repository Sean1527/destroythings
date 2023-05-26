import { _decorator, Component, Enum, Node ,Animation, BoxCollider} from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
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

    start() {

    }


    public GetMyValue():number
    {
        return this.m_cur_value;
    }


    /** 惊吓（触碰但不吞噬） */
    public ScareTarget()
    {   let _targetAni = this.node.getComponent(Animation)
        console.log('targetscare')
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
    {   let _targetAni = this.node.getComponent(Animation)
        this.node.getComponent(BoxCollider).enabled = false;
        this.node.setParent(player);
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
                _targetAni.play('TankDestroyAnim'); 
                break;
        
            default:
                break;      
        }
        //调用销毁方法
        this.DestroyMe(scriptPlayer);
        //调用增加经验的方法
        scriptPlayer.AddValueAndGrow(this.m_cur_value);
    }


    //目标销毁
    public DestroyMe(player:PlayerCtrl)
    {    
        this.node.destroy();
    }


    update(deltaTime: number) {
        
    }
}

