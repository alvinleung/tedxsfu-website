import { MotionValue, motion, useTransform } from "framer-motion";
import React from "react";
import { AnimationConfig } from "../AnimationConfig";
import { getFramerMotionEase } from "@/utils/getFramerMotionEase";

type Props = {
  index: number;
  speaker: any;
  currentSpeakerSlideClamped: number;
  currentSpeakerSlideContinuous: MotionValue;
};

const SpeakerImageSlide = ({
  index,
  speaker,
  currentSpeakerSlideClamped,
  currentSpeakerSlideContinuous,
}: Props) => {
  const y = useTransform(
    currentSpeakerSlideContinuous,
    [index, index + 2],
    [0, -30],
    // { ease: getFramerMotionEase(AnimationConfig.EASING), clamp: false },
  );

  return (
    <motion.img
      key={index}
      className={
        index === 0
          ? "h-screen w-screen object-cover object-center sm:object-contain"
          : "absolute inset-0 h-screen w-screen object-cover object-center sm:object-contain"
      }
      src={speaker.portraits[0]}
      width={1920}
      height={1080}
      alt={speaker.name}
      // match parmida background
      style={{
        y,
        backgroundColor: "#050505",
        opacity: index === currentSpeakerSlideClamped ? 1 : 0,
      }}
      animate={
        {
          // opacity: index === currentSpeakerSlideClamped ? 1 : 0,
          // y:
          //   index >= currentSpeakerSlide
          //     ? 50
          //     : index == currentSpeakerSlide
          //     ? 0
          //     : -50,
        }
      }
      transition={{
        duration: AnimationConfig.FAST,
      }}
    />
  );
};

export default SpeakerImageSlide;
