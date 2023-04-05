import { MeshBuilder, Scene, TransformNode, Vector3 } from '@babylonjs/core';
import { itemUnion } from './itemsManager';

export default class Item {
  public static spawnpoint: TransformNode;
  public node: TransformNode;
  public collusionDistance: number = 2;
  private name: string;
  private renderedNode: Array<TransformNode> = new Array();
  private onTouch: () => void;
  constructor(name: itemUnion, onTouch: () => void, node?: TransformNode) {
    this.node = node ?? MeshBuilder.CreateBox(name, { size: 1 });
    this.name = name;
    this.onTouch = onTouch;
  }

  public deploy(parent: TransformNode) {
    this.node.clone(this.name, parent);
  }
  public checkCollusion(targetPos: Vector3) {
    this.renderedNode.forEach((node) => {
      if (this.collusionDistance < Vector3.Distance(targetPos, node.position)) {
        this.onTouch();
      }
    });
  }
}
