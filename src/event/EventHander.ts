import BabyEvent, {
  BabyEventMap,
  BabyEventMapKey,
  BabyEventMapValue,
} from './BabyEvent';

export default class EventHandler {
  protected eventHanderQueue: Map<
    BabyEventMapKey,
    (m: BabyEventMapValue) => void
  > = new Map();
  constructor() {}

  public addEventHandler<K extends BabyEventMapKey>(
    namespace: K,
    lamda: (message: BabyEventMap[K]) => void
  ) {
    //@ts-ignore
    this.eventHanderQueue.set(namespace, lamda);
  }
  public __trigger__(event: BabyEvent<BabyEventMapKey>) {
    const get = this.eventHanderQueue.get(event.target);
    if (get != undefined) {
      get(event.message);
    }
  }
}
