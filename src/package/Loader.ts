import Module from '$/package/Module';
import BabyEvent from '$/event/BabyEvent';
import * as BABYLON from 'babylonjs';
import * as BABYLON_LOADER from 'babylonjs-loaders';

BABYLON.SceneLoader.RegisterPlugin(new BABYLON_LOADER.GLTFFileLoader());
export default abstract class Loader extends Module {
  protected abstract url: [string, string];
  protected load() {
    this.addEventHandler('_onError', () => {
      console.error('Error occur while loading ' + this.url[1]);
    });
    BABYLON.SceneLoader.LoadAssetContainer(
      this.url[0],
      this.url[1].substring(1),
      this.share.scene,
      (scene: BABYLON.AssetContainer) => {
        this.__trigger__(
          new BabyEvent(
            '_onLoad',
            {
              assets: scene,
            },
            false
          )
        );
      },
      (progress: BABYLON.ISceneLoaderProgressEvent) => {
        this.__trigger__(
          new BabyEvent(
            '_onProgress',
            {
              ...progress,
            },
            false
          )
        );
      },
      (scene: BABYLON.Scene, message: string, exception?: any) => {
        this.__trigger__(
          new BabyEvent(
            '_onError',
            {
              scene,
              message,
              exception,
            },
            false
          )
        );
      }
    );
  }
}
