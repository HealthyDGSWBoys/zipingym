const Models: Array<ModelInfo> = [];

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

import './AddCharacter';
import './AddWorld';
