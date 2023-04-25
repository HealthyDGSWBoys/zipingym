import BuildCanvas from './BuildCanvas';
import BuildEngine from './BuildEngine';
import BuildRoot from './BuildRoot';
import BuildScene from './BuildScene';

export default class BuildCore {
  public static async build(parent: HTMLElement) {
    const canvas = BuildCanvas.build(parent);
    const engine = await BuildEngine.build(canvas);
    const scene = await BuildScene.build(engine);
    const root = await BuildRoot.build(scene);

    return {
      canvas,
      engine,
      scene,
      root,
    };
  }
}
