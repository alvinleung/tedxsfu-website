import { useMousePosition } from "@/hooks/useMousePosition";
import { motion } from "framer-motion";
import React from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  total: number;
  current: number;
  active: boolean;
};

const SpeakerImageSlideCursor = ({ total, current, active }: Props) => {
  const mouse = useMousePosition();

  return (
    <motion.div
      className="pointer-events-none absolute left-0 top-0 "
      animate={{
        opacity: active ? 1 : 0,
        x: mouse.x,
        y: mouse.y + 20,
        // display: active ? "block" : "none",
        zIndex: 1000,
        transition: {
          duration: 0.3,
          ease: AnimationConfig.EASING,
        },
      }}
    >
      <div className="text-header">
        {current + 1}/{total}
      </div>
      <div className="text-center text-micro">(click)</div>
    </motion.div>
  );
};

export default SpeakerImageSlideCursor;
