import { AssetContainer, Engine } from '@babylonjs/core';
import Models, { ModelNameUnion } from './Models';
import { LoadAll } from './Load';
import Core from '../../@legacy/legacyCore/Core';

export default class ModelStorage {
  private static instance: ModelStorage;

  private _map: Map<ModelNameUnion, AssetContainer> = new Map();
  private _get(name: ModelNameUnion) {
    return this._map.get(name)!;
  }

  public static set(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.instance == null) {
        this.instance = new ModelStorage();
        const loadTarget = new Map<ModelNameUnion, string>();
        Models.forEach(({ name, url }) => {
          loadTarget.set(name, url);
        });
        LoadAll(loadTarget, Core.get.scene)
          .then((result) => {
            this.instance._map = result;
            resolve();
          })
          .catch(reject);
      } else {
        resolve();
      }
    });
  }

  public static get(name: ModelNameUnion) {
    return this.instance._get(name);
  }
}
