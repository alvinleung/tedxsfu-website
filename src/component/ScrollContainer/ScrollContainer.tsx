import { useWindowDimension } from "@/hooks/useWindowDimension";
import { isMobile } from "@/utils/isMobile";
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
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useSmoothScroll } from "./useSmoothScroll";
import { useRouter } from "next/router";

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
  documentOffsetY: MotionValue;
  scrollDirection: ScrollDirection;
  setCanScroll: Dispatch<SetStateAction<boolean>>;
  scrollContainerRef: MutableRefObject<HTMLDivElement>;
  refreshDocumentMeasurement: () => void;
  isUsingSmoothScroll: boolean;
  scrollTo: (target: number) => void;
}

export const ScrollContext = createContext<ScrollContextInfo>({
  scrollWidth: 0,
  scrollHeight: 0,
  scrollX: new MotionValue(),
  scrollY: new MotionValue(),
  scrollXProgress: new MotionValue(),
  scrollYProgress: new MotionValue(),
  documentOffsetY: new MotionValue(),
  scrollDirection: ScrollDirection.DOWN,
  scrollContainerRef: undefined as unknown as MutableRefObject<HTMLDivElement>,
  setCanScroll: () => {},
  refreshDocumentMeasurement: () => {},
  isUsingSmoothScroll: true,
  scrollTo: () => {},
});

export const ScrollContainer = ({ children, zIndex = 0 }: Props) => {
  const scrollContainerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const [canScroll, setCanScroll] = useState(true);
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(
    ScrollDirection.DOWN
  );

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
  } = useSmoothScroll({
    container: scrollContainerRef,
  });

  const documentOffsetY = useTransform(scrollY, (v) => {
    if (!isUsingSmoothScroll) return 0;
    return -v;
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

  const isPresent = useIsPresent();

  const router = useRouter();
  useEffect(() => {
    scrollTo(0);
    refreshDocumentMeasurement();
  }, [router.pathname]);

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
        documentOffsetY,
        refreshDocumentMeasurement,
        isUsingSmoothScroll,
        scrollTo,
      }}
    >
      <motion.div
        className={`no-scrollbar fixed left-0 top-0 right-0 bottom-0 h-screen overflow-x-hidden ${
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
      </motion.div>
    </ScrollContext.Provider>
  );
};

export const useContainerScroll = () => {
  return useContext(ScrollContext);
};
