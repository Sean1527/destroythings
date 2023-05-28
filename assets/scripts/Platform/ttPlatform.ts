import { GameMain } from "../GameMain";
import { LevelSceneLogic } from "../LevelSceneLogic";

export class ttPlatform
{
     public static AD_VIDEO_TYPE = {
        AD_VIDEO_TYPE_DOUBLEREWARD: 1, //双倍领取
        AD_VIDEO_TYPE_REVIVE: 2, //复活
        AD_VIDEO_TYPE_SKILL_1:3,//主界面技能1升级
        AD_VIDEO_TYPE_SKILL_2:4,//主界面技能2升级
        AD_VIDEO_TYPE_SKILL_3:5,//主界面技能3升级
    }

    public static m_AD_VIDEO_TYPE:any = ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_DOUBLEREWARD;

    public static m_VideoADInstance:any = null;

    public static Login()
    {
        console.log("Login");
        tt.login({
            success(_res) {
              console.log("登录成功");
              // 调用 getUserInfo 前, 请确保登录成功
          
              // 获取用户信息
              tt.getUserInfo({
                // withCredentials: true,
                // withRealNameAuthenticationInfo: true,
                success(res) {
                  console.log(`getUserInfo 调用成功`, res.userInfo);
                },
                fail(res) {
                  console.log(`getUserInfo 调用失败`, res.errMsg);
                },
              });
            },
          });
    }


    // VideoIDStr = 1k9ri0lfl7o31garcb
    public static CreateVideoAD(VideoIDStr)
    {
        console.log("CreateVideoAD");
        if(ttPlatform.m_VideoADInstance != null)
        {
            ttPlatform.m_VideoADInstance = tt.createRewardedVideoAd({
                adUnitId: VideoIDStr,
                multiton: false,
                multitonRewardMsg: ['更多奖励1'],
                multitonRewardTimes: 1,
                progressTip: false,
              });
              
              ttPlatform.m_VideoADInstance.onClose(ttPlatform.OnVideoADEnd)
        }
    }

    public static OnVideoADEnd (res) 
    {
        console.log("OnVideoADEnd");
        if(ttPlatform.m_AD_VIDEO_TYPE == ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_DOUBLEREWARD)
        {
            console.log("AD_VIDEO_TYPE_DOUBLEREWARD");
            LevelSceneLogic.GetInstance().OnVideoEndDoubleReward(res);
        }
        else if(ttPlatform.m_AD_VIDEO_TYPE == ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_REVIVE)
        {
            console.log("AD_VIDEO_TYPE_REVIVE");
            LevelSceneLogic.GetInstance().OnVideoEndRevive(res);
        }
        else if(ttPlatform.m_AD_VIDEO_TYPE == ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_SKILL_1)
        {
            console.log("AD_VIDEO_TYPE_SKILL_1");
            GameMain.GetInstance().OnSkillBuy_1(res);
        }
        else if(ttPlatform.m_AD_VIDEO_TYPE == ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_SKILL_2)
        {
            console.log("AD_VIDEO_TYPE_SKILL_2");
            GameMain.GetInstance().OnSkillBuy_2(res);
        }
        else if(ttPlatform.m_AD_VIDEO_TYPE == ttPlatform.AD_VIDEO_TYPE.AD_VIDEO_TYPE_SKILL_3)
        {
            console.log("AD_VIDEO_TYPE_SKILL_3");
            GameMain.GetInstance().OnSkillBuy_3(res);
        }
    }

    public static ShowVideoAD(AD_VIDEO_TYPE:number)
    {
        console.log("ShowVideoAD");
        ttPlatform.m_AD_VIDEO_TYPE = AD_VIDEO_TYPE

        let res = {isEnded:true, count:1}
        ttPlatform.OnVideoADEnd(res)

        //if(ttPlatform.m_VideoADInstance != null)
        //{
        //    ttPlatform.m_VideoADInstance.show().then(() => {
        //        console.log("ShowVideoAD showed");
        //        });
        //}
        
    }
}
