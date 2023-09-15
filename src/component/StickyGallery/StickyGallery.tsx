import React, { useEffect, useMemo, useState } from "react";
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
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";

type Props = {};

const imgData = [
  // {
  //   src: "/about/about-5.jpg",
  //   date: "Conference",
  //   year: "2017",
  //   description: "Conversation with john. (temp copy)",
  // },
  {
    src: "/about/about-2.jpg",
    date: "Conference",
    year: "2016",
    description: "Excitement and anticipation during the intermission",
  },
  {
    src: "/about/about-4.jpg",
    date: "Conference",
    year: "2019",
    description: "Energizing the crowd with local dancer, Bettina Rothe",
  },
  {
    src: "/about/about-6.jpg",
    date: "Conference",
    year: "2015",
    description: "Unpacking hope in health with neuroscientist, Ryan D’Arcy",
  },
];

const StickyGallery = (props: Props) => {
  const { scrollY, hasScrolled } = useContainerScroll();

  const windowDim = useWindowDimension();
  const [boundsRef, bounds] = useBoundingBox<HTMLDivElement>([]);

  const zoomLockStartPosition = bounds.top;
  const zoomLockEndPosition = bounds.bottom - windowDim.height;

  // const fullScreenScale = 1.1;

  // breakpoint
  const atBreakpointSM = useBreakpoint(breakpoints.sm);
  const atBreakpointMD = useBreakpoint(breakpoints.md);
  const marginWidth = useMemo(
    () => (atBreakpointSM ? 32 : 16),
    [atBreakpointSM],
  );

  const shrinkedScale = (windowDim.width - marginWidth * 2) / windowDim.width;
  // const fullScreenScale = 1 + 1 - bounds.width / windowDim.width + 0.015;
  // const fullScreenScaleCSS = "calc(1+ 1-100%/100vw + 0.015)";

  const scale = useTransform(
    scrollY,
    [
      0,
      zoomLockStartPosition,
      zoomLockEndPosition,
      zoomLockEndPosition + windowDim.height / 3,
    ],
    [1, 1, 1, shrinkedScale],
  );

  //  const wideScale = 1 + 1 - bounds.width / windowDim.width + 0.01;

  //  const scale = useTransform(
  //    scrollY,
  //    [
  //      0,
  //      zoomLockStartPosition,
  //      zoomLockEndPosition - zoomLockStartPosition,
  //      zoomLockEndPosition,
  //    ],
  //    [1, wideScale, wideScale, 1],
  //  );

  // const containerOffset = useTransform(scrollY, (v) => {
  //   if (v < zoomLockStartPosition) return 0;
  //   if (v > zoomLockEndPosition)
  //     return zoomLockEndPosition - zoomLockStartPosition;
  //   const offset = v - zoomLockStartPosition;
  //   return offset;
  // });

  // const contentOffsetY = useTransform(containerOffset, (v) => {
  //   return -v;
  // });

  // const inverseScale = useTransform(scale, (v) => -v);

  return (
    <motion.div
      className="col-span-full col-start-1 h-[300dvh]"
      ref={boundsRef}
    >
      {imgData.map((image, i) => {
        return (
          <div className="relative h-[100dvh]" key={i}>
            <motion.div
              className="origin-bottom overflow-hidden"
              style={{
                // only scale the last one
                scale: imgData.length - 1 === i ? scale : 1,
              }}
              key={i}
            >
              <ImageSlide src={image.src} />
            </motion.div>
            <MainGrid className="absolute bottom-6 px-grid-margin-x text-white sm:bottom-8">
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: hasScrolled || atBreakpointMD ? 0.5 : 0,
                  transition: {
                    duration: !atBreakpointMD
                      ? AnimationConfig.NORMAL
                      : AnimationConfig.SLOW,
                    delay: atBreakpointMD ? 0.5 : 0,
                  },
                }}
                className="px-grid-margin-x text-micro opacity-50 md:col-start-2 md:px-0  lg:col-span-1 lg:col-start-2"
              >
                <div>{image.date}</div>
                <div>{image.year}</div>
              </motion.div>
              <motion.div
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: hasScrolled || atBreakpointMD ? 1 : 0,
                  transition: {
                    duration: !atBreakpointMD
                      ? AnimationConfig.NORMAL
                      : AnimationConfig.SLOW,
                    delay: atBreakpointMD ? 0.3 : 0,
                  },
                }}
                className="col-span-3 col-start-2 border-l border-l-[rgba(255,255,255,.5)] pl-2 pr-4 text-micro sm:col-span-2 md:col-span-2 md:pr-0 lg:col-span-1"
              >
                {" "}
                {image.description}
              </motion.div>
            </MainGrid>
          </div>
        );
      })}
    </motion.div>
  );
};

export default StickyGallery;
