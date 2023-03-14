import Controller from '$/package/Controller';
import * as BABYLON from 'babylonjs';

export default class CharacterController extends Controller<BABYLON.TransformNode> {
  protected onSet(): void {
    this.addEventHandler('_onTargetSet', () => {
      const userGroup = this.target;

      const spawnpoint = (
        this.getScene().getNodeByName('SpawnPoint') as BABYLON.TransformNode
      ).position;
      userGroup.position.set(spawnpoint.x, spawnpoint.y, spawnpoint.z);

      this.addEventHandler('keydown', (e) => {
        if (e.key == 'w') {
          this.animateVec(
            userGroup,
            'position',
            new BABYLON.Vector3(0, 0, -2),
            200
          );
          // userGroup.position.z -= 1;
        }
      });
    });
  }
}
