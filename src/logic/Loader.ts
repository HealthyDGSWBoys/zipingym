import Module from '$/app/Module';
import BabyEvent from '$/event/BabyEvent';
import * as BABYLON from 'babylonjs';
import * as BABYLON_LOADER from 'babylonjs-loaders';

BABYLON.SceneLoader.RegisterPlugin(new BABYLON_LOADER.GLTFFileLoader());
export default abstract class Loader extends Module {
  protected abstract url: [string, string];
  protected load() {
    BABYLON.SceneLoader.Load(
      this.url[0],
      this.url[1].substring(1),
      this.share.scene.getEngine(),
      (scene: BABYLON.Scene) => {
        this.generateEvent(
          new BabyEvent(
            'onLoad',
            {
              scene,
            },
            false
          )
        );
      },
      (progress: BABYLON.ISceneLoaderProgressEvent) => {
        this.generateEvent(
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
        this.generateEvent(
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
