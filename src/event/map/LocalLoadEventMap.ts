import EventMessage from './EventMessage';
import * as BABYLON from 'babylonjs';

export default interface LocalLoadEventMap {
  _onLoad: OnLoadEventMessage;
  _onProgress: OnProgressEventMessage;
  _onError: OnErrorEventMessage;
  _onTargetSet: OnTargetEventMessage;
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

interface OnTargetEventMessage extends EventMessage {}
