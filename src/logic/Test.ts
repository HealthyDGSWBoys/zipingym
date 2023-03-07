import { TransformNode } from 'babylonjs';
import Module from '$/app/Module';

export default class TestMod extends Module {
  protected onSet(): void {
    this.parent.addEventHandler('update', () => console.log('SEX'));

    this.addEventHandler('update', () => {
      console.log('SEX');
    });
  }
}
