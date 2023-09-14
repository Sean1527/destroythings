import { _decorator, Component, Node } from 'cc';
import { GameMain } from '../../GameMain';
import { ttPlatform } from '../../Platform/ttPlatform';
import { LevelSceneLogic } from '../../LevelSceneLogic';
const { ccclass, property } = _decorator;

@ccclass('LoseUI')
export class LoseUI extends Component {
    start() {
       
    }

    update(deltaTime: number) {
        
    }

    public OnLoseBack()
    {
        GameMain.GetInstance().LoadMain();
    }

    public OnRevive()
    {
        console.log("clickRevive");
        ttPlatform.ShowVideoAD(ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_REVIVE);
        // LevelSceneLogic.GetInstance().ReviveLevel();
    }
}

