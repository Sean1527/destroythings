import { _decorator, Component, instantiate, Label, Node, ProgressBar } from 'cc';
import { LevelSceneLogic } from '../../LevelSceneLogic';
const { ccclass, property } = _decorator;

interface ScoreEntry {
    name: string;
    score: number;
}

@ccclass('BattleUI')
export class BattleUI extends Component {

    @property(Node)
    m_Timer: Node = null;

    @property(Label)
    m_TimerText: Label = null;

    @property(Node)
    m_RankNodeTemplate: Node = null;

    @property(ProgressBar)
    m_LevelUpProgress: ProgressBar = null;

    @property(Label)
    m_PlayerName: Label = null;

    @property(Node)
    m_NameNodes: Node = null;

    @property(Label)
    m_NameNodeTemplate: Label = null;


    m_RankNodes:Node[] = [];
    m_RankLabels:Label[] = [];

    m_Init:boolean = false;
    start() {


        
    }

    
    public CreateName(Name : string ): Node 
    {
        const NewNode = instantiate(this.m_NameNodeTemplate.node);
        NewNode.getComponent(Label).string = Name
        NewNode.parent = this.m_NameNodes;
        return NewNode
    }

    

    public padWithZero(number: number): string 
    {
        return number < 10 ? '0' + number : number.toString();
    }
    
    public intToTimeString(time: number): string 
    {
        const minutes = Math.floor(time / 60);
        const second = time % 60;
    
        return this.padWithZero(minutes) + ':' + this.padWithZero(second);
    }


    update(deltaTime: number) {

        if(this.m_Init == false)
        {
            this.m_PlayerName.string = LevelSceneLogic.GetInstance().m_PlayerData.Name
            this.m_Init = true;
        }

        let TimeLeft = LevelSceneLogic.GetInstance().GetGameTimeLeft();
        this.m_TimerText.string = this.intToTimeString(TimeLeft);

        this.m_LevelUpProgress.progress = LevelSceneLogic.GetInstance().GetLevelUpProgess();
        
    }

    public UpdateRank(MyLevelSceneLogic:LevelSceneLogic)
    {
        let scoreArray: ScoreEntry[] = []
        for(let i = 0; i < MyLevelSceneLogic.m_Players.length; ++i)
        {
            let NPCPlayer: ScoreEntry = {
                name:MyLevelSceneLogic.m_Players[i].GetName(),
                score:MyLevelSceneLogic.m_Players[i].GetValue()
            };
            scoreArray.push(NPCPlayer)
        }
        scoreArray.sort((a, b) => b.score - a.score);

        if(this.m_RankNodes.length == 0)
        {
            for(let i = 0; i < scoreArray.length; ++i)
            {
                const NewNode = instantiate(this.m_RankNodeTemplate);
                NewNode.active = true;
                NewNode.parent = this.m_RankNodeTemplate.parent;
                let NodeChild = NewNode.getChildByName("text-001");
                let LabelNew = NodeChild.getComponent(Label);
                this.m_RankLabels.push(LabelNew);
                this.m_RankNodes.push(NewNode);
            }
        }
        for(let i = 0; i < scoreArray.length; ++i)
        {
            this.m_RankLabels[i].string = scoreArray[i].name + " " +  scoreArray[i].score
        }
    }


    public OnSkill1ButtonClick()
    {
        
    }

    public OnSkill2ButtonClick()
    {
        
    }

    public OnSkill3ButtonClick()
    {
        
    }
}

