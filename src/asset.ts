import '@babylonjs/loaders/glTF/2.0';

export { default as ItemUrl } from '$static/model/items.glb';

import stage1 from '$static/model/stage1_5.glb';

export const StageUrls = [stage1];

import RawCharacterUrl from '$static/model/dummy.babylon';

export const CharacterUrl = '.' + RawCharacterUrl;

export { default as ExerciseModel } from '$static/tflite/work.tflite';
