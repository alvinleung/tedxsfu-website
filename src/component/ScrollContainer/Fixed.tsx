import React, { useEffect, useState } from "react";
import { useContainerScroll } from "./ScrollContainer";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { AnimationConfig } from "../AnimationConfig";

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

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsDOMReady(true);
    }
  }, []);

  const router = useRouter();
  const windowDim = useWindowDimension();

  return (
    <>
      {
        <motion.div
          className={isUsingSmoothScroll ? "pointer-events-none opacity-0" : ""}
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
        </motion.div>
      }
      {isDOMReady &&
        isUsingSmoothScroll &&
        createPortal(
          <motion.div
            style={{
              position: "fixed",
              zIndex: 1000,
              top: top || 0,
              right: right || 0,
              // width: bounds && bounds.width,
              bottom: bottom || 0,
              left: left || 0,
              pointerEvents: pointerEvents,
            }}
            initial={{
              x:
                router.pathname === "/about"
                  ? windowDim.width
                  : -windowDim.width,
            }}
            animate={{
              x: 0,
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
          </motion.div>,
          document.body,
        )}
    </>
  );
};

export default Fixed;
