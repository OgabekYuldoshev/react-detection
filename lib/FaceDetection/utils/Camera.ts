import { Camera, CameraOptions } from "@mediapipe/camera_utils";

export default function (
  videoElement: HTMLVideoElement,
  options: CameraOptions
) {
  const camera = new Camera(videoElement!, options);
  camera.start();
  return camera;
}
