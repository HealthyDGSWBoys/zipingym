import BabyEvent from './BabyEvent';
import EventHandler from './EventHander';

export default class EventFall extends EventHandler {
  public readonly children: Array<EventFall> = new Array();
  public readonly parent: EventFall;
  constructor(parent: EventFall) {
    super();
    this.parent = parent;
  }

  protected static FindRoot(target: EventFall): EventFall {
    if (target.isRoot()) {
      return target;
    } else {
      return EventFall.FindRoot(target.parent);
    }
  }
  protected static MakeMotherlessFall(): EventFall {
    //@ts-ignore
    return new EventFall(undefined);
  }
  protected generateEvent(event: BabyEvent) {
    const root = EventFall.FindRoot(this);
    root.__trigger__(event);
  }
  public __trigger__(event: BabyEvent) {
    const get = this.eventHanderQueue.get(event.target);
    this.children.forEach((child: EventFall) => {
      child.__trigger__(event);
    });
    if (get != undefined) {
      get(event.message);
    }
  }
  protected isRoot = () => false;
}
