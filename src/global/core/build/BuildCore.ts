import BuildCanvas from './BuildCanvas';
import BuildEngine from './BuildEngine';
import BuildScene from './BuildScene';

export default class BuildCore {
  public static async build(parent: HTMLElement) {
    const canvas = BuildCanvas.build(parent);
    const engine = await BuildEngine.build(canvas);
    const scene = await BuildScene.build(engine);

    return {
      canvas: canvas,
      engine: engine,
      scene: scene,
    };
  }
}
