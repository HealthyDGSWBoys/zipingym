import { Vector3, FreeCamera } from '@babylonjs/core';
import Core from './core';

export default class Development extends Core {
  public set = () => {
    return new Promise<void>((resolve, reject) => {
      const camera = new FreeCamera(
        'dev_camera',
        new Vector3(-10, 70, -10),
        this.scene
      );
      camera.fov = 1.2;
      camera.rotation.x = Math.PI / 2;
      camera.rotation.z = Math.PI;
      camera.attachControl(true);
      resolve();
    });
  };
  public setsync = () => {};
  public loop = (deltaTime: number) => {};
}
