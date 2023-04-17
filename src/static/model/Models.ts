import dummyCharacter from '$asset/model/character.glb';
import animeCharacter from '$asset/model/girl.glb';

import startpoint from '$asset/model/dummy.glb';
import colaTheme from '$asset/model/stage1_5.glb';

import items from '$asset/model/item.glb';

const Models: Array<ModelInfo> = [
  {
    name: 'dummyCharacter',
    url: dummyCharacter,
  },
  {
    name: 'animeCharacter',
    url: animeCharacter,
  },
  {
    name: 'startpoint',
    url: startpoint,
  },
  {
    name: 'colaTheme',
    url: colaTheme,
  },
  {
    name: 'items',
    url: items,
  },
];

export interface ModelInfo {
  name: ModelNameUnion;
  url: string;
}

export const ModelNames = {
  dummyCharacter: 'dummyCharacter',
  animeCharacter: 'animeCharacter',

  startpoint: 'startpoint',
  colaTheme: 'colaTheme',

  items: 'items',
} as const;

export type ModelNameUnion = (typeof ModelNames)[keyof typeof ModelNames];

export default Models;
