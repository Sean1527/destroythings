
import { _decorator, Component, Sprite, SpriteFrame, Label } from "cc";
import { uiManager } from "../../framework/uiManager";
import { AudioMgr } from "../../framework/AudioMgr";
import { UserData } from "../../UserData/UserData";
const { ccclass, property } = _decorator;

@ccclass("setting")
export class setting extends Component {
    /* class member could be defined like this */
    // dummy = '';

    @property(Sprite)
    spVibrateSwitch: Sprite = null;

    @property(Sprite)
    spSoundSwitch: Sprite = null;

    @property(SpriteFrame)
    imgSwitchOpen: SpriteFrame = null;

    @property(SpriteFrame)
    imgSwitchClose: SpriteFrame = null;

    @property(Label)
    lbVersion: Label = null;
    isSoundOpen: boolean;
    isVibrateOpen: boolean;

    clickTimes = 0;//展示次数

    static checkState(){
        const data = UserData.GetInstance().GetData("IsSoundOpen");
        if (!data) {
            AudioMgr.inst.closeMusic();   
        } else {
            AudioMgr.inst.openMusic();
        }
    }

    start () {
        // Your initialization goes here.
    }

    show () {
        this.clickTimes += 1;

        // this.lbVersion.string = `${i18n.t("setting.version")} ${localConfig.instance.getVersion()}`;
        this.isSoundOpen = UserData.GetInstance().GetData('IsSoundOpen');
        // this.isVibrateOpen = gameLogic.isVibrateOpen();

        this.refreshSwitchUI();
    }

    refreshSwitchUI () {
        if (this.isVibrateOpen) {
            this.spVibrateSwitch.spriteFrame = this.imgSwitchOpen;
        } else {
            this.spVibrateSwitch.spriteFrame = this.imgSwitchClose;
        }

        if (this.isSoundOpen) {
            this.spSoundSwitch.spriteFrame = this.imgSwitchOpen;
        } else {
            this.spSoundSwitch.spriteFrame = this.imgSwitchClose;
        }
    }

    onBtnVibrateClick () {
        this.isVibrateOpen = !this.isVibrateOpen;
        // configuration.instance.setGlobalData('vibrate', this.isVibrateOpen);
        UserData.GetInstance().SetData('IsVibrateOpen', `${this.isVibrateOpen}`);
        this.refreshSwitchUI();
    }

    onBtnSoundClick () {
        this.isSoundOpen = !this.isSoundOpen;

        if (!this.isSoundOpen) {
            AudioMgr.inst.closeMusic();  
        } else {
            AudioMgr.inst.openMusic();
        }
        // configuration.instance.setGlobalData('music', `${this.isSoundOpen}`);
        UserData.GetInstance().SetData('IsSoundOpen', `${this.isSoundOpen}`);
        this.refreshSwitchUI();
    }

    onBtnCloseClick () {
        uiManager.instance.hideDialog('main/setting');
    }

    // update (deltaTime: number) {
    //     // Your update function goes here.
    // }
}
