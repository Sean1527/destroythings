import { _decorator, Component, Label, Node } from 'cc';
import { LevelSceneLogic } from '../../LevelSceneLogic';
const { ccclass, property } = _decorator;

@ccclass('ReadyUI')
export class ReadyUI extends Component {

    @property(Label)
    countDown: Label = null!;

    private _oriCountDown = 3;
   
    start() {
        this.startCountdow();
    }

    update(deltaTime: number) {
       
    }
   
    /** 倒计时 */
    public startCountdow()
    {
        this.countDown.string = this._oriCountDown.toString();
        let countdownInterval = setInterval(
            ()=>{
                this._oriCountDown --;
                this.countDown.string = this._oriCountDown.toString();
                if (this._oriCountDown === 0) {
                    clearInterval(countdownInterval);
                    LevelSceneLogic.GetInstance().StartLevel();
                  }
            }
            ,1000)
    }


}

