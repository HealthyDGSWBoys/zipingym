import Core from './Core';
import colaTheme from '$static/model/stage1_5.glb';
import WorldCoreImpl from './WorldCore/WorldCoreImpl';
import { RoadMeshs } from './WorldCore/WorldCore';

export default class LoadCore extends Core {
  public roadMeshs?: RoadMeshs;
  public static async set(parent: HTMLElement): Promise<LoadCore> {
    const core = new LoadCore();
    await core.init(parent);
    return core;
  }
  protected async init(parent: HTMLElement) {
    await super.init(parent);
    this.roadMeshs = await WorldCoreImpl.load([colaTheme], this.scene);
  }
}
