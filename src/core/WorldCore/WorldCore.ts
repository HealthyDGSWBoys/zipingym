import { RoadInfo } from '$/data/WorldData/WorldData';
import AssetContainerLoader from '$/loader/AssetContainerLoader';
import Random from '$/util/Random';
import { AssetContainer, Scene, TransformNode } from '@babylonjs/core';

export default class WorldCore {
  private deps: number = 0;
  private theme: string;
  constructor(
    private scene: Scene,
    private root: TransformNode,
    private meshs: RoadMeshs
  ) {
    this.theme = Object.keys(meshs)[0];
  }

  public set setTheme(theme: string) {
    if (this.meshs.has(theme)) this.theme = theme;
    else throw new Error('No Theme have');
  }
  public get getTheme() {
    return this.theme;
  }
  private get getRandomMesh() {
    return Random.getRandom(this.meshs.get(this.theme)!);
  }
  public drawRoad(roadInfo: Array<RoadInfo>) {
    roadInfo.forEach((info) => {
      const mesh = this.getRandomMesh.clone(String(this.deps), this.root)!;
      mesh.position.set(info.position.x, info.position.y, info.position.z);
    });
    this.deps++;
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

export type RoadMeshs = Map<string, Map<TransformNode, number>>;
