import { _decorator, EventTouch, Node, Vec3} from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
import { UserData } from '../UserData/UserData';
import { GameMain } from '../GameMain';
import { LevelSceneLogic } from '../LevelSceneLogic';
const { ccclass, property } = _decorator;

@ccclass('PlayerUserCtrl')
export class PlayerUserCtrl extends PlayerCtrl {

    private m_PressStarPoint:Vec3 = new Vec3(0,0,0);
    
    @property(Node)
    LevelMenu: Node = null;

    start () {
        super.start();
        // register touch event
        this.LevelMenu.on(Node.EventType.TOUCH_MOVE, this.OnTouchMove, this);
        this.LevelMenu.on(Node.EventType.TOUCH_START, this.OnTouchStart, this);
        this.LevelMenu.on(Node.EventType.TOUCH_END, this.OnTouchEnd, this);

        this.m_PlayerName = UserData.GetInstance().GetPlayerData().Name;

        let SI = GameMain.GetInstance().GetSkillByID(1);
        if(SI != null)
        {
            this.m_Speed = SI.CurrentLevel * 2.0 + 5.0;
        }

        SI = GameMain.GetInstance().GetSkillByID(2);
        if(SI != null)
        {
            this.m_cur_value = SI.CurrentLevel * 5.0;
        }
    }

    private OnTouchStart(event: EventTouch) 
    {
        this.m_PressStarPoint = new Vec3(event.getLocationX(), 0, event.getLocationY());
    }

    private OnTouchMove(event: EventTouch) 
    {
        let CurrentPressPoint = new Vec3(event.getLocationX(), 0, event.getLocationY());
        Vec3.subtract(this.m_Direction, CurrentPressPoint, this.m_PressStarPoint);
        Vec3.normalize(this.m_Direction, this.m_Direction);
        this.m_Direction.z = -this.m_Direction.z
        Vec3.multiplyScalar(this.m_Direction, this.m_Direction, this.m_Speed);
    }

    private OnTouchEnd(event: EventTouch) 
    {

        this.m_PressStarPoint = this.m_Direction = new Vec3(0,0,0);
        
    }

    update (deltaTime: number) 
    {   
        super.update(deltaTime);
        //仅playing状态可移动
        if (LevelSceneLogic.GetInstance().GetLevelState() !== 1) { 
            this.m_PressStarPoint = this.m_Direction = new Vec3(0,0,0);
        }
    }
}
