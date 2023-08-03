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
    [-100, 100]
  );

  return (
    <motion.img
      ref={imgRef}
      src={src}
      className="h-[100vh] object-cover"
      width={2560}
      height={1440}
      alt="Picture of the author"
      style={{
        y: offset,
        scale: 1.1,
      }}
    />
  );
};

export default ImageSlide;
