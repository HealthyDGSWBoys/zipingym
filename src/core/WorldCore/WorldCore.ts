import { RoadInfo } from '$/data/WorldData/WorldData';
import { TransformNode } from '@babylonjs/core';

export default interface WorldCore {
  setTheme(theme: string): void;
  drawRoad(roadInfo: RoadInfo): void;
  disposeRoad(roadInfo: RoadInfo): void;
}

export type RoadMeshs = Map<string, Map<TransformNode, number>>;
