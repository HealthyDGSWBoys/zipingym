import AssetContainerLoader from '$/package/Loader/AssetContainerLoader';
import { AssetContainer, TransformNode } from '@babylonjs/core';
import { RoadMeshs } from './WorldCore';

export default class WorldImporter extends AssetContainerLoader {
  private static findRoadNodeRegex = new RegExp('^\\$');
  public import(themes: Array<string>) {
    return new Promise<RoadMeshs>((resolve, reject) => {
      Promise.all(themes.map((theme) => this.load(theme)))
        .then((result) => {
          const response = new Map();
          result.forEach((container: AssetContainer, index: number) => {
            const randomMap = new Map();
            (
              container
                .getNodes()
                .filter(({ name }) =>
                  WorldImporter.findRoadNodeRegex.test(name)
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
