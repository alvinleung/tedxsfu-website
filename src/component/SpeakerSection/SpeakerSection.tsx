import React, { useEffect, useMemo, useState, useTransition } from "react";
import Image from "next/image";
import {
  AnimatePresence,
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
import {
  breakpoints,
  useAllBreakpoints,
  useBreakpoint,
} from "@/hooks/useBreakpoints";
import speakers from "@/data/speakerData";
import { clamp } from "@/utils/clamp";
import PageIndicator from "../PageIndicator";
import MainGrid from "../layouts/MainGrid";
import Fixed from "../ScrollContainer/Fixed";

type Props = {};

function getFramerMotionEase(arr: number[]) {
  return cubicBezier(arr[0], arr[1], arr[2], arr[3]);
}

const SpeakerInfoModule = ({ talkTitle, name, title }: any) => (
  <>
    <div className="mb-1 text-micro-tablet uppercase tracking-wider opacity-60 md:text-micro">
      {talkTitle}
    </div>
    <hr className="col-span-full opacity-40" />
    <button className="flex w-full flex-col py-2">
      <div className="text-body">{name}</div>
      <div className="text-left text-body opacity-50">{title}</div>
    </button>
    <hr className="col-span-full mb-4 opacity-40" />
  </>
);

const SpeakerSection = (props: Props) => {
  const { scrollY } = useContainerScroll();

  const windowDim = useWindowDimension();
  const atBreakpointXL = useBreakpoint(breakpoints.xl);
  const atBreakpointLG = useBreakpoint(breakpoints.lg);
  const atBreakpointMD = useBreakpoint(breakpoints.md);
  const atBreakpointSM = useBreakpoint(breakpoints.sm);

  const [imageContainerRef, imageContainerBounds] =
    useBoundingBox<HTMLDivElement>([]);

  const endTransitionPosition = imageContainerBounds.top;

  const offsetBeforeSlide = windowDim.height < 1200 ? 1200 : windowDim.height;
  const speakerSlideHeight = 500;
  const speakerSectionScrollHeight =
    speakers.length * speakerSlideHeight + offsetBeforeSlide;
  const speakerTrailingPaddding = windowDim.height;

  const shiftY = useMemo(() => {
    if (atBreakpointXL) {
      return 1.35;
    }
    if (atBreakpointLG) {
      return 1.45;
    }

    if (atBreakpointMD) {
      return 1.2;
    }
    return 1.7;
  }, [atBreakpointXL, atBreakpointMD, atBreakpointLG]);
  const offsetY = useTransform(
    scrollY,
    [0, endTransitionPosition],
    [-endTransitionPosition * shiftY, windowDim.height * 0],
    // {
    //   ease: getFramerMotionEase(AnimationConfig.EASING),
    // },
  );

  const shiftX = useMemo(() => {
    if (atBreakpointXL) {
      return -windowDim.width * 0.08;
    }

    if (atBreakpointLG) {
      return -windowDim.width * 0.12;
    }
    if (atBreakpointMD) {
      return -windowDim.width * 0.18;
    }
    return 0;
  }, [atBreakpointXL, atBreakpointMD, atBreakpointLG]);
  const offsetX = useTransform(
    scrollY,
    [
      0,
      endTransitionPosition + 200,
      imageContainerBounds.bottom -
        speakerTrailingPaddding -
        windowDim.height / 2,
      imageContainerBounds.bottom - speakerTrailingPaddding,
    ],
    [0, shiftX, shiftX, 0],
    { ease: cubicBezier(0.92, 0, 0.6, 1.01) },
  );

  const scale = useTransform(scrollY, [0, endTransitionPosition], [2, 1], {
    // ease: getFramerMotionEase(AnimationConfig.EASING),
  });

  const [currentSpeakerSlide, setCurrentSpeakerSlide] = useState(0);
  const currentSpeakerSlideClamped = useMemo(
    () => clamp(currentSpeakerSlide, 0, speakers.length - 1),
    [currentSpeakerSlide],
  );
  useMotionValueEvent(scrollY, "change", (latest) => {
    const offsetY = latest - imageContainerBounds.top - offsetBeforeSlide;
    const currentSlide = Math.round(
      (offsetY / (speakerSectionScrollHeight - offsetBeforeSlide)) *
        speakers.length,
    );
    setCurrentSpeakerSlide(currentSlide);
  });

  const isTablet = atBreakpointSM && !atBreakpointMD;
  const scrimOpacityBeginPoint = isTablet
    ? 0
    : imageContainerBounds.bottom -
      speakerTrailingPaddding -
      windowDim.height / 2;
  const scrimOpacityEndPoint = isTablet
    ? 0
    : imageContainerBounds.bottom - speakerTrailingPaddding;
  const scrimOpacity = useTransform(
    scrollY,
    [scrimOpacityBeginPoint, scrimOpacityEndPoint],
    [0, 1],
  );

  return (
    <MainGrid className={`relative px-grid-margin-x`}>
      <div className="z-50 h-0">
        {atBreakpointSM && (
          <Sticky top={0} fadeIn fadeOut>
            <div className="flex h-[calc(100dvh-var(--grid-margin-y))] flex-col">
              <div className="mb-grid-margin-y mt-auto">
                <PageIndicator
                  totalPages={speakers.length}
                  current={currentSpeakerSlideClamped}
                />
              </div>
            </div>
          </Sticky>
        )}
      </div>

      <SectionInfo right fadeIn stickyOnMobile sticky>
        <div className="relative flex h-[calc(100dvh-var(--grid-margin-y)-115px)] flex-col md:h-[calc(100dvh-var(--grid-margin-y))]">
          <div className="h-8 md:h-[22dvh]" />
          <AnimatePresence mode="sync">
            {(atBreakpointSM || currentSpeakerSlide < 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: AnimationConfig.FAST,
                  ease: AnimationConfig.EASING,
                }}
                key="1"
              >
                <SectionInfoHeader>The Programme</SectionInfoHeader>
                <SectionInfoDescription>
                  all star speaker cast, flying in from Vancouver, San
                  Francisco, Toronto—unmask the world of Olympians, pioneers in
                  tech, and thought leaders along the West Coast.
                </SectionInfoDescription>
                <hr className="my-2  opacity-40 md:mt-8" />
                <div className="grid grid-cols-2 gap-4">
                  <h2 className="text-micro-mobile uppercase opacity-50 md:text-micro">
                    Note for 11/11
                  </h2>
                  <p className="text-micro-mobile opacity-50 md:text-micro">
                    In partnership with Honour House, 20 minutes of our program
                    will be dedicated to Remembrance Day.
                  </p>
                </div>
              </motion.div>
            )}

            {(atBreakpointSM || currentSpeakerSlide >= 0) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: AnimationConfig.FAST,
                  ease: AnimationConfig.EASING,
                }}
                key="2"
                className="absolute top-8 w-full sm:static sm:mt-auto md:translate-x-0 md:pb-grid-margin-y"
              >
                <div className="translate-x-0 pl-0 sm:translate-x-full sm:pl-4 md:translate-x-0 md:pl-0">
                  <SpeakerInfoModule
                    talkTitle={speakers[currentSpeakerSlideClamped].talkTitle}
                    name={speakers[currentSpeakerSlideClamped].name}
                    title={speakers[currentSpeakerSlideClamped].title}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </SectionInfo>

      <div
        // className="h-[500vh]"
        style={{ height: speakerSectionScrollHeight + speakerTrailingPaddding }}
      ></div>
      <div className="absolute inset-0 overflow-hidden" ref={imageContainerRef}>
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
            {/* Scrim */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 top-[60vh] z-10  w-full bg-gradient-to-t from-black "
              style={{ opacity: scrimOpacity }}
            />
            <div className="relative h-screen w-full translate-y-[26vh] scale-[1.2] sm:translate-y-[25vh] sm:scale-[1] md:translate-y-[5vh] xl:translate-y-[20vh] xl:scale-[1.25] 2xl:scale-[1.4]">
              {/* scrim */}
              {speakers.map((speaker, index) => {
                if (index === 0) {
                  return (
                    <motion.img
                      key={index}
                      src={speaker.portraits[0]}
                      width={1920}
                      height={1080}
                      alt={speaker.name}
                      className="h-screen w-screen object-cover object-center sm:object-contain"
                      animate={{
                        opacity: index === currentSpeakerSlideClamped ? 1 : 0,
                        // y:
                        //   index >= currentSpeakerSlide
                        //     ? 50
                        //     : index == currentSpeakerSlide
                        //     ? 0
                        //     : -50,
                      }}
                      transition={{
                        duration: AnimationConfig.FAST,
                      }}
                    />
                  );
                }

                return (
                  <motion.img
                    key={index}
                    className="absolute inset-0 h-screen w-screen object-cover object-center sm:object-contain"
                    src={speaker.portraits[0]}
                    width={1920}
                    height={1080}
                    alt={speaker.name}
                    animate={{
                      opacity: index === currentSpeakerSlideClamped ? 1 : 0,
                      // y:
                      //   index >= currentSpeakerSlide
                      //     ? 50
                      //     : index == currentSpeakerSlide
                      //     ? 0
                      //     : -50,
                    }}
                    transition={{
                      duration: AnimationConfig.FAST,
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </Sticky>
      </div>
    </MainGrid>
  );
};

export default SpeakerSection;
