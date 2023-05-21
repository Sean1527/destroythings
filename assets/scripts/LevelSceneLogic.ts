import { _decorator, Component, Node } from 'cc';
import { GameMain } from './GameMain';
import { UserData } from './UserData/UserData';
const { ccclass, property } = _decorator;

@ccclass('LevelSceneLogic')
export class LevelSceneLogic extends Component {
    start() {
        
    }

    update(deltaTime: number) {
        
    }

    public ExitLevel()
    {
        UserData.GetInstance().SavePlayerData();

        GameMain.GetInstance().LoadMain();
    }

    public OnBackButtonDown()
    {
        this.ExitLevel();
        
    }
}

