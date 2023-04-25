import { RoadInfo } from '$/data/WorldData/WorldData';
import AssetContainerLoader from '$/util/loader/AssetContainerLoader';
import Random from '$/util/Random';
import { AssetContainer, Scene, TransformNode, Vector3 } from '@babylonjs/core';
import WorldCore, { RoadMeshs } from './WorldCore';
import RoadCalculator from '$/data/WorldData/RoadCalculator';

export default class WorldCoreImpl implements WorldCore {
  // private deps: number = 0;
  private theme: string = '0';
  private deployLRoad: Map<RoadInfo, Array<TransformNode>> = new Map();

  constructor(
    private scene: Scene,
    private root: TransformNode,
    private meshs: RoadMeshs
  ) {}
  setTheme(theme: string): void {
    if (this.meshs.has(theme)) this.theme = theme;
    else throw new Error('Theme is not exist in [WorldCoreImpl.ts]');
  }

  drawRoad(roadInfo: RoadInfo): void {
    const roadedMeshs = [];

    for (let i = 0; i < roadInfo.length; i++) {
      const roadMesh = Random.getRandom(this.meshs.get(this.theme)!).clone(
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
      roadedMeshs.push(roadMesh);
    }

    this.deployLRoad.set(roadInfo, roadedMeshs);
  }
  disposeRoad(roadInfo: RoadInfo): void {
    const get = this.deployLRoad.get(roadInfo);
    if (get != undefined) {
      get.forEach((m) => {
        m.dispose();
      });
    }
  }
  private static findRoadNodeRegex = new RegExp('^\\$');
  public static load(themes: Array<string>, scene: Scene): Promise<RoadMeshs> {
    return new Promise((resolve, reject) => {
      Promise.all(
        themes.map((theme) => AssetContainerLoader.load(theme, scene))
      )
        .then((result) => {
          const response = new Map();
          result.forEach((container: AssetContainer, index: number) => {
            const randomMap = new Map();
            (
              container
                .getNodes()
                .filter(({ name }) =>
                  this.findRoadNodeRegex.test(name)
                ) as Array<TransformNode>
            ).forEach((node: TransformNode) => {
              randomMap.set(node, 1);
            });
            response.set(String(index), randomMap);
          });
          resolve(response);
        })
        .catch(reject);
    });
  }
}
