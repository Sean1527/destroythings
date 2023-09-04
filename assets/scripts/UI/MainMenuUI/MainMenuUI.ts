import { _decorator, Component, Label, Node } from 'cc';
import { GameMain } from '../../GameMain';
import { ttPlatform } from '../../Platform/ttPlatform';
import { UserData } from '../../UserData/UserData';
const { ccclass, property } = _decorator;

@ccclass('MainMenuUI')
export class MainMenuUI extends Component {
    @property(Label)
    curMoney: Label = null;

    onEnable () {
        //this.node.on(Node.EventType.TOUCH_END, this.OnStartGame, this);
    }

    onDisable () {
        //this.node.off(Node.EventType.TOUCH_END, this.OnStartGame, this);
    }

    start() {

    }



    public OnStartGame()
    {
        GameMain.GetInstance().LoadLevel();
    }

    public OnUpgradeSkill1()
    {
        ttPlatform.ShowVideoAD(ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_SKILL_1);
    }

    public OnUpgradeSkill2()
    {
        ttPlatform.ShowVideoAD(ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_SKILL_2);
    }

    public OnUpgradeSkill3()
    {
        ttPlatform.ShowVideoAD(ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_SKILL_3);
    }


    update(deltaTime: number) {
        
    }
}

