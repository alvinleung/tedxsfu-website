import { MotionProps, motion } from "framer-motion";
import React from "react";
import { AnimationConfig } from "../AnimationConfig";

const STAGGER_DELAY = 0.08;
interface Props extends MotionProps {
  children: React.ReactNode;
  staggerIndex: number;
  isActive: boolean;
  secondary?: boolean;
}

const StaggerTransition = ({
  children,
  staggerIndex,
  isActive,
  secondary = false,
  ...props
}: Props) => {
  return (
    <motion.div
      {...props}
      initial={{
        opacity: 0,
        y: secondary ? 0 : 10,
      }}
      animate={{
        opacity: isActive ? 1 : 0,
        y: secondary ? 0 : isActive ? 0 : 10,
        transition: {
          ease: secondary ? "linear" : AnimationConfig.EASING,
          duration: isActive
            ? secondary
              ? AnimationConfig.VERY_SLOW
              : AnimationConfig.SLOW
            : AnimationConfig.SLOW,
          delay: isActive ? staggerIndex * STAGGER_DELAY : 0,
        },
      }}
      exit={{
        opacity: 0,
        y: secondary ? 0 : 10,
      }}
    >
      {children}
    </motion.div>
  );
};

export default StaggerTransition;
