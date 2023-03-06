import BabyEvent, { BabyEventMapKey, BabyEventMapValue } from './BabyEvent';

export default class EventHandler {
  protected eventHanderQueue: Map<
    BabyEventMapKey,
    (m: BabyEventMapValue) => void
  > = new Map();
  constructor() {}

  public addEventHandler(
    namespace: BabyEventMapKey,
    lamda: (message: BabyEventMapValue) => void
  ) {
    this.eventHanderQueue.set(namespace, lamda);
  }
  public __trigger__(event: BabyEvent) {
    const get = this.eventHanderQueue.get(event.target);
    if (get != undefined) {
      get(event.message);
    }
  }
}
