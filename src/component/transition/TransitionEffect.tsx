import { useWindowDimension } from "@/hooks/useWindowDimension";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useRouter } from "next/router";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  children: React.ReactNode;
};

type TransitionContextType = {
  isTransitionDone: boolean;
  highestZIndex: number;
};
const TransitionContext = createContext<TransitionContextType>({
  isTransitionDone: false,
  highestZIndex: 0,
});

const TransitionEffect = ({ children }: Props) => {
  const router = useRouter();
  const windowDimension = useWindowDimension();
  const isAboutPage = router.pathname === "/about";

  const [highestZIndex, setHighestZIndex] = useState(0);
  const [isTransitionDone, setIsTransitionDone] = useState(false);
  // const [pageOffsetX, setPageOffsetX] = useState(0);

  useEffect(() => {
    setHighestZIndex(highestZIndex + 1);
    setIsTransitionDone(false);
  }, [router.pathname]);

  return (
    <AnimatePresence
      // mode="popLayout"
      onExitComplete={() => {
        setIsTransitionDone(true);
        setHighestZIndex(0);
      }}
    >
      <motion.div
        className="fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen"
        initial={{
          x: isAboutPage ? windowDimension.width : -windowDimension.width,
          zIndex: highestZIndex,
        }}
        animate={{
          x: 0,
          opacity: 1,
          transition: {
            duration: AnimationConfig.VERY_SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
        exit={{
          x: isAboutPage
            ? windowDimension.width / 1.7
            : -windowDimension.width / 1.7,
          opacity: 0,
          transition: {
            duration: AnimationConfig.VERY_SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
        key={router.pathname}
      >
        <TransitionContext.Provider value={{ isTransitionDone, highestZIndex }}>
          {children}
        </TransitionContext.Provider>
      </motion.div>
    </AnimatePresence>
  );
};

export const useTransitionContext = () => {
  // const isPresent = useIsPresent();
  const nextContext = useContext(TransitionContext);
  // const prevContextRef = useRef({});
  // const context = useMemo(() => {
  //   if (!isPresent) {
  //     return prevContextRef.current;
  //   }
  //   prevContextRef.current = nextContext;
  //   return nextContext;
  // }, [isPresent]);
  return nextContext;
};

export default TransitionEffect;
