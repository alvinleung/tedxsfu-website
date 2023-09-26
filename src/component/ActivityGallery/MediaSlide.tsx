import { useWindowDimension } from "@/hooks/useWindowDimension";
import {
  MotionValue,
  motion,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import React, { useEffect, useMemo, useState } from "react";
import { AnimationConfig } from "../AnimationConfig";
import Image from "next/image";

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
  const variation = 15;
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
    [slideIndex - 1, slideIndex + 2],
    [BASE_SCALE, BASE_SCALE * 0.95],
    { clamp: true },
  );

  const [isFlickingGesture, setIsFlickingGesture] = useState(false);
  const [isIncrementing, setIsIncrementing] = useState(false);

  useMotionValueEvent(slideIndexContinuousValue, "change", (latest) => {
    const delta = (latest - slideIndexContinuousValue.getPrevious()) * 100;
    const flickThreshold = 5;

    if (delta > 0) {
      setIsIncrementing(true);
    } else {
      setIsIncrementing(false);
    }

    // not flicking
    if (Math.abs(delta) < flickThreshold) {
      setIsFlickingGesture(false);
      return;
    }
    setIsFlickingGesture(true);
  });

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
          duration: isFlickingGesture ? 0.2 : AnimationConfig.SLOW,
          ease: isFlickingGesture
            ? isIncrementing
              ? AnimationConfig.EASING
              : AnimationConfig.EASING_INVERTED
            : AnimationConfig.EASING_IN_OUT,
        }}
      >
        <motion.div
          className="h-full w-full"
          animate={{
            rotate:
              currentSlideIndex >= slideIndex
                ? rotation / 2
                : originalRotation / 2,
          }}
          transition={{
            duration: isFlickingGesture ? 0.2 : AnimationConfig.SLOW,
            ease: isFlickingGesture
              ? isIncrementing
                ? AnimationConfig.EASING
                : AnimationConfig.EASING_INVERTED
              : AnimationConfig.EASING_IN_OUT,
          }}
          style={{
            // opacity: isShowing ? 1 : 0,
            // rotate: rotation,
            y: showY,
            // rotate: rot,
            scale: scale,
          }}
        >
          <Image
            className="h-full w-full object-contain"
            src={src}
            width={1280}
            height={720}
            alt="past activity"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MediaSlide;
