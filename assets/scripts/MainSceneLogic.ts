import { _decorator, Component, Node } from 'cc';
import { GameMain } from './GameMain';
const { ccclass, property } = _decorator;

@ccclass('MainSceneLogic')
export class MainSceneLogic extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    public OnStartButtonDown()
    {
        GameMain.GetInstance().LoadLevel();
    }
}

