import { _decorator, Component, Node } from 'cc';
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

    //需要将类型目标类型暴露出去做成可配置的，然后根据这个类型实现不同的反馈效果
    

    start() {

    }

    update(deltaTime: number) {
        
    }

    public GetMyValue():number
    {
        return this.m_cur_value;
    }

    public DestroyMe(player:PlayerCtrl)
    {
        this.node.destroy();
    }
}

