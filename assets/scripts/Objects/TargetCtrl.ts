import { _decorator, Component, Enum, Node ,Animation} from 'cc';
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
    private m_cur_value:number = 3.0;

    @property({type:Enum(TargetType),displayName:"目标类型"})
    private targetType:TargetType = TargetType.Building;
    
    @property()
    public eatingTime:number = 3; //当前对象被吞噬所需要的时间
    

    start() {

    }

    update(deltaTime: number) {
        
    }

    public GetMyValue():number
    {
        return this.m_cur_value;
    }


    /** 不同类型目标的吞噬表现 */
    public EatingMe(){
        // 保持碰撞期间持续播放以下反馈，当碰撞时间大于eatingTime时，播放吞噬效果
        // 碰撞外围时时间减少慢，碰到中心时减少的块且满足要求的建筑飞离地面
        let _targetAni = this.node.getComponent(Animation)
        switch (this.targetType) {
            case TargetType.Building:
                
                break;
            case TargetType.Animal:
            
                 break;
            case TargetType.Buff:
            
                break;
            case TargetType.People:
                _targetAni.play('TankScareAnim'); 
                setTimeout(() => {
                    this.node.destroy();
                }, this.eatingTime * 1000);
                break;
        
            default:
                break;
        }
    }

    
    public DestroyMe(player:PlayerCtrl)
    {
        this.node.destroy();
    }
}

