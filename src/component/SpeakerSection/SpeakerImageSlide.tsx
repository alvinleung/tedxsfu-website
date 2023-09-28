import { MotionValue, motion, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { AnimationConfig } from "../AnimationConfig";
import { getFramerMotionEase } from "@/utils/getFramerMotionEase";
import { useEventListener } from "usehooks-ts";
import SpeakerImageSlideCursor from "./SpeakerImageSlideCursor";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import Image from "next/image";

type Props = {
  index: number;
  speaker: any;
  currentSpeakerSlideClamped: number;
  currentSpeakerSlideContinuous: MotionValue;
  canShufflePhoto: boolean;
  onCurrentPhotoChange: (photo: number) => void;
};

const SpeakerImageSlide = ({
  index,
  speaker,
  currentSpeakerSlideClamped,
  currentSpeakerSlideContinuous,
  onCurrentPhotoChange,
  canShufflePhoto,
}: Props) => {
  const atBreakpointSM = useBreakpoint(breakpoints.sm);
  const scale = useTransform(
    currentSpeakerSlideContinuous,
    [index, index + 2],
    [1, atBreakpointSM ? 1.07 : 1],
    { clamp: false },
  );
  const y = useTransform(
    currentSpeakerSlideContinuous,
    [index, index + 2],
    [atBreakpointSM ? 0 : 70, atBreakpointSM ? 10 : -70],
    { clamp: false },
    // { ease: getFramerMotionEase(AnimationConfig.EASING), clamp: false },
  );

  const isCurrentSpeaker = currentSpeakerSlideClamped === index;

  const [currentPhoto, setCurrentPhoto] = useState(0);
  const nextPhoto = () => {
    if (!canShufflePhoto) return;

    const nextPhotoAttempt = currentPhoto + 1;
    const nextPhotoResult =
      nextPhotoAttempt >= speaker.portraits.length ? 0 : nextPhotoAttempt;
    setCurrentPhoto(nextPhotoResult);
    onCurrentPhotoChange(nextPhotoResult);
  };

  useEffect(() => {
    if (isCurrentSpeaker) {
      onCurrentPhotoChange(currentPhoto);
    }
  }, [isCurrentSpeaker]);

  // useEventListener("click", () => {
  //   if (isCurrentSpeaker) {
  //     nextPhoto();
  //   }
  // });

  const portraitSrc = speaker.portraits[0];

  return (
    <motion.div
      className={
        index === 0
          ? "h-screen w-screen"
          : "absolute inset-0 h-screen w-screen "
      }
      style={{
        scale,
        y,
        backgroundColor: "#050505",
        // opacity: index === currentSpeakerSlideClamped ? 1 : 0,
      }}
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
      key={index}
    >
      <Image
        className={
          "h-screen w-screen object-cover object-center sm:object-contain"
        }
        placeholder="blur"
        onClick={() => nextPhoto()}
        src={portraitSrc}
        width={1920}
        height={1080}
        alt={speaker.name}
        // match parmida background
      />
    </motion.div>
  );
};

export default SpeakerImageSlide;
