import Config from '$/static/config/Config';
import Core from '$/static/core/Core';
import { ModelNameUnion } from '$/static/model/Models';
import InputFactory, { InputType } from '../input/InputFactory';
import Character from './Character';
import { UniversalCamera, Vector3 } from '@babylonjs/core';
import InputController from './InputController';
import Command from '$/static/command/Command';

export default class User extends Character {
  constructor(model: ModelNameUnion, name: string) {
    super(model, name);
    const camera = new UniversalCamera(
      'user_camera',
      new Vector3(0, 2, -6),
      Core.get.scene
    );
    camera.parent = this.target;
    camera.setTarget(this.target.position);
    camera.position = camera.position.add(new Vector3(0, 0.5, 0));

    Config.get.input.forEach((input: InputType) => {
      this.addController(
        new InputController(
          InputFactory.GetInput(input),
          Command.get.world.roadTree
        )
      );
    });
  }
}
