import { _decorator, Camera, Canvas, Component, director, Director, instantiate, Node, random, UITransform, Vec3 } from 'cc';
import { GameMain } from './GameMain';
import { UserData } from './UserData/UserData';
import { LoseUI } from './UI/LevelUI/LoseUI';
import { ReviveUI } from './UI/LevelUI/ReviveUI';
import { WinUI } from './UI/LevelUI/WinUI';
import { BattleUI } from './UI/LevelUI/BattleUI';
import { ReadyUI } from './UI/LevelUI/ReadyUI';
import { PlayerCtrl } from './Objects/PlayerCtrl';
import { PlayerData } from './UserData/PlayerData';
import { LevelGoal, LevelGoalManager } from './Level/LevelGoal';
import { LevelPlayersManager } from './Level/LevelPlayers';
import { PlayerUserCtrl } from './Objects/PlayerUserCtrl';
import { PlayerNPCCtrl } from './Objects/PlayerNPCCtrl';
const { ccclass, property } = _decorator;

enum LevelState {
    Ready = 0,
    Playing = 1,
    Pause = 2,
    Lose = 3,
    Win = 4,
  };

@ccclass('LevelSceneLogic')
export class LevelSceneLogic extends Component {

    public static instance:LevelSceneLogic = null;
    //地图的碰撞边界
    public Left : number = -100.0
    public Right : number = 100.0
    public Top : number = 100.0
    public Bottom : number = -100.0
    
    @property(BattleUI)
    m_BattleUI: BattleUI = null;

    @property(LoseUI)
    m_LoseUI: LoseUI = null;

    @property(WinUI)
    m_WinUI: WinUI = null;

    //@property(ReviveUI)
    //m_ReviveUI: ReviveUI = null;

    @property(ReadyUI)
    m_ReadyUI: ReadyUI = null;

    //玩家
    @property(PlayerUserCtrl)
    m_PlayerUserCtrl: PlayerUserCtrl = null;
    //NPC玩家
    @property(PlayerNPCCtrl)
    m_PlayerNPCCtrl: PlayerNPCCtrl = null;

    @property(UITransform)
    m_Canvas: UITransform = null;

    m_PlayerNPCs:PlayerNPCCtrl[] = [];
    
    m_LevelState:LevelState = LevelState.Ready;


    private m_GameTime:number = 100;

    @property(Camera)
    m_Camera: Camera = null;


    public m_PlayerData:PlayerData = null;
    public InvincibleTime = 0;//无敌时间



    /**关卡的目标分数和时间  */
    public m_CurLevelGoal:LevelGoal = null;

    /**当前的分数和时间*/
    public m_CurLevelGoalValue:LevelGoal = null;


    //关卡玩家


    //总玩家
    public m_Players:PlayerCtrl[] = [];
    
    public static GetInstance()
    {
        return LevelSceneLogic.instance;
    }

    start() {
        LevelSceneLogic.instance = this;
        this.ReadyLevel();

        this.m_PlayerData = UserData.GetInstance().GetPlayerData();
    }

    update(deltaTime: number) {
        

        this.m_BattleUI.UpdateRank(this);

        // 持续时间
        if(this.m_LevelState == LevelState.Playing)
        {   
            //更新关卡持续时间
            this.m_CurLevelGoalValue.m_TimeValue += deltaTime;
            //更新无敌时间
            this.InvincibleTime = Math.max(this.InvincibleTime - deltaTime ,0);
        }
        
        // 更新关卡目标分数和倒计时并在倒计时结束时判定胜负
        if(this.m_LevelState == LevelState.Playing)
        {
            this.m_CurLevelGoalValue.m_ScoreValue = this.m_PlayerUserCtrl.GetValue();
            if(this.m_CurLevelGoal != null && this.m_CurLevelGoalValue != null)
            {
                this.m_GameTime = this.m_CurLevelGoal.m_TimeValue - this.m_CurLevelGoalValue.m_TimeValue;
                let bTimesUp = LevelGoalManager.GetInstance().CheckTimesUp(this.m_CurLevelGoal, this.m_CurLevelGoalValue);
                if(bTimesUp)
                {
                //新方案————倒计时结束就胜利
                    console.log("WinLevel")
                    this.WinLevel();

                //旧方案————根据分数判断胜负
                    // let bWin = LevelGoalManager.GetInstance().CheckGoal(this.m_CurLevelGoal, this.m_CurLevelGoalValue);
                    // if(bWin)
                    // {
                    //     console.log("WinLevel")
                    //     this.WinLevel();
                    // }
                    // else
                    // {
                    //     console.log("LoseLevel")
                    //     this.LoseLevel();
                    // }
                    
                }
            }
        }
        
        
        
    }

    public ExitLevel()
    {
        UserData.GetInstance().SavePlayerData();
        console.log("ExitLevel")
        GameMain.GetInstance().LoadMain();
    }

    public OnBackButtonDown()
    {
        this.ExitLevel();
        
    }

    public GetGameTimeLeft():number
    {
        return Math.floor(this.m_GameTime);
    }

