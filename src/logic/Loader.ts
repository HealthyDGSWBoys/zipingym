import Module from '$/app/Module';

export default abstract class Loader extends Module {
  protected abstract url: [string, string];
  protected load() {}
  protected onLoad() {}
}
