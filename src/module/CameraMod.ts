import Module from '$/app/Module';
import { FlyCamera, Vector3 } from 'babylonjs';
import * as BABYLON from 'babylonjs';

export default class CameraMod extends Module {
  public onSet() {
    const camera = new BABYLON.TouchCamera(
      'camera',
      new Vector3(-10, 70, -10),
      this.share.scene
    );

    camera.rotation.x = Math.PI / 2;
    camera.rotation.z = Math.PI;
    camera.attachControl(true);

    this.addEventHandler('update', () => {});
  }
}
