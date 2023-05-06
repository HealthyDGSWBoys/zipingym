import { Vector3 } from '@babylonjs/core';
export default interface CustomAnimation {
  animate: (type: 'add' | 'set', vector: Vector3, duration: number) => void;
}
