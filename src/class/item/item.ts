import { MeshBuilder, Scene, TransformNode, Vector3 } from '@babylonjs/core';
import { itemUnion } from './itemsManager';

export default class Item {
  public static spawnpoint: TransformNode;
  public node: TransformNode;
  public collusionDistance: number = 2;

  private renderedNode: Array<TransformNode> = new Array();
  private onTouch: () => void;
  constructor(name: itemUnion, onTouch: () => void, node?: TransformNode) {
    this.node = node ?? MeshBuilder.CreateBox(name, { size: 1 });
    this.onTouch = onTouch;
  }

  public deployAt(pos: Vector3, name: string) {
    const node = this.node.clone(name, Item.spawnpoint);
    node.position = pos;
    this.renderedNode.push(node);
  }
  public dispose(name: string) {
    this.renderedNode.filter((n) => n.name == name).forEach((n) => n.dispose());
    for (let i = 0; i < this.renderedNode.length; i++) {
      if (this.renderedNode[i].isDisposed() == true) {
        this.renderedNode.splice(i, 1);
        i--;
      }
    }
  }
  public checkCollusion(targetPos: Vector3) {
    this.renderedNode.forEach((node) => {
      if (this.collusionDistance < Vector3.Distance(targetPos, node.position)) {
        this.onTouch();
      }
    });
  }
}
