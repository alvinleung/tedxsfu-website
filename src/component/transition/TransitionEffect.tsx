import { useWindowDimension } from "@/hooks/useWindowDimension";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { createContext, useContext, useEffect, useState } from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  children: React.ReactNode;
};

type TransitionContextType = {
  isTransitionDone: boolean;
};
const TransitionContext = createContext<TransitionContextType>({
  isTransitionDone: false,
});

const TransitionEffect = ({ children }: Props) => {
  const router = useRouter();
  const windowDimension = useWindowDimension();
  const isAboutPage = router.pathname === "/about";

  const [highestIndex, setHighestIndex] = useState(0);
  const [isTransitionDone, setIsTransitionDone] = useState(false);

  useEffect(() => {
    setHighestIndex(highestIndex + 1);
    setIsTransitionDone(false);
  }, [router.pathname]);

  return (
    <TransitionContext.Provider value={{ isTransitionDone }}>
      <AnimatePresence
        mode="popLayout"
        onExitComplete={() => {
          setIsTransitionDone(true);
        }}
      >
        <motion.div
          initial={{
            x: isAboutPage ? windowDimension.width : -windowDimension.width,
            zIndex: highestIndex,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: isAboutPage
              ? windowDimension.width / 1.7
              : -windowDimension.width / 1.7,
            opacity: 0.5,
          }}
          transition={{
            duration: AnimationConfig.VERY_SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          }}
          key={router.pathname}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </TransitionContext.Provider>
  );
};

export const useTransitionContext = () => useContext(TransitionContext);

export default TransitionEffect;
