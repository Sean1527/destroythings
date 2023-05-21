import { _decorator, Component, Node } from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
const { ccclass, property } = _decorator;

@ccclass('TargetCtrl')
export class TargetCtrl extends Component {

    private m_cur_value:number = 3.0;

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

