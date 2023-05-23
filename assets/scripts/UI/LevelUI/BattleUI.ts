import { _decorator, Component, Label, Node } from 'cc';
import { LevelSceneLogic } from '../../LevelSceneLogic';
const { ccclass, property } = _decorator;

@ccclass('BattleUI')
export class BattleUI extends Component {

    @property(Node)
    m_Timer: Node = null;

    @property(Label)
    m_TimerText: Label = null;

    start() {

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
        let TimeLeft = LevelSceneLogic.GetInstance().GetGameTimeLeft();
        this.m_TimerText.string = this.intToTimeString(TimeLeft);
        
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

