import App from './App';
import * as BABYLON from 'babylonjs';
import { Engine, Scene } from 'babylonjs';
import image from '$static/favicon.png';

window.addEventListener('DOMContentLoaded', () => {
  console.log(image);
  const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;
  BABYLON.WebGPUEngine.IsSupportedAsync.then((use: boolean) => {
    let engine: Engine;
    let scene: Scene;
    if (use) {
      engine = new BABYLON.WebGPUEngine(canvas);
    } else {
      engine = new BABYLON.Engine(canvas);
    }
    const app = new App(engine);
    app.run();
  });
});
