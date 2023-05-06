import { NormalizedLandmarkList, POSE_CONNECTIONS } from '@mediapipe/pose';
import './PoseElement.style.scss';

import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import { Customelement } from '$/interface/CustomElements';

export default class PoseElement extends Customelement {
  connectedCallback() {
    console.log("connnected")
    const template = document.createElement('template');
    template.innerHTML = `
        <video
            id="webcam"
        ></video>
        <canvas></canvas>
        <span>  </span>
    `;
    const serializer = new XMLSerializer();
    const document_fragment_string = serializer.serializeToString(template.content);
    this.addInnerHtmlToThis(document_fragment_string)
  }
  disconnectedCallback() { }
  static get observedAttributes() {
    return [];
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) { }
  adoptedCallback() { }
  getElementById() {
    return null;
  }

  public draw(
    landmarks: NormalizedLandmarkList,
    info: { name: string; color: string }
  ) {
    const canvasElement = this.getElementsByTagName('canvas')[0];
    const canvasCtx = canvasElement.getContext('2d')!;
    const image = this.getElementsByTagName('video')[0];

    canvasElement.height =
      (image.videoHeight * canvasElement.width) / image.videoWidth;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite existing pixels.
    canvasCtx.globalCompositeOperation = 'source-in';
    canvasCtx.fillStyle = '#00FF00';
    canvasCtx.fillRect(0, 0, canvasElement.width, canvasElement.height);

    // Only overwrite missing pixels.
    canvasCtx.globalCompositeOperation = 'destination-atop';
    canvasCtx.drawImage(image, 0, 0, canvasElement.width, canvasElement.height);

    canvasCtx.globalCompositeOperation = 'source-over';
    drawConnectors(canvasCtx, landmarks, POSE_CONNECTIONS, {
      color: '#00FF00',
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, landmarks, {
      color: '#FF0000',
      lineWidth: 2,
    });
    canvasCtx.restore();

    const nameContainer = this.getElementsByTagName('span')[0];
    nameContainer.innerText = info.name;
    nameContainer.style.backgroundColor = info.color;
  }
}

customElements.define('custom-pose-element', PoseElement);

declare global {
  interface HTMLElementTagNameMap {
    'custom-pose-element': PoseElement;
  }
}

