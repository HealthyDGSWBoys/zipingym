import { RoadItemInfo, itemList } from '$/data/WorldData/WorldData';
import { TransformNode } from '@babylonjs/core';

export default interface WorldCore {
  setTheme(theme: string): void;
  drawRoad(roadItemInfo: RoadItemInfo): void;
  disposeRoad(roadItemInfo: RoadItemInfo): void;
}

export type RoadMeshs = Map<string, Map<TransformNode, number>>;
