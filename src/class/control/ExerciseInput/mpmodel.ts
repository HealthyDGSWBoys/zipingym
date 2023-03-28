// import { Pose } from '@mediapipe/pose';
// import { Vector3Array } from './landmark';
// const MpPoseModel = (): Promise<
//   (video: HTMLVideoElement) => Promise<Vector3Array>
// > => {
//   return new Promise((resolve, reject) => {
//     const pose = new Pose({
//       locateFile: (file) => {
//         return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
//       },
//     });
//     pose.initialize().then(() => {
//       pose.setOptions({
//         modelComplexity: 1,
//         enableSegmentation: true,
//         minDetectionConfidence: 0.5,
//         selfieMode: false,
//       });

//       resolve((video: HTMLVideoElement) => {
//         return new Promise((res, rej) => {
//           pose.send({ image: video });
//           pose.onResults((poseResult) => {
//             res(poseResult.poseWorldLandmarks);
//           });
//         });
//       });
//     });
//   });
// };
// export default MpPoseModel;
