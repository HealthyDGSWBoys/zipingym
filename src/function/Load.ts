import {
  Scene,
  AssetContainer,
  SceneLoader,
  ISceneLoaderProgressEvent,
} from '@babylonjs/core';

const baseURL = '';

export const LoadAll: (
  map: Map<string, string>,
  scene: Scene
) => Promise<Map<string, AssetContainer>> = (
  map: Map<string, string>,
  scene: Scene
) => {
  return new Promise((resolve, reject) => {
    const keyArray = Array.from(map.keys());
    const result: Map<string, AssetContainer> = new Map();
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
