import { _decorator, Component, director, Node } from 'cc';
import { UserData } from './UserData/UserData';
const { ccclass, property } = _decorator;

@ccclass('GameMain')
export class GameMain extends Component {
    public static instance:GameMain = null;
    public m_login_data = {username :"test"};
    public static GetInstance()
    {
        return GameMain.instance;
    }
    start() {
        GameMain.instance = this;
        director.addPersistRootNode(this.node);
        this.LoadMain();
        
        UserData.GetInstance().Init();
    }

    update(deltaTime: number) 
    {
        
    }

    public LoadLevel()
    {
        director.loadScene("Level", this.OnSceneLaunched);
    }

    public LoadMain()
    {
        director.loadScene("Main", this.OnSceneLaunched);
    }

    public OnSceneLaunched()
    {
        console.log("OnSceneLaunched");
    }
}
