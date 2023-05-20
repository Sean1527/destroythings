import { _decorator, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    public static instance:GameMain = null;
    public static GetInstance()
    {
        return GameMain.instance;
    }
    start() {
        GameMain.instance = this;
        director.addPersistRootNode(this.node);
        director.loadScene("main", this.OnSceneLaunched);
    }

    update(deltaTime: number) {
        
    }

    public LoadLevel()
    {
        director.loadScene("level", this.OnSceneLaunched);
    }

    public LoadMain()
    {
        director.loadScene("main", this.OnSceneLaunched);
    }

    public OnSceneLaunched()
    {
    }
}
