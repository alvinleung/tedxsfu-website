import { MotionValue, motion, useTransform } from "framer-motion";
import React from "react";
import { AnimationConfig } from "../AnimationConfig";

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
  const scale = useTransform(
    currentSpeakerSlideContinuous,
    [index - 1, index],
    [1.1, 1],
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
      style={{ scale, backgroundColor: "#050505" }}
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
};

export default SpeakerImageSlide;
