import ReactWebcam from "react-webcam"
import { FaceDetectionProps } from "./types"
import { useEffect, useRef } from "react"
import FaceDetector, { draw } from "./utils/FaceDetector"
import Webcam from "react-webcam"
import Camera from "./utils/Camera"

const FaceDetection: React.FC<Partial<FaceDetectionProps>> = (props) => {
  const { webcam, width = 640, height = 480, className } = props
  const webcamRef = useRef<Webcam>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    FaceDetector.setOptions({
      model: 'short',
      minDetectionConfidence: 0.5
    });

    if (webcamRef.current && canvasRef.current) {
      const video = webcamRef.current.video!
      const canvas = canvasRef.current!
      FaceDetector.onResults(draw(canvas))
      Camera(video, {
        onFrame: async () => {
          await FaceDetector.send({ image: video });
        },
        width,
        height
      })
    }
  }, [])

  return (
    <div {...{ className }}>
      <ReactWebcam ref={webcamRef} {...{ width, height }} {...webcam} hidden />
      <canvas ref={canvasRef} {...{ width, height }}></canvas>
    </div>
  )
}

export default FaceDetection