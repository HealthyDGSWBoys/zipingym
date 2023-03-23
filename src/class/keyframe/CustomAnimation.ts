import { Vector3 } from 'babylonjs';
export default interface CustomAnimation {
  animate: (type: 'add' | 'set', vector: Vector3, duration: number) => void;
}
