import * as BABYLON from 'babylonjs';

export default interface ShareMemory {
  scene: BABYLON.Scene;
  crossPoints: Array<BABYLON.Mesh>;
}
