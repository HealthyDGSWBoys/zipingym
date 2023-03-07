import EventMessage from './EventMessage';
import * as BABYLON from 'babylonjs';

export default interface LocalLoadEventMap {
  onLoad: OnLoadEventMessage;
  onProgress: OnProgressEventMessage;
  onError: OnErrorEventMessage;
}

interface OnLoadEventMessage extends EventMessage {
  assets: BABYLON.AssetContainer;
}
interface OnProgressEventMessage
  extends EventMessage,
    BABYLON.ISceneLoaderProgressEvent {}

interface OnErrorEventMessage extends EventMessage {
  scene: BABYLON.Scene;
  message: string;
  exception?: any;
}
