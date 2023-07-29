import { useWindowDimension } from "@/hooks/useWindowDimension";
import {
  MotionValue,
  clamp,
  motion,
  useIsPresent,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  children: React.ReactNode;
  zIndex?: number;
};

export enum ScrollDirection {
  DOWN,
  UP,
}

interface ScrollContextInfo {
  scrollWidth: number;
  scrollHeight: number;
  scrollX: MotionValue;
  scrollY: MotionValue;
  scrollXProgress: MotionValue;
  scrollYProgress: MotionValue;
  scrollDirection: ScrollDirection;
  setCanScroll: Dispatch<SetStateAction<boolean>>;
  scrollContainerRef: MutableRefObject<HTMLDivElement>;
}

export const ScrollContext = createContext<ScrollContextInfo>({
  scrollWidth: 0,
  scrollHeight: 0,
  scrollX: new MotionValue(),
  scrollY: new MotionValue(),
  scrollXProgress: new MotionValue(),
  scrollYProgress: new MotionValue(),
  scrollDirection: ScrollDirection.DOWN,
  scrollContainerRef: undefined as unknown as MutableRefObject<HTMLDivElement>,
  setCanScroll: () => {},
});

function useSmoothScroll({ container }: { container: MutableRefObject<any> }) {
  const [isUsingSmoothScroll, setIsUsingSmoothScroll] = useState(false);
  const windowDimension = useWindowDimension();
  const scrollX = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const scrollXProgress = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);

  const targetScrollY = useRef(0);

  useEffect(() => {
    const handleMouseWheel = (e: WheelEvent) => {
      setIsUsingSmoothScroll(true);
      const maxScroll = 150;
      const newScrollValue = clamp(
        0,
        container.current.scrollHeight,
        targetScrollY.current + clamp(-maxScroll, maxScroll, e.deltaY)
      );
      targetScrollY.current = newScrollValue;

      beginFrameUpdate();
    };
    window.addEventListener("wheel", handleMouseWheel);

    let shouldUpdate = false;
    let animationFrame: number;
    const stopThreshold = 0.1;

    function beginFrameUpdate() {
      if (shouldUpdate) return;
      shouldUpdate = true;
      animationFrame = requestAnimationFrame(performFrameUpdate);
    }
    function performFrameUpdate() {
      const currentScrollY = scrollY.get();
      const offset = (targetScrollY.current - currentScrollY) * 0.15;

      console.log(Math.abs(offset) > stopThreshold);
      if (Math.abs(offset) > stopThreshold) {
        scrollY.set(currentScrollY + offset);
        animationFrame = requestAnimationFrame(performFrameUpdate);
        return;
      }

      shouldUpdate = false;
      scrollY.set(targetScrollY.current);
    }

    beginFrameUpdate();

    return () => {
      window.removeEventListener("wheel", handleMouseWheel);
      cancelAnimationFrame(animationFrame);
    };
  }, [windowDimension]);

  const framerMotionScroll = useScroll({
    container: container,
  });

  return {
    scrollX: isUsingSmoothScroll ? scrollX : framerMotionScroll.scrollX,
    scrollY: isUsingSmoothScroll ? scrollY : framerMotionScroll.scrollY,
    scrollXProgress: isUsingSmoothScroll
      ? scrollXProgress
      : framerMotionScroll.scrollXProgress,
    scrollYProgress: isUsingSmoothScroll
      ? scrollYProgress
      : framerMotionScroll.scrollYProgress,
    isUsingSmoothScroll,
  };
}

export const ScrollContainer = ({ children, zIndex = 0 }: Props) => {
  const scrollContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [canScroll, setCanScroll] = useState(true);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.DOWN
  );

  const {
    scrollX,
    scrollY,
    scrollXProgress,
    scrollYProgress,
    isUsingSmoothScroll,
  } = useSmoothScroll({
    container: scrollContainerRef,
  });

  const scrollYOffset = useTransform(scrollY, (v) => -v);

  const windowDim = useWindowDimension();
  useEffect(() => {
    setScrollWidth(scrollContainerRef.current.scrollWidth);
    setScrollHeight(scrollContainerRef.current.scrollHeight);
  }, [windowDim]);

  useEffect(() => {
    const unobserveScrollY = scrollY.on("change", (val) => {
      if (val > scrollY.getPrevious()) {
        setScrollDirection(ScrollDirection.DOWN);
        return;
      }
      setScrollDirection(ScrollDirection.UP);
    });

    return () => {
      unobserveScrollY();
    };
  }, []);

  useEffect(() => {}, []);

  const isPresent = useIsPresent();

  return (
    <ScrollContext.Provider
      value={{
        scrollWidth,
        scrollHeight,
        scrollX,
        scrollY,
        scrollXProgress,
        scrollYProgress,
        setCanScroll,
        scrollDirection,
        scrollContainerRef,
      }}
    >
      <motion.div
        className={`fixed left-0 top-0 right-0 bottom-0 h-screen overflow-x-hidden ${
          canScroll && !isUsingSmoothScroll
            ? "overflow-y-auto"
            : "overflow-y-hidden"
        } `}
        ref={scrollContainerRef}
        style={{
          zIndex: zIndex,
          // overflowY: isPresent ? "inherit" : "scroll",
          pointerEvents: isPresent ? "all" : "none",
        }}
      >
        <motion.div style={{ y: isUsingSmoothScroll ? scrollYOffset : 0 }}>
          {children}
        </motion.div>
      </motion.div>
    </ScrollContext.Provider>
  );
};

export const useContainerScroll = () => {
  return useContext(ScrollContext);
};
