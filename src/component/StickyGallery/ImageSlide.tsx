import React from "react";
import Image from "next/image";
import { MotionValue, motion, useTransform } from "framer-motion";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useBoundingBox } from "@/hooks/useBoundingBox";

type Props = {
  src: string;
};

const ImageSlide = ({ src }: Props) => {
  const { scrollY } = useContainerScroll();
  const [imgRef, imgBounds] = useBoundingBox<HTMLImageElement>([]);
  const offset = useTransform(
    scrollY,
    [imgBounds.top, imgBounds.bottom],
    [0, 200],
  );

  return (
    <motion.div
      className="origin-top bg-black"
      initial={{
        scale: 1.125,
      }}
      style={{
        y: offset,
      }}
    >
      <Image
        ref={imgRef}
        src={src}
        className="h-[100dvh] object-cover"
        width={2560}
        height={1440}
        alt="Picture of the author"
      />
    </motion.div>
  );
};

export default ImageSlide;
