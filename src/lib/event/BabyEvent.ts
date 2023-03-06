import { EventMessage } from './message/EventMessage';
import UpdateEventMessage from './message/UpdateEventMessage';

export default class BabyEvent {
  public message: BabyEventMapValue;
  public target: BabyEventMapKey;
  public generator: any;
  constructor(target: BabyEventMapKey, message: BabyEventMapValue) {
    this.message = message;
    this.target = target;
  }
}

export declare type BabyEventMapKey = keyof BabyEventMap;
export declare type BabyEventMapValue = BabyEventMap[BabyEventMapKey];

export interface BabyEventMap {
  update: UpdateEventMessage;
  setting: EventMessage;
}
