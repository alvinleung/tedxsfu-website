import { useWindowDimension } from "@/hooks/useWindowDimension";
import { motion } from "framer-motion";
import React, { useMemo } from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  src: string;
  currentSlideIndex: number;
  slideCount: number;
  slideIndex: number;
};

const MediaSlide = ({
  src,
  currentSlideIndex,
  slideIndex,
  slideCount,
}: Props) => {
  const variation = 7;
  const rotation = useMemo(() => variation / 2 - Math.random() * variation, []);

  const isShowing = currentSlideIndex >= slideIndex;

  const windowDim = useWindowDimension();
  const originalX = useMemo(() => 0, []);
  const originalY = useMemo(() => windowDim.height * 1.2, [windowDim.height]);

  const rotVariation = 180;
  const originalRotation = useMemo(
    () => Math.random() * rotVariation - rotVariation / 2,
    [],
  );

  const BASE_SCALE = 0.95;

  return (
    <div className="absolute top-0 flex h-[60vh] w-full items-center justify-center">
      <motion.img
        src={src}
        className="mx-auto h-full w-full object-contain"
        style={
          {
            // opacity: isShowing ? 1 : 0,
            // rotate: rotation,
          }
        }
        animate={{
          scale:
            currentSlideIndex >= slideIndex
              ? BASE_SCALE - (currentSlideIndex - slideIndex) * 0.05
              : BASE_SCALE,
          // opacity: currentSlideIndex < slideIndex ? 1 : 0,
          x: isShowing ? 0 : originalX,
          y: isShowing ? 0 : originalY,
          rotate: currentSlideIndex >= slideIndex ? rotation : originalRotation,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
      />
    </div>
  );
};

export default MediaSlide;
