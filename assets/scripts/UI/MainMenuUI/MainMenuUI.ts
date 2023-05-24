import { _decorator, Component, Node } from 'cc';
import { GameMain } from '../../GameMain';
const { ccclass, property } = _decorator;

@ccclass('MainMenuUI')
export class MainMenuUI extends Component {

    onEnable () {
        this.node.on(Node.EventType.TOUCH_END, this.OnStartGame, this);
    }

    onDisable () {
        this.node.off(Node.EventType.TOUCH_END, this.OnStartGame, this);
    }

    start() {

    }



    public OnStartGame()
    {
        GameMain.GetInstance().LoadLevel();
    }

    update(deltaTime: number) {
        
    }
}

