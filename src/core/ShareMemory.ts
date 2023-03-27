import { AppConfig } from './app';
import { Scene } from '@babylonjs/core';
import WorldEngine from '$/util/WorldEngine';

export default interface ShareMemory extends AppConfig {
  scene: Scene;
  worldEngine: WorldEngine;
}
