import Loader from '../Loader';

export default class DummyMap extends Loader {
  protected url: [string, string] = ['./', ''];

  protected onSet(): void {
    this.load();
  }
}
