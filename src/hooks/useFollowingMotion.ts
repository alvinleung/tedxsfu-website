import { MotionValue, useMotionValueEvent } from "framer-motion";
import { useRef } from "react";

interface FollowMotionArgs {
  target: MotionValue;
  current: MotionValue;
  stopThreshold?: number;
}
export function useFollowMotion({
  target,
  current,
  stopThreshold = 0.1,
}: FollowMotionArgs) {
  const frameUpdateAnimFrame = useRef(0);
  const isAnimating = useRef(false);

  const performFrameUpdate = () => {
    isAnimating.current = true;

    const currentScrollY = current.get();
    const offset = (target.get() - currentScrollY) * 0.15;

    if (Math.abs(offset) > stopThreshold) {
      current.set(currentScrollY + offset);

      // next frame
      frameUpdateAnimFrame.current = requestAnimationFrame(performFrameUpdate);
      return;
    }

    isAnimating.current = false;
    current.set(target.get());
  };

  useMotionValueEvent(target, "change", (v) => {
    if (isAnimating.current) return;
    performFrameUpdate();
  });
}
