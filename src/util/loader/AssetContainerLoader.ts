import Config from '$/global/config/Config';
import {
  ISceneLoaderProgressEvent,
  SceneLoader,
} from '@babylonjs/core/Loading/sceneLoader';
import { AssetContainer } from '@babylonjs/core/assetContainer';
import { Scene } from '@babylonjs/core/scene';

export default class AssetContainerLoader {
  private static Assets: Map<string, AssetContainer> = new Map();

  public static load: (url: string, scene: Scene) => Promise<AssetContainer> = (
    url: string,
    scene: Scene
  ) => {
    return new Promise((resolve, reject) => {
      const get = AssetContainerLoader.Assets.get(url);
      if (get != null) resolve(get);
      else {
        SceneLoader.LoadAssetContainer(
          Config.get.baseURL,
          url,
          scene,
          (assets: AssetContainer) => {
            assets.animationGroups.forEach((a) => a.pause());
            resolve(assets);
          },
          (prog: ISceneLoaderProgressEvent) => {},
          (scene: Scene, message: string, exception?: any) => {
            reject({
              scene,
              message,
              exception,
            });
          }
        );
      }
    });
  };
}
