import { Input } from '../Inputable';

import {
  TfliteClassfier,
  MpJointPosition,
  DisPreprocesser,
} from '@zipingym/pose-input';

import model from '$static/tflite/work.tflite';
import WebcamBuilder from '$/util/Webcam';
import Trigger from './trigger/Trigger';
import DumbleTrigger from './trigger/DumbleTrigger';
import Config from '$/global/config/Config';
import CustomExercisePipeline from './CustomExercisePipeline';
import { NormalizedLandmarkList } from '@mediapipe/pose';

export default class ExerciseInput extends Input {
  private inputVideo?: HTMLVideoElement;
  public trigger: Trigger;
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
          const pipeline = new CustomExercisePipeline();
          pipeline.setClassfier(classfier);
          pipeline.setJointPosition(jointPosition);
          pipeline.setPreprocesser(processer);
          setTimeout(() => {
            setInterval(() => {
              pipeline.run(this.inputVideo!).then((result) => {
                if (this._changeSkeleton) {
                  this._changeSkeleton(
                    //@ts-expect-error
                    result.landmarks,
                    this.trigger.arrayToCode(result.result)
                  );
                }
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
  private _changeSkeleton?: (lmd: NormalizedLandmarkList, code: number) => void;
  public changeSkeleton(
    f: (lmd: NormalizedLandmarkList, code: number) => void
  ) {
    this._changeSkeleton = f;
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
