import * as BABYLON from 'babylonjs';
import appConfig from './config';

export default interface ShareMemory extends appConfig {
  scene: BABYLON.Scene;
  engine: BABYLON.Engine;
  highlite: BABYLON.HighlightLayer;
}
