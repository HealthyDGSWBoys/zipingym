import Module from '$/app/Module';

export default class DebugMod extends Module {
  protected set(): void {
    this.addEventHandler('update', (e) => {
      console.log(e.deltaTime);
      // console.log('Update');
    });
  }
}
