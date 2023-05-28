import { _decorator, Component, Node } from 'cc';
import { GameMain } from '../../GameMain';
import { ttPlatform } from '../../Platform/ttPlatform';
const { ccclass, property } = _decorator;

@ccclass('WinUI')
export class WinUI extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    public OnWinBack()
    {
        GameMain.GetInstance().LoadMain();
    }

    public OnWinDoubleReward()
    {
        ttPlatform.ShowVideoAD(ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_DOUBLEREWARD);
    }
}

