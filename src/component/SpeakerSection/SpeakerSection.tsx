import React, { useEffect, useState, useTransition } from "react";
import Image from "next/image";
import {
  cubicBezier,
  motion,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";
import Sticky from "../ScrollContainer/Sticky";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import {
  SectionInfo,
  SectionInfoDescription,
  SectionInfoHeader,
} from "../layouts/SectionLayouts";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import speakers from "@/data/speakerData";
import { clamp } from "@/utils/clamp";
import PageIndicator from "../PageIndicator";

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

  const offsetBeforeSlide = windowDim.height;
  const speakerSlideHeight = 1000;
  const speakerSectionScrollHeight =
    speakers.length * speakerSlideHeight + offsetBeforeSlide;

  // console.log(speakerSectionScrollHeight);
  const atBreakpointXL = useBreakpoint(breakpoints.xl);

  const shiftY = atBreakpointXL ? 1.45 : 1.4;
  const offsetY = useTransform(
    scrollY,
    [0, endTransitionPosition],
    [-endTransitionPosition * shiftY, windowDim.height * 0],
    // {
    //   ease: getFramerMotionEase(AnimationConfig.EASING),
    // },
  );

  const shiftX = atBreakpointXL
    ? -windowDim.width * 0.08
    : -windowDim.width * 0.1;
  const offsetX = useTransform(
    scrollY,
    [0, endTransitionPosition + 200],
    [0, shiftX],
    { ease: cubicBezier(0.92, 0, 0.6, 1.01) },
  );

  const scale = useTransform(scrollY, [0, endTransitionPosition], [2, 1], {
    // ease: getFramerMotionEase(AnimationConfig.EASING),
  });

  const [currentSpeakerSlide, setCurrentSpeakerSlide] = useState(0);
  useMotionValueEvent(scrollY, "change", (latest) => {
    const offsetY = latest - imageContainerBounds.top - offsetBeforeSlide;
    const currentSlide = Math.round(
      (offsetY / (speakerSectionScrollHeight - offsetBeforeSlide)) *
        speakers.length,
    );
    const currentSlideClamped = clamp(currentSlide, 0, speakers.length - 1);
    setCurrentSpeakerSlide(currentSlideClamped);
  });

  // console.log(currentSpeakerSlide);

  return (
    <>
      <Sticky top={0} fadeIn fadeOut>
        <div className="flex h-[calc(100dvh-var(--grid-margin-y))] flex-col">
          <div className="z-50 mb-grid-margin-y mt-auto">
            <PageIndicator
              totalPages={speakers.length}
              current={currentSpeakerSlide}
            />
          </div>
        </div>
      </Sticky>

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
            <div className="mb-1 text-micro-tablet uppercase opacity-50 md:text-micro">
              {speakers[currentSpeakerSlide].talkTitle}
            </div>
            <hr className="col-span-full opacity-50" />
            <button className="flex w-full flex-col py-2">
              <div className="text-body">
                {speakers[currentSpeakerSlide].name}
              </div>
              <div className="text-body opacity-50">
                {speakers[currentSpeakerSlide].title}
              </div>
            </button>
            <hr className="col-span-full mb-4 opacity-50" />
            {/* <div>See all Speakers</div> */}
          </div>
        </div>
      </SectionInfo>
      <div
        // className="h-[500vh]"
        style={{ height: speakerSectionScrollHeight }}
      ></div>
      <div
        className="absolute inset-0  overflow-hidden"
        ref={imageContainerRef}
      >
        <Sticky top={0}>
          <motion.div
            className="h-screen w-screen"
            style={{
              scale: scale,
              y: offsetY,
              x: offsetX,
              transformOrigin: "top",
            }}
          >
            <div className="relative translate-y-[25vh] scale-150">
              {speakers.map((speaker, index) => {
                if (index === 0) {
                  return (
                    <motion.img
                      key={index}
                      src={speaker.portraits[0]}
                      width={1920}
                      height={1080}
                      alt={speaker.name}
                      className="h-screen object-contain object-top"
                      animate={{
                        opacity: index === currentSpeakerSlide ? 1 : 0,
                        // y:
                        //   index >= currentSpeakerSlide
                        //     ? 50
                        //     : index == currentSpeakerSlide
                        //     ? 0
                        //     : -50,
                      }}
                      transition={{
                        duration: AnimationConfig.NORMAL,
                      }}
                    />
                  );
                }

                return (
                  <motion.img
                    key={index}
                    className="absolute inset-0 h-screen object-contain object-top"
                    src={speaker.portraits[0]}
                    width={1920}
                    height={1080}
                    alt={speaker.name}
                    animate={{
                      opacity: index === currentSpeakerSlide ? 1 : 0,
                      // y:
                      //   index >= currentSpeakerSlide
                      //     ? 50
                      //     : index == currentSpeakerSlide
                      //     ? 0
                      //     : -50,
                    }}
                    transition={{
                      duration: AnimationConfig.NORMAL,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </Sticky>
      </div>
    </>
  );
};

export default SpeakerSection;
