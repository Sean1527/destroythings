import { _decorator, Component, Label, Node } from 'cc';
import { GameMain } from '../../GameMain';
import { ttPlatform } from '../../Platform/ttPlatform';
import { UserData } from '../../UserData/UserData';
const { ccclass, property } = _decorator;

@ccclass('WinUI')
export class WinUI extends Component {
    @property(Label)
    curMoney: Label = null;

    start() {

    }

    update(deltaTime: number) {
       
    }

    public OnWinBack()
    {
        // GameMain.GetInstance().ChaneMoney(100);//获得100金币
        GameMain.GetInstance().LoadMain();
    }

    public OnWinDoubleReward()
    {
        ttPlatform.ShowVideoAD(ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_DOUBLEREWARD);

    }
}

