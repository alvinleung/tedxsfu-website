import React, { useEffect, useState } from "react";
import { useContainerScroll } from "./ScrollContainer";
import { createPortal } from "react-dom";

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

  return (
    <>
      {
        <div
          className={isUsingSmoothScroll ? "opacity-0 pointer-events-none" : ""}
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
          <div
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
            className="text-black"
          >
            {children}
          </div>,
          document.body
        )}
    </>
  );
};

export default Fixed;
