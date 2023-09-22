import { cubicBezier } from "framer-motion";

export function getFramerMotionEase(arr: number[]) {
  return cubicBezier(arr[0], arr[1], arr[2], arr[3]);
}
