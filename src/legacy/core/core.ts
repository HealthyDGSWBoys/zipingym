import ShareMemory from './ShareMemory';

export default abstract class Core {
  protected share: ShareMemory;
  constructor(share: ShareMemory) {
    this.share = share;
  }
  get scene() {
    return this.share.scene;
  }
  public abstract set: () => Promise<void>;
  public abstract setsync: () => void;
  public abstract loop: (deltaTime: number) => void;
}
