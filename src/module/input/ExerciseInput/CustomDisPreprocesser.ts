import Preprocesser from '@zipingym/pose-input';
import Vector3 from '@zipingym/pose-input/dist/interface/Vector';

export default class CustomDisPreprocesser {
  private static distances = [
    [11, 13],
    [12, 14],
    [13, 15],
    [14, 16],
    [23, 25],
    [24, 26],
    [25, 27],
    [26, 28],
    [11, 15],
    [12, 16],
    [23, 27],
    [24, 28],
    [23, 15],
    [24, 16],
    [11, 27],
    [12, 28],
    [23, 15],
    [24, 16],
    [13, 14],
    [25, 26],
    [15, 16],
    [27, 28],
  ]; //일반적으로 static은 위에 위치
  //두 인덱스 값의 걸이 구하기
  constructor() {
    const arr = [
      'nose',
      'left_eye_inner',
      'left_eye',
      'left_eye_outer',
      'right_eye_inner',
      'right_eye',
      'right_eye_outer',
      'left_ear',
      'right_ear',
      'mouth_left',
      'mouth_right',
      'left_shoulder',
      'right_shoulder',
      'left_elbow',
      'right_elbow',
      'left_wrist',
      'right_wrist',
      'left_pinky_1',
      'right_pinky_1',
      'left_index_1',
      'right_index_1',
      'left_thumb_2',
      'right_thumb_2',
      'left_hip',
      'right_hip',
      'left_knee',
      'right_knee',
      'left_ankle',
      'right_ankle',
      'left_heel',
      'right_heel',
      'left_foot_index',
      'right_foot_index',
    ];

    [
      ['left_shoulder', 'left_elbow'],
      ['right_shoulder', 'right_elbow'],
      ['left_elbow', 'left_wrist'],
      ['right_elbow', 'right_wrist'],
      ['left_hip', 'left_knee'],
      ['right_hip', 'right_knee'],
      ['left_knee', 'left_ankle'],
      ['right_knee', 'right_ankle'],
      ['left_shoulder', 'left_wrist'],
      ['right_shoulder', 'right_wrist'],
      ['left_hip', 'left_ankle'],
      ['right_hip', 'right_ankle'], //
      ['left_hip', 'left_wrist'],
      ['right_hip', 'right_wrist'], //
      ['left_shoulder', 'left_ankle'],
      ['right_shoulder', 'right_ankle'],
      ['left_hip', 'left_wrist'],
      ['right_hip', 'right_wrist'],
      ['left_elbow', 'right_elbow'],
      ['left_knee', 'right_knee'],
      ['left_wrist', 'right_wrist'],
      ['left_ankle', 'right_ankle'],
    ].forEach(([str1, str2], idx) => {
      const [num1, num2] = CustomDisPreprocesser.distances[idx];
      if ((num1 === arr.indexOf(str1) && num2 === arr.indexOf(str2)) == false) {
        console.log(num1, num2);
        console.log(arr.indexOf(str1), arr.indexOf(str2));
      }
    });
  }
  private static calcDistance(arr2: Vector3, arr1: Vector3) {
    let xRange = arr1.x - arr2.x;
    let yRange = arr1.y - arr2.y;
    let zRange = arr1.z - arr2.z;

    let arrayRange: number[] = [xRange, yRange, zRange];
    return arrayRange;
  }

  private static get_average_between_two_vec = (p1: Vector3, p2: Vector3) => {
    return {
      x: (p1.x + p2.x) / 2.0,
      y: (p1.y + p2.y) / 2.0,
      z: (p1.x + p2.z) / 2.0,
    };
  };

  private static get_euclid_distance(arr2: Vector3, arr1: Vector3) {
    let xRange = arr1.x - arr2.x;
    let yRange = arr1.y - arr2.y;
    let zRange = arr1.z - arr2.z;
    return Math.sqrt(xRange * xRange + yRange * yRange + zRange * zRange);
  }

  public length: number = CustomDisPreprocesser.distances.length * 3;

  public calculate(arr: Vector3[]): Float32Array {
    const flot32Array = new Float32Array(this.length);
    const divide =
      CustomDisPreprocesser.get_euclid_distance(
        CustomDisPreprocesser.get_average_between_two_vec(arr[23], arr[24]),
        CustomDisPreprocesser.get_average_between_two_vec(arr[11], arr[12])
      ) * 10;
    CustomDisPreprocesser.distances.forEach((distance, idx) => {
      const result = CustomDisPreprocesser.calcDistance(
        arr[distance[0]],
        arr[distance[1]]
      );
      flot32Array[idx * 3] = result[0] / divide;
      flot32Array[idx * 3 + 1] = result[1] / divide;
      flot32Array[idx * 3 + 2] = result[2] / divide;
    });
    return flot32Array;
  }
}
