import Config from '$/global/config/Config';
import {
  ISceneLoaderProgressEvent,
  SceneLoader,
} from '@babylonjs/core/Loading/sceneLoader';
import { AssetContainer } from '@babylonjs/core/assetContainer';
import { Scene } from '@babylonjs/core/scene';
import { Loader } from './Loader';

export default class AssetContainerLoader implements Loader<AssetContainer> {
  protected static Assets: Map<string, AssetContainer> = new Map();

  constructor(private scene: Scene) {}

  public load(url: string): Promise<AssetContainer> {
    return new Promise((resolve, reject) => {
      const get = AssetContainerLoader.Assets.get(url);
      if (get != null) resolve(get);
      else {
        SceneLoader.LoadAssetContainer(
          Config.get.baseURL,
          url,
          this.scene,
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
  }
}