    public GetLevelUpProgess(): number {
        let curPhase = this.m_PlayerUserCtrl.GetCurPhase()
        
        let LastValue = 0
        let CurValue = this.m_PlayerUserCtrl.m_next_values[curPhase]
        if(curPhase > 0)
        {
            LastValue = this.m_PlayerUserCtrl.m_next_values[curPhase - 1]
        }
        let Value = this.m_PlayerUserCtrl.GetValue() - LastValue
        let totalLen = CurValue - LastValue
        
        if (totalLen != 0)
        {
            
            return Value / totalLen
        }
        else
        {

            return 1.0
        }
    }

    //设置关卡目标
    public SetLevelGoal()
    {
        this.m_CurLevelGoal = LevelGoalManager.GetInstance().GetGoal(0);
        this.m_CurLevelGoalValue = new LevelGoal();
        this.m_CurLevelGoalValue.m_DamageInflict = 0;
        this.m_CurLevelGoalValue.m_ScoreValue = 0;
        this.m_CurLevelGoalValue.m_TimeValue = 0;
    }

    public ReadyLevel()
    {
        this.m_LevelState = LevelState.Ready;
        this.m_ReadyUI.node.active = true;
        this.m_BattleUI.node.active = false;
        this.m_LoseUI.node.active = false;
        this.m_WinUI.node.active = false;
        //this.m_ReviveUI.node.active = false;
    }
    

    public StartLevel()
    {
        this.m_LevelState = LevelState.Playing;
        this.m_ReadyUI.node.active = false;
        this.m_BattleUI.node.active = true;
        this.m_LoseUI.node.active = false;
        this.m_WinUI.node.active = false;

        this.SetLevelGoal();
        this.CreateLevelPlayer();
        this.CreateLevelPlayerNPCs();
        //this.m_ReviveUI.node.active = false;
    }

    public CreateLevelPlayer() {
        this.m_Players.push(this.m_PlayerUserCtrl);
        //throw new Error('Method not implemented.');
    }

    /**
     * 创建npc，同时会创建其名称节点
     */
    public CreateLevelPlayerNPCs() {
        let MyLevelPlayers = LevelPlayersManager.GetInstance().GetRandomLevelPlayers();
        for(let i = 0; i < MyLevelPlayers.m_LevelPlayer.length; ++i)
        {
            const NewNode = instantiate(this.m_PlayerNPCCtrl.node);
            
            NewNode.active = true;
            NewNode.parent = director.getScene();
            let MyPlayerCtrl = NewNode.getComponent(PlayerNPCCtrl)
            MyPlayerCtrl.SetName(MyLevelPlayers.m_LevelPlayer[i].m_PlayerName);
            let NodeName = this.m_BattleUI.CreateName(MyLevelPlayers.m_LevelPlayer[i].m_PlayerName);
            MyPlayerCtrl.m_NameNode = NodeName;
            //MyPlayerCtrl.SetValue(0);
            MyPlayerCtrl.SetValue(MyLevelPlayers.m_LevelPlayer[i].m_PlayerValue);
            let x = (Math.random() - 0.5) * 80.0
            let z = (Math.random() - 0.5) * 80.0 + 60
            NewNode.setPosition(new Vec3(x, 0, z))

            this.m_PlayerNPCs.push(MyPlayerCtrl);
            this.m_Players.push(MyPlayerCtrl);
        }
    }

    public ReviveLevel()
    {
        this.m_LevelState = LevelState.Playing;
        this.m_CurLevelGoalValue.m_TimeValue = 0;//重置持续时间
        this.m_ReadyUI.node.active = false;
        this.m_BattleUI.node.active = true;
        this.m_LoseUI.node.active = false;
        this.m_WinUI.node.active = false;
        //this.m_ReviveUI.node.active = false;
        this.InvincibleTime = 5; //复活后5秒无敌
        this.m_PlayerUserCtrl.node.active = true; //显示角色
    }

    public LoseLevel()
    {
        console.log("LoseLevel1")
        this.m_LevelState = LevelState.Lose;
        this.m_ReadyUI.node.active = false;
        this.m_BattleUI.node.active = false;
        this.m_LoseUI.node.active = true;
        this.m_WinUI.node.active = false;
        //this.m_ReviveUI.node.active = false;
        //到时自动回到主界面
        //setTimeout(() => {
        //    console.log("LoseLevel2")
        //    GameMain.GetInstance().LoadMain();
        //}, 2500);
    }

    public WinLevel()
    {
        this.m_LevelState = LevelState.Win;
        this.m_ReadyUI.node.active = false;
        this.m_BattleUI.node.active = false;
        this.m_LoseUI.node.active = false;
        this.m_WinUI.node.active = true;
        //this.m_ReviveUI.node.active = false;
    }

    public GetLevelState():LevelState
    {
        return this.m_LevelState;
    }


    public OnVideoEndRevive(res) {
        console.log("OnVideoEndRevive");
        if (res.isEnded) {
            this.ReviveLevel();
        }
        else
        {
           
        }
        if (res.count) {

        }
    }

    public OnVideoEndDoubleReward(res) {
        console.log("OnVideoEndDoubleReward");
        if (res.isEnded) {
            this.DoubleReward();
        }
        else
        {
           
        }
        if (res.count) {

        }
    }

    public DoubleReward() 
    {
        GameMain.GetInstance().ChaneMoney(200);//双倍领取
        setTimeout(() =>{
            GameMain.GetInstance().LoadMain();//返回主界面
        },1000)
        
        console.log("DoubleReward")
    }
}

