import { AppConfig } from './app';
import { Scene } from 'babylonjs';
import WorldEngine from '$/util/WorldEngine';

export default interface ShareMemory extends AppConfig {
  scene: Scene;
  worldEngine: WorldEngine;
}
