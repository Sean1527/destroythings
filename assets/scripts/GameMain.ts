import { _decorator, Component, director, Node } from 'cc';
import { UserData } from './UserData/UserData';
import { ttPlatform } from './Platform/ttPlatform';
import { PlayerData } from './UserData/PlayerData';
import { SkillDataInstance } from './UserData/SkillData';
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

        ttPlatform.CreateVideoAD("1k9ri0lfl7o31garcb");
    }

    update(deltaTime: number) 
    {
        

        
    }

    public LoadLevel()
    {
        // director.loadScene("level", this.OnSceneLaunched);
        director.loadScene("level_lovpoly", this.OnSceneLaunched);
    }

    public LoadMain()
    {
        director.loadScene("main", this.OnSceneLaunched);
    }

    public OnSceneLaunched()
    {
        console.log("OnSceneLaunched");
    }

    public OnSkillBuy_1(res: any) 
    {
        console.log("OnSkillBuy_1");
        if (res.isEnded) {
            this.BuySkill(1);
        }
        else
        {
           
        }
        if (res.count) {

        }
    }
    public OnSkillBuy_2(res: any) 
    {
        console.log("OnSkillBuy_2");
        if (res.isEnded) {
            this.BuySkill(2);
        }
        else
        {
           
        }
        if (res.count) {

        }
    }
    public OnSkillBuy_3(res: any) 
    {
        console.log("OnSkillBuy_3");
        if (res.isEnded) {
            this.BuySkill(3);
        }
        else
        {
           
        }
        if (res.count) {

        }
    }

    public BuySkill(SkillID:number)
    {
        let found = false;
        for(let i = 0; i < UserData.GetInstance().m_PlayerData.Skills.length; ++i)
        {
            if(UserData.GetInstance().m_PlayerData.Skills[i].SkillID == SkillID)
            {
                UserData.GetInstance().m_PlayerData.Skills[i].CurrentLevel = UserData.GetInstance().m_PlayerData.Skills[i].CurrentLevel + 1;
                found = true;
                break;
            }
        }
        if(found == false)
        {
            let NewSkill = new SkillDataInstance();
            NewSkill.SkillID = SkillID
            NewSkill.CurrentLevel = 1;
            UserData.GetInstance().m_PlayerData.Skills.push(NewSkill);
        }
    }

    public GetSkillByID(SkillID:number):SkillDataInstance
    {
        let found = false;
        for(let i = 0; i < UserData.GetInstance().m_PlayerData.Skills.length; ++i)
        {
            if(UserData.GetInstance().m_PlayerData.Skills[i].SkillID == SkillID)
            {
                return UserData.GetInstance().m_PlayerData.Skills[i];
            }
        }
        return null;
    }
}
