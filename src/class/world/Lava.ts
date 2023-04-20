import { Color3, MeshBuilder, Texture, Vector3 } from '@babylonjs/core';
import { Controller } from '../controller/Controller';
import Core from '$/global/core/Core';
import ColaTexture from '$asset/material/Cola3.png';
import BumpTexture from '$asset/material/LavaBump2.jpg';
import { LavaMaterial } from '@babylonjs/materials';

export default class Lava {
  constructor() {
    const scene = Core.get.scene;
    const ground = MeshBuilder.CreateGround(
      'lava',
      { width: 1024, height: 1024, subdivisions: 128 },
      scene
    );
    ground.parent = Core.get.root;
    ground.position = Core.get.root.position.add(new Vector3(0, -5, 0));
    const lavaMaterial = new LavaMaterial('lava', scene);
    const lavaTexture = new Texture(ColaTexture, scene);
    lavaTexture.level = 0.15;
    lavaMaterial.diffuseTexture = lavaTexture;
    lavaMaterial.alpha = 0.8;
    lavaMaterial.diffuseTexture.name = 'lavaMaterialdiffuseTexture';
    lavaMaterial.speed = 0.3;
    lavaMaterial.fogColor = new Color3(0, 0, 0);
    lavaMaterial.noiseTexture = new Texture(BumpTexture, scene);
    ground.material = lavaMaterial;
  }
}
