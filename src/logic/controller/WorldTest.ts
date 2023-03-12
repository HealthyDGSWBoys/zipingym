import Controller from '$/package/Controller';
import * as BABYLON from 'babylonjs';

export default class WorldTest extends Controller<BABYLON.TransformNode> {
  protected onSet(): void {
    //타겟이 들어왔을때
    this.addEventHandler('_onTargetSet', () => {
      const road = this.target
        .getChildren()
        .find((t) => t.name === 'Road') as BABYLON.Mesh;
      road.actionManager = new BABYLON.ActionManager(this.share.scene);
    });
  }
}
