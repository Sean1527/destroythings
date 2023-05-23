import { _decorator, Component, Node } from 'cc';
import { GameMain } from '../../GameMain';
const { ccclass, property } = _decorator;

@ccclass('MainMenuUI')
export class MainMenuUI extends Component {
    start() {

    }

    update(deltaTime: number) {
        
    }

    public OnStartGame()
    {
        GameMain.GetInstance().LoadLevel();
    }
}

