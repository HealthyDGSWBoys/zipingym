import Module from '$/app/Module';
import BabyEvent from '$/event/BabyEvent';
import * as BABYLON from 'babylonjs';
import * as BABYLON_LOADER from 'babylonjs-loaders';

BABYLON.SceneLoader.RegisterPlugin(new BABYLON_LOADER.GLTFFileLoader());
export default abstract class Loader extends Module {
  protected abstract url: [string, string];
  protected load() {
    BABYLON.SceneLoader.LoadAssetContainer(
      this.url[0],
      this.url[1].substring(1),
      this.share.scene,
      (scene: BABYLON.AssetContainer) => {
        this.__trigger__(
          new BabyEvent(
            'onLoad',
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
            'onProgress',
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
            'onError',
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
