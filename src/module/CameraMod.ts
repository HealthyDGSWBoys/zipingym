import Module from '$/app/Module';
import { FlyCamera, Vector3 } from 'babylonjs';

export default class CameraMod extends Module {
  public set() {
    const camera = new FlyCamera(
      'camera',
      new Vector3(0, 20, 0),
      this.share.scene
    );
    camera.attachControl(true);
  }
}
