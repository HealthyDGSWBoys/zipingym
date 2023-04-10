import dummyCharacter from '$asset/model/character.glb';
import animeCharacter from '$asset/model/girl.glb';

import startpoint from '$asset/model/dummy.glb';
import colaTheme from '$asset/model/room.glb';

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
} as const;

export type ModelNameUnion = (typeof ModelNames)[keyof typeof ModelNames];

export default Models;
