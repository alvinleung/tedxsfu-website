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
    blurHash:
      "data:image/webp;base64,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",
  },
  {
    src: "/about/about-4.jpg",
    date: "Conference",
    year: "2019",
    description: "Energizing the crowd with local dancer, Bettina Rothe",
    blurHash:
      "data:image/webp;base64,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",
  },
  {
    src: "/about/about-6.jpg",
    date: "Conference",
    year: "2015",
    description: "Unpacking hope in health with neuroscientist, Ryan D’Arcy",
    blurHash:
      "data:image/webp;base64,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",
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
              <ImageSlide src={image.src} blurHash={image.blurHash} />
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
