
//关卡目标
export class LevelGoal
{
    //时间限制
    public m_TimeValue:number = -1;//second
    //分数限制
    public m_ScoreValue:number = -1;//point
    
    //其他限制
    public m_DamageInflict:number = -1;

}

//关卡目标管理
export class LevelGoalManager
{
    private m_LevelGoalList: LevelGoal[] = [];

    public static instance:LevelGoalManager = null;

    public static GetInstance()
    {
        if(LevelGoalManager.instance == null)
        {
            LevelGoalManager.instance = new LevelGoalManager();
            LevelGoalManager.instance.InitLevelManager();
        }
        return LevelGoalManager.instance;
    }

    public InitLevelManager()
    {
        //在这里添加关卡目标
        {
            let MyLevelGoal = new LevelGoal();
            MyLevelGoal.m_TimeValue = 30.0
            MyLevelGoal.m_ScoreValue = 1.0
            this.m_LevelGoalList.push(MyLevelGoal);
        }
        
        {
            let MyLevelGoal = new LevelGoal();
            MyLevelGoal.m_TimeValue = 3.0
            this.m_LevelGoalList.push(MyLevelGoal);
        }
        
        {
            let MyLevelGoal = new LevelGoal();
            MyLevelGoal.m_TimeValue = 30.0
            MyLevelGoal.m_DamageInflict = 3.0
            
            this.m_LevelGoalList.push(MyLevelGoal);
        }
    }

    //获取关卡目标
    public GetGoal(Idx:number):LevelGoal
    {
        return this.m_LevelGoalList[Idx]
    }

    //随机获取关卡目标
    public GetRandomGoal():LevelGoal
    {
        let Len = this.m_LevelGoalList.length
        let Idx = Math.floor(Math.random() * Len);
        return this.m_LevelGoalList[Idx]
    }

    public CheckGoal(CurLevelGoal:LevelGoal, CurLevelGoalValue:LevelGoal):boolean
    {
        console.log("0 " + CurLevelGoal.m_ScoreValue.toString() + " / " + CurLevelGoalValue.m_ScoreValue.toString());
        if(CurLevelGoal.m_DamageInflict > 0 && CurLevelGoal.m_DamageInflict <= CurLevelGoalValue.m_DamageInflict)
        {
            console.log("1 " + CurLevelGoal.m_ScoreValue.toString() + " / " + CurLevelGoalValue.m_ScoreValue.toString());
            return true;
        }
        else if(CurLevelGoal.m_ScoreValue > 0 && CurLevelGoal.m_ScoreValue <= CurLevelGoalValue.m_ScoreValue)
        {
            console.log("2 " + CurLevelGoal.m_ScoreValue.toString() + " / " + CurLevelGoalValue.m_ScoreValue.toString());
            return true;
        }
            
        return false;
    }   

    public CheckTimesUp(CurLevelGoal:LevelGoal, CurLevelGoalValue:LevelGoal):boolean
    {
        if(CurLevelGoal.m_TimeValue > 0 && CurLevelGoal.m_TimeValue <= CurLevelGoalValue.m_TimeValue)
            return true;
        return false;
    }   
}