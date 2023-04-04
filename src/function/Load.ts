import {
  Scene,
  AssetContainer,
  SceneLoader,
  ISceneLoaderProgressEvent,
} from '@babylonjs/core';

const baseURL = '';

export const LoadAll: <T>(
  map: Map<T, string>,
  scene: Scene
) => Promise<Map<T, AssetContainer>> = <T>(
  map: Map<T, string>,
  scene: Scene
) => {
  return new Promise((resolve, reject) => {
    const keyArray = Array.from(map.keys());
    const result: Map<T, AssetContainer> = new Map();
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
      baseURL,
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
