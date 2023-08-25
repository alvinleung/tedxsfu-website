import { useWindowDimension } from "@/hooks/useWindowDimension";
import { motion } from "framer-motion";
import React, { useMemo } from "react";

type Props = {
  src: string;
  currentSlideIndex: number;
  slideIndex: number;
};

const MediaSlide = ({ src, currentSlideIndex, slideIndex }: Props) => {
  const variation = 5;
  const rotation = useMemo(() => variation / 2 - Math.random() * variation, []);

  const isShowing = currentSlideIndex >= slideIndex;

  const windowDim = useWindowDimension();
  const posVariationX = windowDim.width;
  const posVariationY = windowDim.height;
  const originalX = useMemo(
    () => (posVariationX / 2 - Math.random() * posVariationX) * 2,
    [],
  );
  const originalY = useMemo(
    () => (posVariationY / 2 - Math.random() * posVariationY) * 2,
    [],
  );

  return (
    <div className="absolute top-0 flex h-[60vh] w-full items-center justify-center">
      <motion.img
        src={src}
        className="mx-auto h-full w-full object-contain"
        style={{
          opacity: isShowing ? 1 : 0,
          rotate: rotation,
        }}
        animate={
          {
            // x: isShowing ? 0 : originalX,
            // y: isShowing ? 0 : originalY,
            // rotate: isShowing ? rotation : 0,
            // transition: {
            //   bounceDamping: 40,
            // },
          }
        }
      />
    </div>
  );
};

export default MediaSlide;
