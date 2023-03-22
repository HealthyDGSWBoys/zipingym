import { Vector3 } from 'babylonjs';
import * as BABYLON from 'babylonjs';
import Core from './core';

export default class Development extends Core {
  public set = () => {
    return new Promise<void>((resolve, reject) => {
      const camera = new BABYLON.FreeCamera(
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
