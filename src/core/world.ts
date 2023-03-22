import Core from './core';
import dummyMap from '$static/dummy.glb';

export default class World extends Core {
  private static WorldModelFile: Map<string, string> = new Map([
    ['dummy', dummyMap],
  ]);
  //   private WorldModels: Array<Asse
  public set: () => Promise<void> = () => {
    return new Promise((resolve, reject) => {
      World.WorldModelFile.forEach(() => {});
    });
  };

  public loop = (deltaTime: number) => {};
}
