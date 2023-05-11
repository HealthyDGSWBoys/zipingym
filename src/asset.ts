import '@babylonjs/loaders/glTF/2.0';

export { default as ItemUrl } from '$static/model/items.glb';

import stage1 from '$static/model/stage1_5.glb';
import stage2 from '$static/model/stage2.glb';
import stage3 from '$static/model/stage3.glb';

export const StageUrls = [stage1, stage2, stage3];

import RawCharacterUrl from '$static/model/dummy.babylon';

export const CharacterUrl = '.' + RawCharacterUrl;

export { default as ExerciseModel } from '$static/tflite/work.tflite';
