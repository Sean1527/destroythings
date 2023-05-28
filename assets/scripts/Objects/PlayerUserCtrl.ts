import { _decorator, EventTouch, Node, Vec3} from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
import { UserData } from '../UserData/UserData';
import { GameMain } from '../GameMain';
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

        if(GameMain.GetInstance().GetSkillByID(1))
        {
            this.m_Speed = 10;
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
    }
}
