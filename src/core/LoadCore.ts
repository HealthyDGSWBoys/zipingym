import Core from './Core';
import colaTheme from '$static/model/stage1_5.glb';
import itemAssets from '$static/model/item.glb';
import userAsset from '$static/model/dummy.babylon';
import WorldCoreImpl from './WorldCore/WorldCoreImpl';
import { RoadMeshs } from './WorldCore/WorldCore';
import ImportMeshLoader, {
  ImportMeshResult,
} from '$/util/loader/ImportMeshLoader';

import '@babylonjs/loaders/glTF/2.0';
import ItemCore, { ItemMeshs } from './WorldCore/ItemCore';

export default class LoadCore extends Core {
  public roadMeshs?: RoadMeshs;
  public itemsMeshs?: ItemMeshs;
  public humanMeshs?: ImportMeshResult;
  public static async set(parent: HTMLElement): Promise<LoadCore> {
    const core = new LoadCore();
    await core.init(parent);
    return core;
  }
  protected async init(parent: HTMLElement) {
    await super.init(parent);
    this.roadMeshs = await WorldCoreImpl.load([colaTheme], this.scene);
    this.itemsMeshs = await ItemCore.load(itemAssets, this.scene);
    this.humanMeshs = await ImportMeshLoader.load('./' + userAsset, this.scene);
  }
}
