import {
  FaceDetection,
  NormalizedLandmarkList,
  NormalizedRect,
  Results,
} from "@mediapipe/face_detection";
import * as drawingUtils from "@mediapipe/drawing_utils";

const faceDetection = new FaceDetection({
  locateFile: (file) =>
    `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`,
});

export function draw(canvasElement: HTMLCanvasElement) {
  return (results: Results) => {
    const canvasCtx = canvasElement.getContext("2d")!;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height
    );
    if (results.detections.length > 0) {
      drawRect(canvasCtx, results.detections[0].boundingBox);
      drawLandmarks(canvasCtx, results.detections[0].landmarks);
    }
    canvasCtx.restore();
  };
}

export function drawRect(ctx: CanvasRenderingContext2D, box: NormalizedRect) {
  drawingUtils.drawRectangle(ctx, box, {
    color: "blue",
    lineWidth: 2,
    fillColor: "#00000000",
  });
}

export function drawLandmarks(
  ctx: CanvasRenderingContext2D,
  landmark: NormalizedLandmarkList
) {
  drawingUtils.drawLandmarks(ctx, landmark, {
    color: "red",
    radius: 2,
  });
}

export default faceDetection;
