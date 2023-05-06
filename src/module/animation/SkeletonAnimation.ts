import { AnimationPropertiesOverride, Scene, Skeleton } from '@babylonjs/core';

export default class SkeletonAnimation {
  constructor(private scene: Scene, private skeleton: Skeleton) {
    skeleton.animationPropertiesOverride = new AnimationPropertiesOverride();
    skeleton.animationPropertiesOverride.enableBlending = true;
    skeleton.animationPropertiesOverride.blendingSpeed = 0.05;
    skeleton.animationPropertiesOverride.loopMode = 1;
  }
  public animations = [
    'YBot_Idle',
    'YBot_Walk',
    'YBot_Run',
    'YBot_LeftStrafeWalk',
    'YBot_RightStrafeWalk',
  ];

  public play(name: string) {
    const anime = this.skeleton.getAnimationRange(name);
    if (anime)
      this.scene.beginAnimation(this.skeleton, anime.from, anime.to, true);
  }
}
