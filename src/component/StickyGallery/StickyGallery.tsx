import React, { useEffect, useState } from "react";
import Image from "next/image";
import StickyContainer from "../ScrollContainer/StickyContainer";
import Sticky from "../ScrollContainer/Sticky";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { motion, useTransform } from "framer-motion";
import ImageSlide from "./ImageSlide";
import { AnimationConfig } from "../AnimationConfig";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import MainGrid from "../layouts/MainGrid";

type Props = {};

const imgData = [
  {
    src: "/about/about-5.jpg",
    date: "Conference",
    year: "2017",
    description: "Conversation with john. (temp copy)",
  },
  {
    src: "/about/about-6.jpg",
    date: "Conference",
    year: "2019",
    description:
      'Tom delivering "Thriving Through Turbulent Times". (temp copy)',
  },
  {
    src: "/about/about-3.jpg",
    date: "Conference",
    year: "2021",
    description: "Conversation with john. (temp copy)",
  },
  {
    src: "/about/about-4.jpg",
    date: "Conference",
    year: "2021",
    description:
      "Engaging with SFU’s community at clubs day, summer 2023. (temp copy)",
  },
];

const StickyGallery = (props: Props) => {
  const { scrollY } = useContainerScroll();

  const windowDim = useWindowDimension();
  const [boundsRef, bounds] = useBoundingBox<HTMLDivElement>([]);

  const zoomLockStartPosition = bounds.top;
  const zoomLockEndPosition = bounds.bottom - windowDim.height;

  const scale = useTransform(
    scrollY,
    [
      0,
      zoomLockStartPosition,
      zoomLockEndPosition - zoomLockStartPosition,
      zoomLockEndPosition,
    ],
    [
      1,
      1 + 1 - bounds.width / windowDim.width + 0.01,
      1 + 1 - bounds.width / windowDim.width + 0.01,
      1,
    ],
  );

  const containerOffset = useTransform(scrollY, (v) => {
    if (v < zoomLockStartPosition) return 0;
    if (v > zoomLockEndPosition)
      return zoomLockEndPosition - zoomLockStartPosition;
    const offset = v - zoomLockStartPosition;
    return offset;
  });

  const contentOffsetY = useTransform(containerOffset, (v) => {
    return -v;
  });

  // const inverseScale = useTransform(scale, (v) => -v);

  return (
    <motion.div className="col-span-full col-start-1 h-[400vh]" ref={boundsRef}>
      <motion.div
        className="h-[100vh] overflow-hidden bg-black"
        style={{
          y: containerOffset,
          scale: scale,
        }}
      >
        <motion.div
          style={{
            y: contentOffsetY,
          }}
        >
          {imgData.map((image, i) => {
            return (
              <div className="relative h-[100vh] overflow-hidden" key={i}>
                <ImageSlide src={image.src} />
                <MainGrid className="absolute bottom-8 text-white">
                  <div className="px-4 text-micro opacity-50 md:col-start-2 md:px-0  lg:col-span-1 lg:col-start-2">
                    <div>{image.date}</div>
                    <div>{image.year}</div>
                  </div>
                  <div className="col-span-3 col-start-2 border-l border-l-[rgba(255,255,255,.5)] pl-2 pr-4 text-micro md:col-span-2 md:pr-0 lg:col-span-1">
                    {" "}
                    {image.description}
                  </div>
                </MainGrid>
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default StickyGallery;
