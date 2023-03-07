import ControlEventMap from './map/ControlEventMap';
import EventMessage from './map/EventMessage';
import InputEventMap from './map/input/InputEventMap';
import LocalLoadEventMap from './map/LocalLoadEventMap';

export default class BabyEvent<K extends BabyEventMapKey> {
  public message: BabyEventMap[K];
  public target: K;
  public isCascade: boolean;
  public generator: any;
  constructor(target: K, message: BabyEventMap[K], isCascade: boolean = true) {
    this.message = message;
    this.target = target;
    this.isCascade = isCascade;
  }
}

export declare type BabyEventMapKey = keyof BabyEventMap;
export declare type BabyEventMapValue = BabyEventMap[BabyEventMapKey];

export interface BabyEventMap
  extends LocalLoadEventMap,
    ControlEventMap,
    InputEventMap {}
