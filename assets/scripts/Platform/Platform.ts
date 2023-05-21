import { _decorator, Component, Node } from 'cc';

export class Platform{

    public static Login()
    {
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
}

