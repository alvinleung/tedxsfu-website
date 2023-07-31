import React, {
  MutableRefObject,
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

type Props = {
  children: React.ReactNode;
  top: number | string;
  duration?: number;
};

const Sticky = ({ children, top, duration }: Props) => {
  const [isDOMReady, setIsDOMReady] = useState(false);
  const { documentOffsetY, isUsingSmoothScroll } = useContainerScroll();
  const stickyContainerBounds = useStickyContainerBounds();
  const [containerRef, bounds] = useBoundingBox<HTMLDivElement>([isDOMReady]);

  const windowDim = useWindowDimension();

  const topOffsetPixel = useMemo<number>(() => {
    if (typeof top === "string") {
      if ((top as String).includes("vh")) {
        return windowDim.height * parseFloat(top) * 0.01;
      }
      if ((top as String).includes("vw")) {
        return windowDim.width * parseFloat(top) * 0.01;
      }
      if ((top as String).includes("px")) {
        return parseFloat(top);
      }
      return parseFloat(top);
    }
    return top;
  }, [top, windowDim]);

  const stickyDuration = useMemo(() => {
    if (duration) {
      return duration;
    }
    return stickyContainerBounds.height - (bounds.height + topOffsetPixel);
  }, [bounds, stickyContainerBounds, duration]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDOMReady(true);
    }
  }, []);

  const stickyOffset = useTransform([documentOffsetY], ([y]: any) => {
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
