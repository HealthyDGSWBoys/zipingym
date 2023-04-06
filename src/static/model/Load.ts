import {
  Scene,
  AssetContainer,
  SceneLoader,
  ISceneLoaderProgressEvent,
} from '@babylonjs/core';
import Config from '../config/Config';

export const LoadAll: <NameMap extends string>(
  map: Map<NameMap, string>,
  scene: Scene
) => Promise<Map<NameMap, AssetContainer>> = <NameMap extends string>(
  map: Map<NameMap, string>,
  scene: Scene
) => {
  return new Promise((resolve, reject) => {
    const keyArray = Array.from(map.keys());
    const result: Map<NameMap, AssetContainer> = new Map();
    Promise.all(
      keyArray.map((key) => {
        const get = map.get(key)!;
        return Load(get, scene);
      })
    )
      .then((values) => {
        keyArray.forEach((key, idx) => {
          result.set(key, values[idx]);
        });
        //@ts-ignore
        resolve(result);
      })
      .catch(reject);
  });
};

const Load: (url: string, scene: Scene) => Promise<AssetContainer> = (
  url: string,
  scene: Scene
) => {
  return new Promise((resolve, reject) => {
    SceneLoader.LoadAssetContainer(
      Config.get.baseURL,
      url,
      scene,
      (assets: AssetContainer) => {
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
  });
};
