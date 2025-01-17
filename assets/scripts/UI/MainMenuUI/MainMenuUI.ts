import { _decorator, Component, Label, Node } from 'cc';
import { GameMain } from '../../GameMain';
import { ttPlatform } from '../../Platform/ttPlatform';
import { UserData } from '../../UserData/UserData';
import { uiManager } from '../../framework/uiManager';
const { ccclass, property } = _decorator;

@ccclass('MainMenuUI')
export class MainMenuUI extends Component {
    @property(Label)
    curMoney: Label = null;

    @property(Node)
    nd_buySkill: Node = null;

    onEnable () {
        //this.node.on(Node.EventType.TOUCH_END, this.OnStartGame, this);
    }

    onDisable () {
        //this.node.off(Node.EventType.TOUCH_END, this.OnStartGame, this);
    }

    start() {

    }



    public OnClickStart()
    {
        this.nd_buySkill.active = true;
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

    onBtnSettingClick () {
        //设置按钮
        uiManager.instance.showDialog('main/setting');
    }
    
    update(deltaTime: number) {
        
    }
}

