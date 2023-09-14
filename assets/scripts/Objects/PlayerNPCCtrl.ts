import { Vec2, Vec3, _decorator} from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
import { LevelSceneLogic } from '../LevelSceneLogic';
const { ccclass, property } = _decorator;

@ccclass('PlayerNPCCtrl')
export class PlayerNPCCtrl extends PlayerCtrl 
{
    private m_CurrentRandomTime: number = 0;
    private m_CurrentRandomMin: number = 4.0;
    private m_CurrentRandomMax: number = 15.0;
    start () {
        super.start();
        this.m_Speed = Math.random() * 2.5 + 4.0
    }

    update (deltaTime: number) 
    {
        this.m_CurrentRandomTime = this.m_CurrentRandomTime - deltaTime;
        super.update(deltaTime);//调用父类的移动逻辑

        //仅playing状态可移动
        if (LevelSceneLogic.GetInstance().GetLevelState() == 1) {
            
            let A = LevelSceneLogic.GetInstance().m_PlayerUserCtrl.node.position
            let B = this.node.position
            let Dist = Vec3.distance(A, B)
            if(Dist < 20.0)
            {
                let Dir = new Vec3();
                Vec3.subtract(Dir, A, B)
                //console.log("this.m_Direction", this.m_Direction);
                Vec3.multiplyScalar(this.m_Direction, this.m_Direction, this.m_Speed);
                Vec3.normalize(this.m_Direction, Dir);
                this.m_CurrentRandomTime = Math.random() * 6.0 + this.m_CurrentRandomMin;
            }
            else
            {
                if( this.m_CurrentRandomTime < 0)
                {
                    let x = (Math.random() - 0.5) * 80.0;
                    let z = (Math.random() - 0.5) * 80.0 + 60;
                    let dest = new Vec3(x, 0, z); 
                    let Dir = new Vec3();
                    Vec3.subtract(Dir, dest, this.node.position)
                    
                    
                    
                    Vec3.normalize(this.m_Direction, Dir);
                    Vec3.multiplyScalar(this.m_Direction, this.m_Direction, this.m_Speed);
                    this.m_CurrentRandomTime = Math.random() * 6.0 + this.m_CurrentRandomMin;
                }
            } 
        }else
        {
            this.m_Direction = new Vec3(0,0,0);
        }

    }
}
