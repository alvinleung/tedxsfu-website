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
import { motion, useTransform } from "framer-motion";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { useStickyContainerBounds } from "./StickyContainer";
import { useCSSSizingInPixel } from "@/hooks/useCSSSizingInPixel";

type Props = {
  children: React.ReactNode;
  top: number | string;
  duration?: number;
};

const Sticky = ({ children, top, duration }: Props) => {
  // const windowDim = useWindowDimension();
  const [isDOMReady, setIsDOMReady] = useState(false);
  const { documentOffsetY, isUsingSmoothScroll, scrollY } =
    useContainerScroll();
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

  const stickyOffset = useTransform(documentOffsetY, (y: any) => {
    const stickyPos = -bounds.top + topOffsetPixel;

    // before sticky
    if (stickyPos < y) {
      return y;
    }
    // after sticky
    if (stickyPos - stickyDuration > y) {
      return y + stickyDuration;
    }

    // during sticky
    return stickyPos;
  });

  const stickyPixelOffset = useTransform(documentOffsetY, (y: any) => {
    const stickyPos = -bounds.top + topOffsetPixel;
    return stickyPos - y;
  });

  const stickyProgress = useTransform([stickyPixelOffset], ([offsetY]: any) => {
    return -offsetY / bounds.height;
  });

  return (
    <>
      {
        <div
          ref={containerRef}
          className={isUsingSmoothScroll ? "opacity-0 pointer-events-none" : ""}
        >
          {children}
        </div>
      }
      {isDOMReady &&
        isUsingSmoothScroll &&
        createPortal(
          <motion.div
            style={{
              y: stickyOffset,
              position: "fixed",
              top: bounds && bounds.top,
              right: bounds && bounds.right,
              width: bounds && bounds.width,
              bottom: bounds && bounds.bottom,
              left: bounds && bounds.left,
            }}
            className="text-black"
          >
            {children}
          </motion.div>,
          document.body
        )}
    </>
  );
};

export default Sticky;
