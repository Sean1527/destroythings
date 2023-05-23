import { _decorator, Component, Node } from 'cc';
import { LevelSceneLogic } from '../../LevelSceneLogic';
const { ccclass, property } = _decorator;

@ccclass('ReadyUI')
export class ReadyUI extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }
    public OnReadyButtonClick()
    {
        LevelSceneLogic.GetInstance().StartLevel();
    }

}

