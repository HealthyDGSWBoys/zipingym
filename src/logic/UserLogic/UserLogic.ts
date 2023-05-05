import Config from '$/global/config/Config';
import Data from '$/data/Data';
import InputFactory from '$/module/input/InputFactory';
import { Inputable } from '$/module/input/Inputable';
import UserControl from './UserControl';
import ItemCollusion from './ItemCollusion';
import { TransformNode } from '@babylonjs/core';
import ItemEatSound from '$/module/sound/ItemEatSound';
import { NormalizedLandmarkList } from '@mediapipe/pose';

export default class UserLogic {
  private inputs: Array<Inputable> = new Array();
  private userControl: UserControl;
  private itemCollusion: ItemCollusion;
  private itemSound: ItemEatSound = new ItemEatSound();
  constructor(private data: Data) {
    this.userControl = new UserControl(data.userData, data.worldData);
    this.itemCollusion = new ItemCollusion(
      new Map([
        [
          'banana',
          (node: TransformNode) => {
            node.dispose();
            this.itemSound.play('good');
          },
        ],
        [
          'cola',
          (node: TransformNode) => {
            node.dispose();
            this.itemSound.play('bad');
          },
        ],
      ])
    );
    Config.get.input.forEach((input) => {
      const inputMod = InputFactory.GetInput(input);
      this.inputs.push(inputMod);
      inputMod.setOnInput(this.userControl.input.bind(this.userControl));
      if (input == 'exercise') {
        //@ts-expect-error
        inputMod.changeSkeleton((lmd: NormalizedLandmarkList) => {
          this.data.uiData.setLandmarks(lmd);
        });
      }
    });
    setInterval(() => {
      this.itemCollusion.update(
        this.data.worldData.getItems,
        this.data.userData.absolutePosition
      );
    }, 30);
  }
}
