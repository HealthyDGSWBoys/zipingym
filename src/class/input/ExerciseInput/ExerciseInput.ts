import { Input } from '../Inputable';

import ExerciseClassfierPipeline from './pipeline';
import Bzmodel from './model';
import classfier from './classfier';
import { test as wasmPreprocesser } from './wasm/pkg/wasm';
import model from './work.tflite';
import '@tensorflow/tfjs-backend-webgl';
import WebcamBuilder from '$/util/Webcam';
import MpPoseModel from './mpmodel';

export default class ExerciseInput extends Input {
  private inputVideo?: HTMLVideoElement;
  private pipeline?: (video: HTMLVideoElement) => Promise<Array<number>>;

  private test: any = 0;
  private count: number = 0;
  constructor(inputVideo?: HTMLVideoElement, frameRate: number = 30) {
    super();
    // this.inputVideo = inputVideo;
    Promise.all([MpPoseModel(), classfier(model), WebcamBuilder()])
      .then(([bzmodel, classfier, camera]) => {
        this.inputVideo = camera;
        this.inputVideo.play();
        document.body.appendChild(this.inputVideo);
        this.pipeline = ExerciseClassfierPipeline(
          bzmodel,
          //@ts-ignore
          wasmPreprocesser,
          classfier
        );
        setTimeout(() => {
          setInterval(this.update.bind(this), 1000 / frameRate);
        }, 1000);
      })
      .catch(() => {
        console.log('INIT ERROR');
      });
  }

  private update() {
    this.pipeline!(this.inputVideo!)
      .then((res: Array<number>) => {})
      .catch((err) => {});
  }
}
