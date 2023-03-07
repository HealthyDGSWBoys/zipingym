import { EventMessage } from './message/EventMessage';
import UpdateEventMessage from './message/UpdateEventMessage';

export default class BabyEvent {
  public message: BabyEventMapValue;
  public target: BabyEventMapKey;
  public isCascade: boolean;
  public generator: any;
  constructor(
    target: BabyEventMapKey,
    message: BabyEventMapValue,
    isCascade: boolean = true
  ) {
    this.message = message;
    this.target = target;
    this.isCascade = isCascade;
  }
}

export declare type BabyEventMapKey = keyof BabyEventMap;
export declare type BabyEventMapValue = BabyEventMap[BabyEventMapKey];

export interface BabyEventMap {
  update: UpdateEventMessage;
  setting: EventMessage;

  requestLoad: EventMessage;
}
