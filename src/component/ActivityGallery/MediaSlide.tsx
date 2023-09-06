import { useWindowDimension } from "@/hooks/useWindowDimension";
import { MotionValue, motion, useTransform } from "framer-motion";
import React, { useMemo } from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  src: string;
  currentSlideIndex: number;
  slideCount: number;
  slideIndex: number;
  slideIndexContinuousValue: MotionValue;
};

const MediaSlide = ({
  src,
  currentSlideIndex,
  slideIndex,
  slideCount,
  slideIndexContinuousValue,
}: Props) => {
  const variation = 7;
  const rotation = useMemo(() => variation / 2 - Math.random() * variation, []);

  const isShowing = currentSlideIndex >= slideIndex;

  const windowDim = useWindowDimension();
  const originalX = useMemo(() => 0, []);
  const originalY = useMemo(() => windowDim.height * 1.2, [windowDim.height]);

  const rotVariation = 180;
  const originalRotation = useMemo(
    () => Math.random() * rotVariation - rotVariation / 3,
    [],
  );

  const BASE_SCALE = 0.95;

  const showY = useTransform(
    slideIndexContinuousValue,
    [slideIndex - 2, slideIndex - 0.5],
    [originalY * 0.5, 0],
  );
  const rot = useTransform(
    slideIndexContinuousValue,
    [slideIndex - 2, slideIndex - 1],
    [0, 0],
  );
  const scale = useTransform(
    slideIndexContinuousValue,
    [slideIndex, slideIndex + 1],
    [BASE_SCALE, BASE_SCALE * 0.95],
    { clamp: true },
  );

  return (
    <div className="absolute top-0 flex h-[60vh] w-full items-center justify-center">
      <motion.div
        animate={{
          y: isShowing ? 0 : originalY * 0.5,

          scale:
            currentSlideIndex >= slideIndex
              ? BASE_SCALE - (currentSlideIndex - slideIndex) * 0.02
              : BASE_SCALE,
        }}
        className="mx-auto h-full w-full"
        transition={{
          duration: AnimationConfig.NORMAL,
          ease: AnimationConfig.EASING_IN_OUT,
        }}
      >
        <motion.img
          src={src}
          animate={{
            rotate:
              currentSlideIndex >= slideIndex
                ? rotation / 2
                : originalRotation / 2,
          }}
          transition={{
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING_IN_OUT,
          }}
          className="mx-auto h-full w-full object-contain"
          style={{
            // opacity: isShowing ? 1 : 0,
            // rotate: rotation,
            y: showY,
            // rotate: rot,
            scale: scale,
          }}
        />
      </motion.div>
    </div>
  );
};

export default MediaSlide;
