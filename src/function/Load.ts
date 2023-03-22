import * as BABYLON_LOADER from 'babylonjs-loaders';
import * as BABYLON from 'babylonjs';
import { AssetContainer } from 'babylonjs';

BABYLON.SceneLoader.RegisterPlugin(new BABYLON_LOADER.GLTFFileLoader());
const baseURL = './';

export const LoadAll: (
  map: Map<string, string>,
  scene: BABYLON.Scene
) => Promise<Map<string, AssetContainer>> = (
  map: Map<string, string>,
  scene: BABYLON.Scene
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

const Load: (
  url: string,
  scene: BABYLON.Scene
) => Promise<BABYLON.AssetContainer> = (url: string, scene: BABYLON.Scene) => {
  return new Promise((resolve, reject) => {
    BABYLON.SceneLoader.LoadAssetContainer(
      baseURL,
      url.substring(1),
      scene,
      (assets: BABYLON.AssetContainer) => {
        resolve(assets);
      },
      (prog: BABYLON.ISceneLoaderProgressEvent) => {},
      (scene: BABYLON.Scene, message: string, exception?: any) => {
        reject({
          scene,
          message,
          exception,
        });
      }
    );
  });
};
