import { _decorator, Prefab, Node, Sprite, SpriteFrame, Texture2D, Asset, error, instantiate, find, resources, isValid, assetManager, LoadCompleteCallback } from "cc";
const { ccclass } = _decorator;

declare global {
    namespace globalThis {
        var LZString: any;
    }
}

interface ITextAsset{
    text?: string;
    _file?: string;
    json?: string
}

export type Constructor<T = unknown> = new (...args: any[]) => T;
export type AssetType<T = Asset> = Constructor<T>;

@ccclass("resourceUtil")
export class resourceUtil {
    public static loadRes<T extends Asset>(url: string, type: AssetType<T> | null, cb?: LoadCompleteCallback<T>) {
        if(type){
            resources.load(url, type, (err, res) => {
                if (err) {
                    error(err.message || err);
                    if (cb) {
                        cb(err, res);
                    }

                    return;
                }

                if (cb) {
                    cb(err, res);
                }
            });
        } else {
            resources.load(url, (err, res) => {
                if (err) {
                    error(err.message || err);
                    if (cb) {
                        cb(err, res as T);
                    }

                    return;
                }

                if (cb) {
                    cb(err, res as T);
                }
            });
        }
    }

    // public static getMap(level: number, cb: (err: Error | null, textAsset: any) => void) {
    //     let levelStr = 'map';
    //     //前面补0
    //     if (level >= 100) {
    //         levelStr += level;
    //     } else if (level >= 10) {
    //         levelStr += '0' + level;
    //     } else {
    //         levelStr += '00' + level;
    //     }

    //     this.loadRes(`gamePackage/map/config/${levelStr}`, null, (err, txtAsset) => {
    //         if (err) {
    //             cb(err, txtAsset);
    //             return;
    //         }

    //         const txt = txtAsset as unknown as ITextAsset;
    //         let content = '';
    //         if (txt!._file) {
    //             if (window['LZString']) {
    //                 content = window['LZString'].decompressFromEncodedURIComponent(txt!._file);
    //             }
    //             const objJson = JSON.parse(content);
    //             cb(null, objJson);
    //         } else if (txt.text) {
    //             if (window['LZString']) {
    //                 content = window['LZString'].decompressFromEncodedURIComponent(txt!.text);
    //             }

    //             const objJson = JSON.parse(content);
    //             cb(null, objJson);
    //         } else if (txt!.json) {
    //             cb(null, txt!.json);
    //         } else {
    //             const errObj = new Error('failed');
    //             cb(errObj, null);
    //         }
    //     });
    // }

    // public static getMapObjs(type: string, arrName: Array<string>, progressCb: (completedCount: number, totalCount: number, item: any) => void | null, completeCb: (error: Error | null, asset: Prefab | Prefab[]) => void) {
    //     let arrUrls = [];
    //     for (let idx = 0; idx < arrName.length; idx++) {
    //         arrUrls.push(`gamePackage/map/${type}/${arrName[idx]}`)
    //     }

    //     resources.load(arrUrls, Prefab, progressCb, completeCb);
    // }

    public static getUIPrefabRes(prefabPath: string, cb?: (err: Error | null, asset?: Prefab) => void) {
        this.loadRes("prefab/ui/" + prefabPath, Prefab, cb);
    }

    public static createUI(path: string, cb?: (err: Error | null, node?: Node) => void, parent?: Node | null) {
        this.getUIPrefabRes(path, (err: Error | null, prefab?: Prefab) => {
            if (err) return;
            const node = instantiate(prefab!);
            node.setPosition(0, 0, 0);
            if (!parent) {
                parent = find("Canvas");
            }

            parent!.addChild(node);
            if(cb){
                cb(null, node);
            }
        });
    }


    public static setSpriteFrame<T extends Asset>(path: string, sprite: Sprite, cb: LoadCompleteCallback<SpriteFrame>) {
        this.loadRes<SpriteFrame>(path + '/spriteFrame', SpriteFrame, (err, spriteFrame) => {
            if (err) {
                console.error('set sprite frame failed! err:', path, err);
                cb(err, spriteFrame);
                return;
            }

            if (sprite && isValid(sprite)) {
                sprite.spriteFrame = spriteFrame;
                cb(null, spriteFrame);
            }
        });
    }

}
