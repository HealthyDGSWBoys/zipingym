import CharacterControl, { direction } from '../CharacterControl';
import CharacterInput from '../CharacterInput';
import ExerciseClassfierPipeline from './pipeline';
import tfmodel from './model';
import classfier from './classfier';
import { test as wasmPreprocesser } from './wasm/pkg/wasm';
import model from '$static/tflite/index.tflite';
// import '@tensorflow/tfjs-backend-webgl';

export default class ExerciseInput implements CharacterInput {
  private move: CharacterControl;
  private inputVideo: HTMLVideoElement;
  private pipeline: (video: HTMLVideoElement) => Promise<Array<number>>;
  constructor(
    inputVideo: HTMLVideoElement,
    frameRate: number = 30,
    keyMap?: Map<string, direction>
  ) {
    this.inputVideo = inputVideo;
    Promise.all([tfmodel(), classfier(model)]).then(([model, classfier]) => {
      this.pipeline = ExerciseClassfierPipeline(
        model,
        //@ts-ignore
        wasmPreprocesser,
        classfier
      );
      setInterval(this.update.bind(this), 1000 / frameRate);
    });
  }
  private update() {
    this.pipeline(this.inputVideo)
      .then((res: Array<number>) => {
        console.log(res);
        this.move.move('f');
      })
      .catch(() => {});
  }
  setMove = (move: CharacterControl) => {
    this.move = move;
  };
}
