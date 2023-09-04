import { motion } from "framer-motion";
// import  { useFormFields, useMailChimpForm } from "use-mailchimp-form";
import React from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  isDarkMode: boolean;
};

const LoadingIcon= () => {
  const wrapperVariants = {
    initial: {
      y: "100%",
    },
    animate: {
      y: 0
    },
    exit: {
      y: "-100%"
    }
  }

  const demoVariants = {
    animate: {
      transition: {
        staggerChildren: AnimationConfig.VERY_FAST,
        repeat: Infinity,
      },
    },
  };

  const demoVariants2 = {
    animate: {
      y: "-50%",
      // transition: {
      transition: {
        // staggerChildren: 0.2,
        duration: AnimationConfig.NORMAL,
        ease: AnimationConfig.EASING_INVERTED,
        repeat: Infinity,
        repeatType: "reverse",
      },
    },
  };

  return (
    <motion.div
      variants={wrapperVariants as any}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div className="flex gap-x-1"
        variants={demoVariants as any}
        initial="initial"
        animate="animate"
        exit="exit"
        >
        <motion.div
          className="h-2 w-2 bg-white mix-blend-exclusion rounded"
          variants={demoVariants2 as any}
          // initial="initial"
          // animate="animate"
          // transition={transition}
        />
        <motion.div
          className="h-2 w-2 bg-white mix-blend-exclusion rounded"
          variants={demoVariants2 as any}
          // initial="initial"
          // animate="animate"
          // transition={transition}
        />
        <motion.div
          className="h-2 w-2 bg-white mix-blend-exclusion rounded"
          variants={demoVariants2 as any}
          // initial="initial"
          // animate="animate"
          // transition={transition}
        />
      </motion.div>
    </motion.div>
  );
};

export default LoadingIcon;
