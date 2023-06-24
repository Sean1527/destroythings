
//关卡敌人
export class LevelPlayer
{
    constructor(Name:string, Level:number) {
        this.m_PlayerName = Name;
        this.m_PlayerValue = Level;
      }

    //名字
    public m_PlayerName:string = "Test";
    //等级
    public m_PlayerValue:number = 1;

}

//关卡敌人
export class LevelPlayers
{
    //时间限制
    public m_LevelPlayer:LevelPlayer[] = []
}

//关卡目标管理
export class LevelPlayersManager
{
    private m_LevelPlayers: LevelPlayers[] = [];

    public static instance:LevelPlayersManager = null;

    public static GetInstance()
    {
        if(LevelPlayersManager.instance == null)
        {
            LevelPlayersManager.instance = new LevelPlayersManager();
            LevelPlayersManager.instance.InitLevelPlayerManager();
        }
        return LevelPlayersManager.instance;
    }

    public InitLevelPlayerManager()
    {
        //在这里添加关卡玩家
        {
            let MyLevelPlayers = new LevelPlayers();
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello", 5))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello2", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello3", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello4", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello5", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello6", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello7", 0))
            this.m_LevelPlayers.push(MyLevelPlayers);
        }
        
        {
            let MyLevelPlayers = new LevelPlayers();
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello", 5))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello2", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello3", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello4", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello5", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello6", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello7", 0))
            this.m_LevelPlayers.push(MyLevelPlayers);
        }
        
        {
            let MyLevelPlayers = new LevelPlayers();
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello", 5))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello2", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello3", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello4", 0))
            MyLevelPlayers.m_LevelPlayer.push(new LevelPlayer("Hello5", 0))
            this.m_LevelPlayers.push(MyLevelPlayers);
        }
    }

    //获取关卡目标
    public GetLevelPlayers(Idx:number):LevelPlayers
    {
        return this.m_LevelPlayers[Idx]
    }

    //随机获取关卡目标
    public GetRandomLevelPlayers():LevelPlayers
    {
        let Len = this.m_LevelPlayers.length
        let Idx = Math.floor(Math.random() * Len);
        return this.m_LevelPlayers[Idx]
    }
}