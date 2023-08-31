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
import { useIsFirstRender } from "@/hooks/useIsFirstRender";

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
  const [isTransitionDone, setIsTransitionDone] = useState(true);
  // const [pageOffsetX, setPageOffsetX] = useState(0);

  const isFirstPage = useRef(true);
  useEffect(() => {
    if (isFirstPage) {
      setIsTransitionDone(true);
      isFirstPage.current = false;
      return;
    }

    setHighestZIndex(highestZIndex + 1);
    setIsTransitionDone(false);
  }, [router.pathname]);

  return (
    <AnimatePresence
      mode="wait"
      onExitComplete={() => {
        setIsTransitionDone(true);
        setHighestZIndex(0);
      }}
    >
      <motion.div
        className="fixed bottom-0 left-0 right-0 top-0 flex h-screen w-screen"
        // initial={{
        //   opacity: 1,
        //   x: isAboutPage
        //     ? windowDimension.width * 0.05
        //     : -windowDimension.width * 0.05,
        //   zIndex: highestZIndex,
        // }}
        // animate={{
        //   x: 0,
        //   opacity: 1,
        //   transition: {
        //     duration: AnimationConfig.VERY_SLOW,
        //     ease: [0.22, 1, 0.36, 1],
        //   },
        // }}
        // exit={{
        //   x: isAboutPage
        //     ? windowDimension.width * 0.05
        //     : -windowDimension.width * 0.05,
        //   opacity: 0,
        //   transition: {
        //     duration: AnimationConfig.SLOW,
        //     ease: [0.64, 0, 0.78, 0],
        //   },
        // }}
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
