import backgroundSoundSrc from '$static/sound/roombackground.mp3';
import { Sound } from '@babylonjs/core';
export default class BackgroundSound {
  constructor() {
    const sound = new Sound('background', backgroundSoundSrc, null, null, {
      playbackRate: 1,
      volume: 0.3,
    });
    sound.autoplay = true;
  }
}
