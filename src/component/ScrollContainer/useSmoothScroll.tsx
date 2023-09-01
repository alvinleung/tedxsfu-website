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

  const scrollTo = (target: number) => {
    targetScrollY.set(target);
    scrollY.set(target);
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

  useLayoutEffect(() => {
    if (isMobile()) {
      setIsUsingSmoothScroll(false);
    }

    const handleWheel = () => {
      setIsUsingSmoothScroll(true);
    };

    const handlePointerDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") {
        setIsUsingSmoothScroll(true);
        return;
      }
      // for touch or pen
      setIsUsingSmoothScroll(false);
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("pointerdown", handlePointerDown);

    const cancelTab = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    };
    window.addEventListener("keyup", cancelTab);
    window.addEventListener("keydown", cancelTab);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keyup", cancelTab);
      window.removeEventListener("keydown", cancelTab);
    };
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

      beginFrameUpdate();
    };

    // HACK: small delay before scroll to prevent
    // instant scrolling for transition
    const timer = setTimeout(
      () => window.addEventListener("wheel", handleMouseWheel),
      100,
    );

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
      const offset = (targetScrollY.get() - currentScrollY) * 0.15;

      if (Math.abs(offset) > stopThreshold) {
        const newValue = clamp(
          0,
          scrollHeight - windowDimension.height + 100,
          currentScrollY + offset,
        );

        scrollY.set(newValue);
        animationFrame = requestAnimationFrame(performFrameUpdate);
        return;
      }

      shouldUpdate = false;
      scrollY.set(targetScrollY.get());
    }

    beginFrameUpdate();

    return () => {
      window.removeEventListener("wheel", handleMouseWheel);
      cancelAnimationFrame(animationFrame);
      clearTimeout(timer);
    };
  }, [scrollHeight, windowDimension, isUsingSmoothScroll, canScroll]);

  const callback = useCallback(() => {}, []);

  useMotionValueEvent(targetScrollY, "change", (v) => {});

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
    isUsingSmoothScroll,
    scrollHeight,
    scrollWidth,
    refreshDocumentMeasurement,
    scrollTo,
  };
}
