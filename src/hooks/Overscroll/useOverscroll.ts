import { useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ScrollDirection,
  useContainerScroll,
} from "../../component/ScrollContainer/ScrollContainer";
import { clamp } from "../../utils/clamp";
import debounce from "../../utils/debounce";
import { useWindowDimension } from "../useWindowDimension";

export enum OverscrollDirection {
  UP,
  DOWN,
}

const MAX_STEP = 50;

export function useOverscroll(
  direction: OverscrollDirection = OverscrollDirection.UP,
  maxDist = 200,
) {
  const { scrollContainerRef, targetScrollY, scrollEnd, canScroll } =
    useContainerScroll();
  const scrollYProgress = useTransform(targetScrollY, [0, scrollEnd], [0, 1]);

  const overScroll = useSpring(0, { stiffness: 1500, damping: 200 });
  const overscrollProgress = useTransform(overScroll, [0, maxDist], [0, 1]);

  const overscrollReadyDelay = 1000;
  const [isOverscrollReady, setIsOverscrollReady] = useState(false);
  useEffect(() => {
    setTimeout(() => setIsOverscrollReady(true), overscrollReadyDelay);
  }, []);

  const [isActive, setIsActive] = useState(true);

  const [isOverscrollComplete, setIsOverscrollComplete] = useState(false);
  const completeRef = useRef(false);
  const [isOverscrollStarted, setIsOverscrollStarted] = useState(false);

  const resetOverscroll = useMemo(
    () =>
      debounce(() => {
        // done reset if done
        if (completeRef.current === true) return;

        overScroll.set(0);
        setIsOverscrollStarted(false);
      }, 140),
    [],
  );

  useEffect(() => {
    if (isOverscrollComplete === true) completeRef.current = true;
  }, [isOverscrollComplete]);

  // effect to set if the overscroll engaged or not
  useEffect(() => {
    if (!isOverscrollReady) return;
    const unobserve = scrollYProgress.on("change", (val) => {
      if (direction === OverscrollDirection.UP && val <= 0) {
        setIsActive(true);
        return;
      }
      if (direction === OverscrollDirection.DOWN && val >= 0.999) {
        setIsActive(true);
        return;
      }
      setIsActive(false);
    });
    return () => {
      unobserve();
    };
  }, [scrollYProgress, direction, isOverscrollReady]);

  useEffect(() => {
    if (!isActive || !isOverscrollReady || !canScroll) return;

    const handleWheel = (e: WheelEvent) => {
      let deltaAmount = 0;
      const delta = clamp(e.deltaY, -MAX_STEP, MAX_STEP);

      const isGoingOppositeDirection =
        (direction === OverscrollDirection.UP && delta < 0) ||
        (direction === OverscrollDirection.DOWN && delta > 0);
      if (isGoingOppositeDirection) {
        setIsOverscrollStarted(true);
      }

      if (direction === OverscrollDirection.UP) {
        deltaAmount = overScroll.get() - delta;
      } else {
        deltaAmount = overScroll.get() + delta;
      }

      if (completeRef.current) {
        return;
      }
      overScroll.set(deltaAmount);
      resetOverscroll();
    };

    const unobserve = overscrollProgress.on("change", (val) => {
      if (val >= 1) {
        setIsOverscrollComplete(true);
        return;
      }
      setIsOverscrollComplete(false);
    });

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      unobserve();

      if (!completeRef.current) overScroll.set(0);
    };
  }, [
    isActive,
    scrollContainerRef,
    overscrollProgress,
    direction,
    isOverscrollReady,
    canScroll,
  ]);

  return { isOverscrollComplete, overscrollProgress, isOverscrollStarted };
}
