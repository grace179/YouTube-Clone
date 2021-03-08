const recorderContainer = document.getElementById("jsRecorderContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObj;
let videoRecoder;

const handleVideoData = (event) => {
  console.log(event.data);
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopStreamedVideo = (videoElem) => {
  const streamedVideo = videoElem.srcObject;
  const tracks = streamedVideo.getTracks();

  tracks.forEach((track) => {
    track.stop();
  });
  videoElem.srcObject = null;
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
  stopStreamedVideo(videoPreview);
};

const startRecording = () => {
  // console.log(streamObj);
  videoRecorder = new MediaRecorder(streamObj);
  videoRecorder.start();
  // console.log(videoRecorder);
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 },
    });
    // console.log(stream);
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObj = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "😅Cant record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recorderContainer) {
  init();
}
