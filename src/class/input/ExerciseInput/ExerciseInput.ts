import { Input } from '../Inputable';

import {
  TfliteClassfier,
  Pipeline,
  MpJointPosition,
  DisPreprocesser,
} from '@zipingym/pose-input';

import model from '$asset/tflite/work.tflite';
import WebcamBuilder from '$/util/Webcam';
import Trigger from './trigger/Trigger';
import DumbleTrigger from './trigger/DumbleTrigger';
import Config from '$/static/config/Config';

export default class ExerciseInput extends Input {
  private inputVideo?: HTMLVideoElement;
  private pipeline?: (video: HTMLVideoElement) => Promise<Array<number>>;
  private trigger: Trigger;
  constructor(inputVideo?: HTMLVideoElement, frameRate: number = 30) {
    super();
    this.trigger = new DumbleTrigger();
    WebcamBuilder(document.getElementById('webcam')! as HTMLVideoElement).then(
      (camera) => {
        camera.width = 360;
        this.inputVideo = camera;
        this.inputVideo.play();
        const classfier = new TfliteClassfier(model);
        const processer = new DisPreprocesser();
        const jointPosition = new MpJointPosition({
          modelComplexity: 1,
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
                this.trigger.call(result);
              });
            }, 1000 / 30);
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
