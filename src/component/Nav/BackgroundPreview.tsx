import { AnimatePresence, motion } from "framer-motion";
import React from "react";
import Image from "next/image";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  selected: string;
  hasTransitionBegan: boolean;
};

const BackgroundPreview = ({ selected, hasTransitionBegan }: Props) => {
  return (
    <motion.div className="bg-black">
      <motion.div
        className="relative left-0 h-full w-full overflow-hidden bg-black"
        animate={{
          opacity: hasTransitionBegan ? 1 : 0.5,
          scale: hasTransitionBegan ? 1 : 1.1,
        }}
        transition={{
          duration: AnimationConfig.VERY_SLOW,
          ease: AnimationConfig.EASING_IN_OUT,
          delay: 0.5,
        }}
      >
        <VideoBackground active={selected === "/"} />
        <ImageBackground active={selected === "/about"} />
      </motion.div>
    </motion.div>
  );
};

const VideoBackground = ({ active = false }) => {
  return (
    <motion.video
      src="./website-transition-graphic.webm"
      aria-description="video"
      className="absolute top-0 h-[100dvh] object-cover"
      width={2560}
      height={1440}
      muted
      loop
      autoPlay
      initial={{
        opacity: 0,
        y: 100,
      }}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 20,
      }}
      exit={{
        opacity: 1,
      }}
      transition={{
        duration: AnimationConfig.VERY_SLOW,
        ease: AnimationConfig.EASING,
      }}
    />
  );
};

const ImageBackground = ({ active = false }) => {
  return (
    <motion.div
      // style={{scale: 1.1}}
      className="origin-top overflow-hidden"
      style={{
        // only scale the last one
        scale: 1.125,
      }}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: active ? 1 : 0,
        y: active ? 0 : 20,
      }}
      exit={{
        opacity: 1,
      }}
      transition={{
        duration: AnimationConfig.VERY_SLOW,
        ease: AnimationConfig.EASING,
      }}
    >
      <Image
        src="/about/about-2.jpg"
        className="h-[100dvh] object-cover"
        width={2560}
        height={1440}
        alt="TEDxSFU conference"
      />
    </motion.div>
  );
};

export default BackgroundPreview;
