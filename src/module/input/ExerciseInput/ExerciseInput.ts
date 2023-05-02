import { Input } from '../Inputable';

import {
  TfliteClassfier,
  Pipeline,
  MpJointPosition,
  DisPreprocesser,
} from '@zipingym/pose-input';

import model from '$static/tflite/work.tflite';
import WebcamBuilder from '$/util/Webcam';
import Trigger from './trigger/Trigger';
import DumbleTrigger from './trigger/DumbleTrigger';
import Config from '$/global/config/Config';

export default class ExerciseInput extends Input {
  private inputVideo?: HTMLVideoElement;
  private trigger: Trigger;
  constructor(inputVideo?: HTMLVideoElement, frameRate: number = 30) {
    super();
    this.trigger = new DumbleTrigger();
    WebcamBuilder(document.getElementById('webcam')! as HTMLVideoElement).then(
      (camera) => {
        this.inputVideo = camera;
        this.inputVideo.play();
        const classfier = new TfliteClassfier(model);
        const processer = new DisPreprocesser();
        const jointPosition = new MpJointPosition({
          modelComplexity: 1,
          enableSegmentation: false,
        });
        Promise.all([
          classfier.init(),
          jointPosition.init(),
          ExerciseInput.loadBackend(),
        ]).then(() => {
          const pipeline = new Pipeline();
          pipeline.setClassfier(classfier);
          pipeline.setJointPosition(jointPosition);
          pipeline.setPreprocesser(processer);
          setTimeout(() => {
            setInterval(() => {
              pipeline.run(this.inputVideo!).then((result) => {
                const trigger = this.trigger.call({
                  ...result,
                  deltaTime: 1000 / frameRate,
                });
                if (trigger != undefined) {
                  this.onInput(trigger);
                }
              });
            }, 1000 / frameRate);
          }, 3000);
        });
      }
    );
  }

  private static isBackendRegister: boolean = false;
  private static async loadBackend() {
    if (this.isBackendRegister == false) {
      await import(
        Config.get.engine == 'webgpu'
          ? '@tensorflow/tfjs-backend-webgl'
          : '@tensorflow/tfjs-backend-webgl'
      );
    }
  }
}
