import { _decorator, Component, Node } from 'cc';
import { GameMain } from './GameMain';
import { UserData } from './UserData/UserData';
import { LoseUI } from './UI/LevelUI/LoseUI';
import { ReviveUI } from './UI/LevelUI/ReviveUI';
import { WinUI } from './UI/LevelUI/WinUI';
import { BattleUI } from './UI/LevelUI/BattleUI';
import { ReadyUI } from './UI/LevelUI/ReadyUI';
import { PlayerCtrl } from './Objects/PlayerCtrl';
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
    @property(PlayerCtrl)
    m_PlayerCtrl: PlayerCtrl = null;
    
    m_LevelState:LevelState = LevelState.Ready;

    private m_GameTime:number = 100;
    
    public static GetInstance()
    {
        return LevelSceneLogic.instance;
    }

    start() {
        LevelSceneLogic.instance = this;
        this.ReadyLevel();
    }

    update(deltaTime: number) {
        this.m_GameTime -= deltaTime;
    }

    public ExitLevel()
    {
        UserData.GetInstance().SavePlayerData();

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
        //this.m_ReviveUI.node.active = false;
    }

    public ReviveLevel()
    {
        this.m_LevelState = LevelState.Playing;
        this.m_ReadyUI.node.active = false;
        this.m_BattleUI.node.active = true;
        this.m_LoseUI.node.active = false;
        this.m_WinUI.node.active = false;
        //this.m_ReviveUI.node.active = false;
    }

    public LoseLevel()
    {
        this.m_LevelState = LevelState.Lose;
        this.m_ReadyUI.node.active = false;
        this.m_BattleUI.node.active = false;
        this.m_LoseUI.node.active = true;
        this.m_WinUI.node.active = false;
        //this.m_ReviveUI.node.active = false;
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
}

