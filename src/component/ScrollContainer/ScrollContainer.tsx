import { useWindowDimension } from "@/hooks/useWindowDimension";
import { isMobile } from "@/utils/isMobile";
import {
  MotionValue,
  clamp,
  motion,
  useIsPresent,
  useMotionValue,
  useMotionValueEvent,
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
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useSmoothScroll } from "./useSmoothScroll";
import { useRouter } from "next/router";
import { NavScrollState, useNavContext } from "../Nav/Nav";

type Props = {
  children: React.ReactNode;
  zIndex?: number;
};

export enum ScrollDirection {
  DOWN,
  UP,
  UNKNOWN,
}

interface ScrollContextInfo {
  scrollWidth: number;
  scrollHeight: number;
  scrollEnd: number;
  scrollX: MotionValue;
  scrollY: MotionValue;
  targetScrollY: MotionValue;
  scrollXProgress: MotionValue;
  scrollYProgress: MotionValue;
  documentOffsetY: MotionValue;
  scrollDirection: ScrollDirection;
  setCanScroll: Dispatch<SetStateAction<boolean>>;
  scrollContainerRef: MutableRefObject<HTMLDivElement>;
  refreshDocumentMeasurement: () => void;
  isUsingSmoothScroll: boolean;
  scrollTo: (target: number, smooth?: boolean) => void;
  canScroll: boolean;
  hasScrolled: boolean;
}

export const ScrollContext = createContext<ScrollContextInfo>({
  scrollWidth: 0,
  scrollHeight: 0,
  scrollEnd: 0,
  scrollX: new MotionValue(),
  scrollY: new MotionValue(),
  targetScrollY: new MotionValue(),
  scrollXProgress: new MotionValue(),
  scrollYProgress: new MotionValue(),
  documentOffsetY: new MotionValue(),
  scrollDirection: ScrollDirection.DOWN,
  scrollContainerRef: undefined as unknown as MutableRefObject<HTMLDivElement>,
  setCanScroll: () => {},
  canScroll: true,
  hasScrolled: false,
  refreshDocumentMeasurement: () => {},
  isUsingSmoothScroll: true,
  scrollTo: () => {},
});

export const ScrollContainer = ({ children, zIndex = 0 }: Props) => {
  const scrollContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [canScroll, setCanScroll] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.UNKNOWN,
  );

  const [hasScrolled, setHasScrolled] = useState(false);

  const isPresent = useIsPresent();

  const {
    scrollX,
    scrollY,
    scrollXProgress,
    scrollYProgress,
    isUsingSmoothScroll,
    scrollWidth,
    scrollHeight,
    refreshDocumentMeasurement,
    scrollTo,
    targetScrollY,
  } = useSmoothScroll({
    container: scrollContainerRef,
    canScroll: isPresent && canScroll,
  });

  const documentOffsetY = useTransform(scrollY, (v) => {
    if (!isUsingSmoothScroll) return 0;
    return -v;
  });

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 0) {
      setHasScrolled(true);
      return;
    }
    setHasScrolled(false);
  });

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
  }, [scrollY]);

  const nav = useNavContext();

  useEffect(() => {
    if (nav.isOpened) {
      setCanScroll(false);
      return;
    }
    setCanScroll(true);
  }, [nav.isOpened]);

  useEffect(() => {
    if (scrollDirection == ScrollDirection.DOWN) {
      nav.setScrollState(NavScrollState.SCROLLED);
    } else {
      // console.log("default");
      nav.setScrollState(NavScrollState.DEFAULT);
    }
  }, [scrollDirection]);

  const windowDim = useWindowDimension();

  const scrollEnd = useMemo(
    () => scrollHeight - windowDim.height,
    [scrollHeight, windowDim.height],
  );

  const scrollBarY = useTransform(
    scrollY,
    [0, scrollHeight],
    [0, windowDim.height],
  );

  const scrollBarHeight = (windowDim.height / scrollHeight) * windowDim.height;

  const [shouldShowScrollbar, setShouldShowScrollBar] = useState(true);

  useEffect(() => {
    let time: any;
    const attemptHide = () => {
      if (time) {
        clearTimeout(time);
      }
      time = setTimeout(() => {
        setShouldShowScrollBar(false);
      }, 100);
    };

    const cancel = scrollBarY.on("change", (v) => {
      setShouldShowScrollBar(true);
      attemptHide();
    });

    attemptHide();

    return () => {
      setShouldShowScrollBar(false);
      clearTimeout(time);
      cancel();
    };
  }, [scrollBarY]);

  return (
    <ScrollContext.Provider
      value={{
        scrollWidth,
        scrollHeight,
        scrollEnd,
        scrollX,
        scrollY,
        targetScrollY,
        scrollXProgress,
        scrollYProgress,
        setCanScroll,
        scrollDirection,
        scrollContainerRef,
        documentOffsetY,
        refreshDocumentMeasurement,
        isUsingSmoothScroll,
        scrollTo,
        canScroll,
        hasScrolled,
      }}
    >
      <motion.div
        className={`no-scrollbar fixed bottom-0 left-0 right-0 top-0 h-[100dvh] w-screen overflow-x-hidden ${
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
        <motion.div style={{ y: isUsingSmoothScroll ? documentOffsetY : 0 }}>
          {children}
        </motion.div>
        <div className="pointer-events-none fixed bottom-0 right-0 top-0 w-1 rounded-full mix-blend-exclusion">
          <motion.div
            className="w-1 bg-white"
            style={{
              height: scrollBarHeight === Infinity ? 0 : scrollBarHeight,
              y: scrollBarY,
            }}
            animate={{
              opacity: isUsingSmoothScroll && shouldShowScrollbar ? 1 : 0,
            }}
          />
        </div>
      </motion.div>
    </ScrollContext.Provider>
  );
};

export const useContainerScroll = () => {
  return useContext(ScrollContext);
};
