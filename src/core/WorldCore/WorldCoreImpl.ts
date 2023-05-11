import { RoadInfo, RoadItemInfo } from '$/data/WorldData/WorldData';
import AssetContainerLoader from '$/util/loader/AssetContainerLoader';
import Random from '$/util/Random';
import {
  AssetContainer,
  Scene,
  Sound,
  TransformNode,
  Vector3,
} from '@babylonjs/core';
import WorldCore, { RoadMeshs } from './WorldCore';
import RoadCalculator from '$/data/WorldData/RoadCalculator';
import ItemCore from './ItemCore';
import BackgroundSound from '$/module/sound/BackgroundSound';
import WorldImporter from './WorldImporter';

import { StageUrls } from '$/asset';

export default class WorldCoreImpl implements WorldCore {
  private theme: string = '0';
  private deployLRoad: Map<RoadInfo, Array<TransformNode>> = new Map();
  private itemCore: ItemCore;
  private meshs?: RoadMeshs;
  public deployItems: Array<TransformNode> = new Array();

  constructor(private scene: Scene, private root: TransformNode) {
    this.itemCore = new ItemCore(scene);
    new BackgroundSound();
  }

  public async init() {
    const importer = new WorldImporter(this.scene);
    this.meshs = await importer.import(StageUrls);
    await this.itemCore.init();
  }

  getItems(): Array<TransformNode> {
    return this.deployItems;
  }

  setTheme(theme: string): void {
    if (this.meshs?.has(theme)) this.theme = theme;
    else throw new Error('Theme is not exist in [WorldCoreImpl.ts]');
  }

  drawRoad(roadInfo: RoadItemInfo): void {
    const roadedMeshs = [];

    for (let i = 0; i < roadInfo.length; i++) {
      const roadMesh = Random.getRandom(this.meshs?.get(this.theme)!).clone(
        'road',
        this.root
      )!;
      roadMesh.position = roadInfo.position
        .clone()
        .add(
          RoadCalculator.calcRotToDir(
            roadInfo.rotation,
            RoadCalculator.RoadLength * i
          )
        );

      if (roadInfo.rotation == 'l' || roadInfo.rotation == 'r') {
        roadMesh.rotation = new Vector3(0, Math.PI / 2, 0);
      }

      const meshs = this.itemCore.draw(roadMesh, roadInfo.itemInfo[i]);
      this.deployItems.push(...meshs);
      roadedMeshs.push(roadMesh);
    }

    this.deployLRoad.set(roadInfo, roadedMeshs);
  }
  disposeRoad(roadInfo: RoadItemInfo): void {
    const get = this.deployLRoad.get(roadInfo);
    if (get != undefined) {
      get.forEach((m) => {
        m.dispose();
      });
    }
  }
}
