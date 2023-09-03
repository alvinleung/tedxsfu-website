import React, { useEffect, useMemo, useState } from "react";
import { useContainerScroll } from "./ScrollContainer";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useIsPresent } from "framer-motion";
import { useRouter } from "next/router";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";
import { useTransitionContext } from "../transition/TransitionEffect";

type Props = {
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  pointerEvents?: "none" | "all";
  children: React.ReactNode;
};

const Fixed = ({
  top,
  right,
  bottom,
  left,
  children,
  pointerEvents = "all",
}: Props) => {
  const [isDOMReady, setIsDOMReady] = useState(false);
  const { isUsingSmoothScroll } = useContainerScroll();
  const { isTransitionDone } = useTransitionContext();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDOMReady(true);
    }
  }, []);

  const router = useRouter();
  const windowDim = useWindowDimension();
  const isPresent = useIsPresent();

  return (
    <>
      {
        <div
          className={
            isUsingSmoothScroll ? "pointer-events-none opacity-0" : " z-10"
          }
          style={{
            position: "fixed",
            top: top,
            right: right,
            // width: bounds && bounds.width,
            bottom: bottom,
            left: left,
            pointerEvents: pointerEvents,
          }}
        >
          {children}
        </div>
      }
      {isDOMReady &&
        isUsingSmoothScroll &&
        createPortal(
          <AnimatePresence>
            {isPresent && (
              <motion.div
                style={{
                  position: "fixed",
                  zIndex: 30,
                  top: top || 0,
                  right: right || 0,
                  // width: bounds && bounds.width,
                  bottom: bottom || 0,
                  left: left || 0,
                  pointerEvents: pointerEvents,
                }}
                initial={{
                  x: isTransitionDone
                    ? 0
                    : router.pathname === "/about"
                    ? windowDim.width
                    : -windowDim.width,

                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                exit={{
                  x:
                    router.pathname === "/about"
                      ? -windowDim.width
                      : windowDim.width,
                  opacity: 0.5,
                }}
                transition={{
                  duration: AnimationConfig.VERY_SLOW,
                  ease: AnimationConfig.EASING_IN_OUT,
                }}
                className="text-black"
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </>
  );
};

export default Fixed;
