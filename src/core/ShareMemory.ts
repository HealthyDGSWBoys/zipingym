import { AppConfig } from './app';
import { Scene } from 'babylonjs';

export default interface ShareMemory extends AppConfig {
  scene: Scene;
}
