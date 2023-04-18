import App from './static/app/App';

const root = document.getElementById('app')!;
App.set(root, {
  debugUI: true,
  production: __ISPRODUCTION__,
  input: ['keyboard', 'exercise'],
  baseURL: '',
  engine: 'webgl',
});
// import videoSrc from '$asset/test2.mp4';
// import tflite from '$asset/tflite/index.tflite';
// // import "@tensorflow/tfjs-backend-webgl";
// import {
//   TfliteClassfier,
//   Pipeline,
//   MpJointPosition,
//   MergePreprocesser,
//   AnglePreprocesser,
//   DisPreprocesser2,
// } from '@zipingym/pose-input';

// const video = document.createElement('video');
// video.src = videoSrc;

// document.getElementById('app')?.appendChild(video);
// video.muted = true;

// const pipeline = new Pipeline();

// const JointPosition = new MpJointPosition({ modelComplexity: 1 });
// const preprocesser = new MergePreprocesser(
//   new AnglePreprocesser(),
//   new DisPreprocesser2()
// );
// const classfier = new TfliteClassfier(tflite);

// Promise.all([
//   JointPosition.init(),
//   classfier.init(),
//   import('@tensorflow/tfjs-backend-webgl'),
// ]).then(() => {
//   video.play();
//   pipeline.setJointPosition(JointPosition);
//   pipeline.setPreprocesser(preprocesser);
//   pipeline.setClassfier(classfier);

//   setInterval(() => {
//     pipeline.run(video).then(console.log);
//   }, 1000 / 60);
// });

declare global {
  const __ISPRODUCTION__: boolean;
}
