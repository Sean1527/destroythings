import { _decorator} from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
const { ccclass, property } = _decorator;

@ccclass('PlayerNPCCtrl')
export class PlayerNPCCtrl extends PlayerCtrl 
{
    start () {
        super.start();
    }

    update (deltaTime: number) 
    {
        super.update(deltaTime);
    }
}
