const WebcamBuilder = (video?: HTMLVideoElement): Promise<HTMLVideoElement> => {
  video = video ?? document.createElement('video');
  return new Promise((resolve, reject) => {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices) => {
        devices.forEach((device) => {
          if (device.kind == 'videoinput') {
            navigator.mediaDevices
              .getUserMedia({
                video: {
                  width: { ideal: 1920 },
                  height: { ideal: 1080 },
                  deviceId: { exact: device.deviceId },
                },
                audio: false,
              })
              .then((stream) => {
                video.srcObject = stream;
                resolve(video);
              })
              .catch((error) => {
                alert("Can't use Webcam");
                reject();
              });
          }
        });
      })
      .catch((err) => {
        console.error(`${err.name}: ${err.message}`);
      });
  });
};

export default WebcamBuilder;
