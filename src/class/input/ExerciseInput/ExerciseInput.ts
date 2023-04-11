import { Input } from '../Inputable';

import Pipeline, { MpPose, Classfier, JsMiddleware } from 'exercise-input';

import model from './work.tflite';
import '@tensorflow/tfjs-backend-webgl';
import WebcamBuilder from '$/util/Webcam';

export default class ExerciseInput extends Input {
  private inputVideo?: HTMLVideoElement;
  private pipeline?: (video: HTMLVideoElement) => Promise<Array<number>>;

  constructor(inputVideo?: HTMLVideoElement, frameRate: number = 30) {
    super();
    // this.inputVideo = inputVideo;
    WebcamBuilder().then((camera) => {
      this.inputVideo = camera;
      this.inputVideo.play();
      Promise.all([MpPose(), Classfier(model)])
        .then(([bzmodel, classfier]) => {
          this.pipeline = Pipeline(bzmodel, JsMiddleware.calc, classfier);
          setTimeout(() => {
            setInterval(this.update.bind(this), 1000 / frameRate);
          }, 1000);
        })
        .catch((e) => {});
    });
  }

  private update() {
    this.pipeline!(this.inputVideo!)
      .then((res: Array<number>) => {})
      .catch((err) => {});
  }
}
