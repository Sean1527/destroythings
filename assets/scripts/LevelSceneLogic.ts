import { _decorator, Component, Node } from 'cc';
import { GameMain } from './GameMain';
const { ccclass, property } = _decorator;

@ccclass('LevelSceneLogic')
export class LevelSceneLogic extends Component {
    start() {
        
    }

    update(deltaTime: number) {
        
    }

    public OnBackButtonDown()
    {
        GameMain.GetInstance().LoadMain();
    }
}

