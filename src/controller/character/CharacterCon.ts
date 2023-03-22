import { Controller } from '@zipingym/babybabylon';
import * as BABYLON from 'babylonjs';
import { Mesh } from 'babylonjs';
import CharacterCameraCon from './CharacterCameraCon';
import CharacterMoveCon from './CharacterMoveCon';

export default class CharacterCon extends Controller<Mesh> {
  protected onSet(): void {
    this.addEventHandler('_target', () => {
      const userGroup = this.target;

      const spawnpoint = (this.scene.getNodeByName('SpawnPoint') as Mesh)
        .position;
      userGroup.position.set(spawnpoint.x, spawnpoint.y, spawnpoint.z);

      this.addChild(CharacterMoveCon).setTarget(userGroup);
      this.addChild(CharacterCameraCon).setTarget(userGroup);
    });
  }
}
