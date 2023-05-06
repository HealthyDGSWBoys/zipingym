import GoodItemSoundSrc from '$static/sound/gooditem.wav';
import BadItemSoundSrc from '$static/sound/baditem.wav';
import { Sound } from '@babylonjs/core/Audio';
export default class ItemEatSound {
  private goodItemDisposeSound: Sound;
  private badItemDisposeSound: Sound;
  constructor() {
    this.goodItemDisposeSound = new Sound(
      'goodItemDisposeSound',
      GoodItemSoundSrc,
      null,
      null,
      {
        playbackRate: 1,
        volume: 0.3,
      }
    );
    this.badItemDisposeSound = new Sound(
      'badItemDisposeSound',
      BadItemSoundSrc,
      null,
      null,
      {
        playbackRate: 1,
        volume: 0.3,
      }
    );
  }

  public play(type: 'good' | 'bad') {
    switch (type) {
      case 'good':
        this.goodItemDisposeSound.play();
        break;
      case 'bad':
        this.badItemDisposeSound.play();
        break;
    }
  }
}
