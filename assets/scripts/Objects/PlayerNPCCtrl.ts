import { Vec2, Vec3, _decorator} from 'cc';
import { PlayerCtrl } from './PlayerCtrl';
import { LevelSceneLogic } from '../LevelSceneLogic';
const { ccclass, property } = _decorator;

@ccclass('PlayerNPCCtrl')
export class PlayerNPCCtrl extends PlayerCtrl 
{
    private m_CurrentRandomTime: number = 0;
    private m_CurrentRandomMin: number = 2.0;
    private m_CurrentRandomMax: number = 15.0;
    start () {
        super.start();
        this.m_Speed = Math.random() * 1.5 + 2.0
    }

    update (deltaTime: number) 
    {
        this.m_CurrentRandomTime = this.m_CurrentRandomTime - deltaTime;
        super.update(deltaTime);//调用父类的移动逻辑

        //仅playing状态可移动
        if (LevelSceneLogic.GetInstance().GetLevelState() == 1) {
            //NPC的移动逻辑（仅等级比玩家高时才会追）
            let A = LevelSceneLogic.GetInstance().m_PlayerUserCtrl.node.position
            let B = this.node.position
            let Dist = Vec3.distance(A, B);
            let CanEat = this.GetCurPhase()- LevelSceneLogic.GetInstance().m_PlayerUserCtrl.GetCurPhase();//根据等级判断
            if(Dist < 10.0 )
            {
              
                let Dir = new Vec3();
                if (CanEat >0) {
                    Vec3.subtract(Dir, A, B);//用减法计算从b到a的移动方向向量
                } else{
                    Vec3.subtract(Dir, B, A);//用减法计算从A到B的移动方向向量
                }
                
                //console.log("this.m_Direction", this.m_Direction);
                Vec3.normalize(this.m_Direction, Dir); //将移动方向归一化
                Vec3.multiplyScalar(this.m_Direction, this.m_Direction, this.m_Speed);//乘上移动速度
                
                this.m_CurrentRandomTime = Math.random() * 2.0 + this.m_CurrentRandomMin;//随机改变移动方向的间隔时间
            }
            else
            {
                //距离过远时按照随机时间间隔来随机新的移动方向
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
