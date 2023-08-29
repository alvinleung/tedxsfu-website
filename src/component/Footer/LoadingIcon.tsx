import { motion } from "framer-motion";
// import  { useFormFields, useMailChimpForm } from "use-mailchimp-form";
import React from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  isDarkMode: boolean;
};

const LoadingIcon= () => {
  const ContainerVariants = {
    initial: {
    },
    animate: {
      transition: {
        // delayChildren: 1,
        staggerChildren: 2.5,
        // repeatType: "reverse",
        repeat: Infinity,
      }
    }
  };

  const transition = {
    duration: AnimationConfig.SLOW,
    ease: AnimationConfig.EASING_IN_OUT,
     repeat: Infinity,
  }

  const childVars = {
    initial: {
      y: "0%",
      transition: transition
    },
    animate: {
      y: ["0%","-50%","0%"],
      transition: transition
    }
  }

  const demoVariants = {
    animate: {
      // y: "5rem",
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
  );
};

export default LoadingIcon;
