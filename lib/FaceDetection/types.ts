import { WebcamProps } from "react-webcam";

export type FaceDetectionProps = {
  width: number;
  height: number;
  className: string;
  webcam?: Omit<WebcamProps, "children" | "ref">;
};
