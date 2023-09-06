import { useWindowDimension } from "@/hooks/useWindowDimension";
import { isMobile } from "@/utils/isMobile";
import {
  clamp,
  useIsPresent,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useTransitionContext } from "../transition/TransitionEffect";
import { useFollowMotion } from "@/hooks/useFollowingMotion";
import { useEventListener } from "usehooks-ts";

type SmoothScrollParams = {
  container: MutableRefObject<HTMLDivElement>;
  canScroll: boolean;
};

export function useSmoothScroll({ container, canScroll }: SmoothScrollParams) {
  const [isUsingSmoothScroll, setIsUsingSmoothScroll] = useState(true);
  const windowDimension = useWindowDimension();
  const scrollX = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const scrollXProgress = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const targetScrollY = useMotionValue(0);

  const refreshDocumentMeasurement = () => {
    // recalculate the document measurement here
    setScrollWidth(container.current.scrollWidth);
    setScrollHeight(container.current.scrollHeight);
  };
  useEffect(() => refreshDocumentMeasurement(), [windowDimension]);

  const scrollTo = (target: number, smooth?: boolean) => {
    if (!smooth) {
      targetScrollY.set(target);
      scrollY.set(target);
      return;
    }
    targetScrollY.set(target);
  };

  useLayoutEffect(() => {
    if (!isUsingSmoothScroll) {
      console.log("not using smooth scroll");
      // reset smooth scroll when cancel
      container.current.scrollTop = 0;
      scrollY.set(0);
      return;
    }

    console.log("using smooth scroll");
    targetScrollY.set(0);
    scrollY.set(targetScrollY.get());
    container.current.scrollTop = 0;
    // refreshDocumentMeasurement();
  }, [isUsingSmoothScroll]);

  useEventListener("wheel", () => {
    setIsUsingSmoothScroll(true);
  });
  useEventListener("pointerdown", (e: PointerEvent) => {
    if (e.pointerType === "mouse") {
      setIsUsingSmoothScroll(true);
      return;
    }
    // for touch or pen
    setIsUsingSmoothScroll(false);
  });
  const cancelTab = (e: KeyboardEvent) => {
    if (e.key === "Tab") {
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  };
  useEventListener("keyup", cancelTab);
  useEventListener("keydown", cancelTab);
  useLayoutEffect(() => {
    if (isMobile()) {
      setIsUsingSmoothScroll(false);
    }
  }, []);

  useEffect(() => {
    if (!isUsingSmoothScroll || !canScroll) return;

    const handleMouseWheel = (e: WheelEvent) => {
      const maxScroll = 150;
      const newScrollValue = clamp(
        0,
        scrollHeight - windowDimension.height,
        targetScrollY.get() + clamp(-maxScroll, maxScroll, e.deltaY),
      );
      targetScrollY.set(newScrollValue);
    };

    // HACK: small delay before scroll to prevent
    // instant scrolling for transition
    const timer = setTimeout(
      () => window.addEventListener("wheel", handleMouseWheel),
      100,
    );

    return () => {
      window.removeEventListener("wheel", handleMouseWheel);
      clearTimeout(timer);
    };
  }, [scrollHeight, windowDimension, isUsingSmoothScroll, canScroll]);

  useFollowMotion({
    target: targetScrollY,
    current: scrollY,
  });

  // calculating the scrollheight

  useEffect(() => {
    const cleanup = scrollY.on("change", (v) => {
      scrollYProgress.set(v / (scrollHeight - windowDimension.height));
    });
    return () => cleanup();
  }, [scrollY, scrollHeight, windowDimension.height]);

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
    targetScrollY,
    isUsingSmoothScroll,
    scrollHeight,
    scrollWidth,
    refreshDocumentMeasurement,
    scrollTo,
  };
}
