import React, {
  MutableRefObject,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useContainerScroll } from "./ScrollContainer";
import {
  AnimatePresence,
  motion,
  useIsPresent,
  useTransform,
} from "framer-motion";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { useStickyContainerBounds } from "./StickyContainer";
import { useCSSSizingInPixel } from "@/hooks/useCSSSizingInPixel";
import { useRouter } from "next/router";
import { AnimationConfig } from "../AnimationConfig";
import { useTransitionContext } from "../transition/TransitionEffect";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  top: number | string;
  duration?: number;
  fadeOut?: boolean;
  fadeIn?: boolean;
}

const Sticky = ({
  children,
  top,
  duration,
  fadeOut,
  fadeIn,
  className,
  ...htmlProps
}: Props) => {
  // const windowDim = useWindowDimension();
  const [isDOMReady, setIsDOMReady] = useState(false);
  const { scrollY, isUsingSmoothScroll } = useContainerScroll();
  const stickyContainerBounds = useStickyContainerBounds();
  const [containerRef, bounds] = useBoundingBox<HTMLDivElement>([isDOMReady]);

  // hack to force re calculate the bounding box once swtiching back from touch
  useEffect(() => {
    setIsDOMReady(false);
    setTimeout(() => setIsDOMReady(true), 10);
  }, [isUsingSmoothScroll]);

  const topOffsetPixel = useCSSSizingInPixel(top);

  const stickyDuration = useMemo(() => {
    if (duration) {
      return duration;
    }
    return stickyContainerBounds.height - (bounds.height + topOffsetPixel);
  }, [bounds, stickyContainerBounds, duration, topOffsetPixel]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDOMReady(true);
    }
  }, []);

  const containerAndStickyOfffset = stickyContainerBounds.top - bounds.top;
  const stickyStartPos = bounds.top - topOffsetPixel;
  const stickyEndPos = stickyStartPos + stickyDuration;

  const stickyOffset = useTransform(
    scrollY,
    [stickyStartPos, stickyEndPos],
    [0, stickyDuration],
  );

  const stikcyOpacity = useTransform(
    scrollY,
    [
      fadeIn ? stickyStartPos : 0,
      fadeIn ? stickyStartPos + bounds.height / 2 : 0,
      stickyEndPos - bounds.height,
      stickyEndPos,
    ],
    [0, 1, 1, 0],
  );

  return (
    <>
      <motion.div
        ref={containerRef}
        className={`${
          isUsingSmoothScroll ? "h-fit" : "sticky top-0 h-fit"
        } ${className}`}
        style={{
          top: top,
        }}
        {...(htmlProps as any)}
      >
        {isUsingSmoothScroll && (
          <motion.div
            style={{
              y: stickyOffset,
              opacity: fadeOut ? stikcyOpacity : 1,
            }}
          >
            {children}
          </motion.div>
        )}
        {!isUsingSmoothScroll && (
          <motion.div
            style={{
              y: 0,
              opacity: fadeOut ? stikcyOpacity : 1,
            }}
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default Sticky;
