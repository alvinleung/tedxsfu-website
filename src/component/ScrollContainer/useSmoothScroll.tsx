import { useWindowDimension } from "@/hooks/useWindowDimension";
import { isMobile } from "@/utils/isMobile";
import { clamp, useMotionValue, useScroll } from "framer-motion";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

type SmoothScrollParams = {
  container: MutableRefObject<HTMLDivElement>;
};

export function useSmoothScroll({ container }: SmoothScrollParams) {
  const [isUsingSmoothScroll, setIsUsingSmoothScroll] = useState(true);
  const windowDimension = useWindowDimension();
  const scrollX = useMotionValue(0);
  const scrollY = useMotionValue(0);
  const scrollXProgress = useMotionValue(0);
  const scrollYProgress = useMotionValue(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const targetScrollY = useRef(0);

  const refreshDocumentMeasurement = () => {
    // recalculate the document measurement here
    setScrollWidth(container.current.scrollWidth);
    setScrollHeight(container.current.scrollHeight);
  };
  useEffect(() => refreshDocumentMeasurement(), [windowDimension]);

  useLayoutEffect(() => {
    if (!isUsingSmoothScroll) {
      // reset smooth scroll when cancel
      container.current.scrollTop = 0;
      scrollY.set(0);
      return;
    }

    targetScrollY.current = 0;
    scrollY.set(targetScrollY.current);
    container.current.scrollTop = 0;
    // refreshDocumentMeasurement();
  }, [isUsingSmoothScroll]);

  useLayoutEffect(() => {
    if (isMobile()) {
      setIsUsingSmoothScroll(false);
    }
    const handleTouchStart = () => {
      setIsUsingSmoothScroll(false);
    };
    const handleMouseMove = () => {
      setIsUsingSmoothScroll(true);
    };
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchStart);
    window.addEventListener("mouseover", handleMouseMove);
    // window.addEventListener("mouseleave", handleMouseMove);

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchStart);
      window.removeEventListener("mouseover", handleMouseMove);
      // window.removeEventListener("mouseleave", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    if (!isUsingSmoothScroll) return;

    const handleMouseWheel = (e: WheelEvent) => {
      const maxScroll = 150;
      const newScrollValue = clamp(
        0,
        scrollHeight - windowDimension.height,
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
  }, [scrollHeight, windowDimension, isUsingSmoothScroll]);

  // calculating the scrollheight
  useEffect(() => {
    const cleanup = scrollY.on("change", (v) => {
      scrollYProgress.set(v / scrollHeight);
    });
    return () => cleanup();
  }, [scrollY, scrollHeight]);

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
  };
}
