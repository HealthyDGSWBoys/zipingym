import EventMessage from './EventMessage';
import * as BABYLON from 'babylonjs';

export default interface LocalLoadEventMap {
  onLoad: OnLoadEventMessage;
  onProgress: OnProgressEventMessage;
  onError: OnErrorEventMessage;
}

interface OnLoadEventMessage extends EventMessage {
  scene: BABYLON.Scene;
}
interface OnProgressEventMessage
  extends EventMessage,
    BABYLON.ISceneLoaderProgressEvent {}

interface OnErrorEventMessage extends EventMessage {
  scene: BABYLON.Scene;
  message: string;
  exception?: any;
}
