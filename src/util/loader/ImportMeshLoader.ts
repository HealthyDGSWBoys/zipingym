import Config from '$/global/config/Config';
import { AnimationGroup } from '@babylonjs/core/Animations/animationGroup';
import { Skeleton } from '@babylonjs/core/Bones/skeleton';
import { Light } from '@babylonjs/core/Lights/light';
import {
  ISceneLoaderProgressEvent,
  SceneLoader,
} from '@babylonjs/core/Loading/sceneLoader';
import { AbstractMesh } from '@babylonjs/core/Meshes/abstractMesh';
import { Geometry } from '@babylonjs/core/Meshes/geometry';
import { TransformNode } from '@babylonjs/core/Meshes/transformNode';
import { IParticleSystem } from '@babylonjs/core/Particles/IParticleSystem';
import { AssetContainer } from '@babylonjs/core/assetContainer';
import { Scene } from '@babylonjs/core/scene';

export default class ImportMeshLoader {
  private static Meshes: Map<string, ImportMeshResult> = new Map();

  public static load: (url: string, scene: Scene) => Promise<ImportMeshResult> =
    (url: string, scene: Scene) => {
      return new Promise((resolve, reject) => {
        const get = ImportMeshLoader.Meshes.get(url);
        if (get != null) resolve(get);
        else {
          SceneLoader.ImportMesh(
            [],
            Config.get.baseURL,
            url,
            scene,
            (
              meshes: AbstractMesh[],
              particleSystems: IParticleSystem[],
              skeletons: Skeleton[],
              animationGroups: AnimationGroup[],
              transformNodes: TransformNode[],
              geometries: Geometry[],
              lights: Light[]
            ) => {
              const result = {
                meshes,
                particleSystems,
                skeletons,
                animationGroups,
                transformNodes,
                geometries,
                lights,
              };
              ImportMeshLoader.Meshes.set(url, result);
              resolve(result);
            },
            (prog: ISceneLoaderProgressEvent) => {},
            (scene: Scene, message: string, exception?: any) => {
              reject({
                scene,
                message,
                exception,
              });
            }
          );
        }
      });
    };
}

export interface ImportMeshResult {
  meshes: AbstractMesh[];
  particleSystems: IParticleSystem[];
  skeletons: Skeleton[];
  animationGroups: AnimationGroup[];
  transformNodes: TransformNode[];
  geometries: Geometry[];
  lights: Light[];
}
