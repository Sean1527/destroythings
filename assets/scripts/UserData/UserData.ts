import { _decorator, Component, Node } from 'cc';
import { PlayerData } from './PlayerData';
import { ItemData, ItemDataInstance } from './ItemData';
import { SkillData, SkillDataInstance } from './SkillData';

export class UserData {
    public static instance:UserData = null;

    public m_PlayerData = new PlayerData();
    public m_SkillDatas:Array<SkillData> = new Array<SkillData>();
    public m_ItemlDatas:Array<ItemData> = new Array<ItemData>();

    static GetInstance():UserData
    {
        if(UserData.instance == null)
        {
            let ud = new UserData();
            return ud;
        } 
        return UserData.instance;
    }

    public GetPlayerData():PlayerData
    {
        return this.m_PlayerData;
    }

    public Init()
    {
        {
            let Skill = new SkillData();
            Skill.ID = 1;
            this.m_SkillDatas.push(Skill);
        }
        {
            let Skill = new SkillData();
            Skill.ID = 2;
            this.m_SkillDatas.push(Skill);
        }
        {
            let Skill = new SkillData();
            Skill.ID = 3;
            this.m_SkillDatas.push(Skill);
        }

        UserData.instance = this;
        let ud = this.GetData("player_data");
        if(ud == null)
        {
            this.InitPlayerData()
            console.log("InitUserData");
        }
        else
        {
            this.m_PlayerData = ud;
            console.log("PlayerData load");
        }
    }

    public SavePlayerData()
    {
        console.log("player exp:" + this.m_PlayerData.ExperiencePoints);
        this.SetData("player_data", this.m_PlayerData);
    }

    public LoadPlayerData(ud:any)
    {
        this.m_PlayerData = this.GetData("player_data");
        /*
        this.m_PlayerData.PlayerID = ud.PlayerID;
        this.m_PlayerData.Name = ud.string;
        this.m_PlayerData.Level = ud.number;
        this.m_PlayerData.ExperiencePoints = ud.number;
        this.m_PlayerData.HealthPoints = ud.number;
        this.m_PlayerData.ManaPoints = ud.number;
        this.m_PlayerData.Attributes = [];
        this.m_PlayerData.Inventory = [];
        this.m_PlayerData.Skills = [];
        this.m_PlayerData.EquippedItems = [];
        this.m_PlayerData.Quests = [];
        this.m_PlayerData.Currency = ud.number;
        this.m_PlayerData.StatusEffects = [];
        */
    }

    public InitPlayerData()
    {
        this.m_PlayerData.PlayerID = "testplayer";
        this.m_PlayerData.Name = "Player"
        this.m_PlayerData.Level = 0;
        this.m_PlayerData.ExperiencePoints = 0;
        this.m_PlayerData.HealthPoints = 100;
        this.m_PlayerData.ManaPoints = 100;
        this.m_PlayerData.Attributes = [];
        this.m_PlayerData.Inventory = [];
        this.m_PlayerData.Skills = [];
        this.m_PlayerData.EquippedItems = [];
        this.m_PlayerData.Quests = [];
        this.m_PlayerData.Currency = 1000;
        this.m_PlayerData.StatusEffects = [];

    }

    public SetData(Key:string, Data:any)
    {
        let StrBase64 = JSON.stringify(Data);
        localStorage.setItem(Key, StrBase64); 

      
    }

    public GetData(Key:string):any
    {
        let StrData = localStorage.getItem(Key); 
        if(StrData != null)
        {
            let Data = JSON.parse(StrData);
            return Data;
        }
        return null;
    }
    

}

