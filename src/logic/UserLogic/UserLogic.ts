import Config from '$/global/config/Config';
import Data from '$/data/Data';
import InputFactory from '$/module/input/InputFactory';
import { Inputable } from '$/module/input/Inputable';
import UserControl from './UserControl';
import ItemCollusion from './ItemCollusion';
import { TransformNode } from '@babylonjs/core';
import ItemEatSound from '$/module/sound/ItemEatSound';
import { NormalizedLandmarkList } from '@mediapipe/pose';
import ExerciseInput from '$/module/input/ExerciseInput/ExerciseInput';

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
            this.addScore(300);
            this.itemSound.play('good');
            this.data.uiData.recordItem('banana');
          },
        ],
        [
          'NRGbar',
          (node: TransformNode) => {
            node.dispose();
            this.addScore(500);
            this.itemSound.play('good');
            this.data.uiData.recordItem('NRGbar');
          },
        ],
        [
          'proteinPowder',
          (node: TransformNode) => {
            node.dispose();
            this.addScore(1000);
            this.itemSound.play('good');
            this.data.uiData.recordItem('proteinPowder');
          },
        ],
        [
          'soju',
          (node: TransformNode) => {
            node.dispose();
            this.addScore(-300);
            this.itemSound.play('bad');
            this.data.uiData.recordItem('soju');
          },
        ],
        [
          'injector',
          (node: TransformNode) => {
            node.dispose();
            this.addScore(-500);
            this.itemSound.play('bad');
            this.data.uiData.recordItem('injector');
          },
        ],
        [
          'cola',
          (node: TransformNode) => {
            node.dispose();
            this.addScore(-150);
            this.itemSound.play('bad');
            this.data.uiData.recordItem('cola');
          },
        ],
      ]),
      data
    );
    Config.get.input.forEach((input) => {
      const inputMod = InputFactory.GetInput(input);
      this.inputs.push(inputMod);
      inputMod.setOnInput(this.userControl.input.bind(this.userControl));
      if (input == 'exercise') {
        const exerciseInput = inputMod as ExerciseInput;
        exerciseInput.changeSkeleton(
          (lmd: NormalizedLandmarkList, code: number) => {
            this.data.uiData.setLandmarks(
              lmd,
              exerciseInput.trigger.getInfo(code)
            );
          }
        );
      }
    });
    setInterval(() => {
      this.itemCollusion.update(
        this.data.worldData.getItems,
        this.data.userData.absolutePosition
      );
    }, 30);
  }
  private addScore(score: number) {
    this.data.uiData.addScore(score);
    this.data.worldData.setTheme(
      String(Math.round(this.data.uiData.score / 2000) % 3)
    );
  }
}
