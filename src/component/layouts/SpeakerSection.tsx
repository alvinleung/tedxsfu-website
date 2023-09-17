import React, { useTransition } from "react";
import Image from "next/image";
import { cubicBezier, motion, useTransform } from "framer-motion";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";
import Sticky from "../ScrollContainer/Sticky";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import {
  SectionInfo,
  SectionInfoDescription,
  SectionInfoHeader,
} from "./SectionLayouts";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";

type Props = {};

function getFramerMotionEase(arr: number[]) {
  return cubicBezier(arr[0], arr[1], arr[2], arr[3]);
}

const SpeakerSection = (props: Props) => {
  const { scrollY } = useContainerScroll();

  const windowDim = useWindowDimension();

  const [imageContainerRef, imageContainerBounds] =
    useBoundingBox<HTMLDivElement>([]);

  const endTransitionPosition = imageContainerBounds.top;

  const offsetY = useTransform(
    scrollY,
    [0, endTransitionPosition],
    [-windowDim.height * 0.8, windowDim.height * 0.1],
    // {
    //   ease: getFramerMotionEase(AnimationConfig.EASING),
    // },
  );

  const atBreakpointXL = useBreakpoint(breakpoints.xl);
  const shiftX = atBreakpointXL ? 0 : -windowDim.width * 0.1;
  const offsetX = useTransform(
    scrollY,
    [0, endTransitionPosition],
    [0, shiftX],
    { ease: getFramerMotionEase(AnimationConfig.EASING) },
  );
  const scale = useTransform(scrollY, [0, endTransitionPosition], [1, 0.6], {
    // ease: getFramerMotionEase(AnimationConfig.EASING),
  });

  return (
    <>
      <SectionInfo right fadeIn>
        <div className="flex h-[calc(100dvh-var(--grid-margin-y))] flex-col">
          <div className="h-[22dvh]" />
          <SectionInfoHeader>The Programme</SectionInfoHeader>
          <SectionInfoDescription>
            all star speaker cast, flying in from Vancouver, San Francisco,
            Toronto—unmask the world of Olympians, pioneers in tech, and thought
            leaders along the West Coast.
          </SectionInfoDescription>
          <hr className="col-span-full my-2 mt-8 opacity-50" />
          <div className="col-span-full grid grid-cols-2 gap-4">
            <h2 className="text-micro-mobile uppercase opacity-50 md:text-micro">
              Note for 11/11
            </h2>
            <p className="text-micro-mobile opacity-50 md:text-micro">
              In partnership with Honour House, 20 minutes of our program will
              be dedicated to Remembrance Day.
            </p>
          </div>

          <div className="mt-auto pb-grid-margin-y">
            <div className="mb-1 text-micro uppercase opacity-50">
              Unmask AI
            </div>
            <hr className="col-span-full opacity-50" />
            <div className="flex flex-row gap-4 py-2">
              <div className="flex-grow">Parmida Beigi</div>
              <div className="flex-grow opacity-50">Amazon AI Tech Lead</div>
            </div>
            <hr className="col-span-full mb-4 opacity-50" />
            <div>See all Speakers</div>
          </div>
        </div>
      </SectionInfo>
      <div className="h-[500vh]"></div>
      <div className="absolute inset-0 overflow-hidden" ref={imageContainerRef}>
        <Sticky top={0}>
          <motion.img
            src="/speaker-section/parmida-1.jpg"
            width={1920}
            height={1080}
            alt={""}
            style={{
              scale: scale,
              y: offsetY,
              x: offsetX,
              transformOrigin: "top",
            }}
          />
        </Sticky>
      </div>
    </>
  );
};

export default SpeakerSection;
