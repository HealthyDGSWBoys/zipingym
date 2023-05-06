import { ItemInfo, itemList, itemListValue } from '$/data/WorldData/WorldData';
import AssetContainerLoader from '$/util/loader/AssetContainerLoader';
import {
  Color3,
  HighlightLayer,
  Mesh,
  Scene,
  TransformNode,
} from '@babylonjs/core';
import ItemImporter from './ItemImporter';
import { ItemUrl } from '$/asset';

export default class ItemCore {
  private highlightLayer: HighlightLayer;
  private items!: ItemMeshs;
  constructor(private scene: Scene) {
    this.highlightLayer = new HighlightLayer('hl1', scene);
  }

  public async init() {
    const importer = new ItemImporter(this.scene);
    this.items = await importer.import(ItemUrl);
  }

  public draw(parent: TransformNode, info: Array<ItemInfo>) {
    const meshs: Array<TransformNode> = new Array();
    info.forEach((e) => {
      const get = this.items.get(e.name);
      if (get === undefined) throw new Error("Can't find item mesh");
      else {
        const item = get.clone(e.name, parent)!;
        //@ts-expect-error
        item.getChildMeshes().forEach((mesh: Mesh) => {
          // this.highlightLayer.addMesh(
          //   mesh,
          //   e.name == 'banana' ? Color3.Green() : Color3.Red()
          // );
        });
        item?.getScene().registerBeforeRender(() => {
          item.addRotation(0, 0.05, 0);
        });
        item!.position.set(e.row, 0, e.rank);
        meshs.push(item!);
      }
    });
    return meshs;
  }

  public static async load(url: string, scene: Scene) {
    const assets = await AssetContainerLoader.load(url, scene);
    const result: Map<itemList, TransformNode> = new Map();
    itemListValue.forEach((itemName: itemList) => {
      const item = assets.getNodes().find(({ name }) => name === itemName);
      if (item === undefined) {
        throw new Error("Can't find Item Mesh");
      } else {
        result.set(itemName, item as TransformNode);
      }
    });
    return result;
  }
}

export type ItemMeshs = Map<itemList, TransformNode>;
