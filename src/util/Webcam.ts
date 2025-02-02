const WebcamBuilder = (video?: HTMLVideoElement): Promise<HTMLVideoElement> => {
  video = video ?? document.createElement('video');
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ video: true }).then(() => {
      navigator.mediaDevices
        .enumerateDevices()
        .then((devices) => {
          devices.forEach((device) => {
            if (device.kind == 'videoinput') {
              navigator.mediaDevices
                .getUserMedia({
                  video: {
                    width: { ideal: 540 },
                    height: { ideal: 540 },
                    deviceId: { exact: device.deviceId },
                  },
                })
                .then((stream) => {
                  //@ts-ignore
                  video.srcObject = stream;
                  //@ts-ignore
                  resolve(video);
                })
                .catch((error) => {
                  console.error(error);
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
  });
};

export default WebcamBuilder;
