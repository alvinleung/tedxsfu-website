import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { useWindowDimension } from "../hooks/useWindowDimension";
import { useBoolean, useEventListener } from "usehooks-ts";

type Props = {};

const GridOverlay = (props: Props) => {
  const viewport = useWindowDimension();
  const showGrid = useBoolean(false);

  useEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "G" && e.shiftKey) {
      showGrid.toggle();
    }
  });

  return (
    <motion.div
      animate={{
        opacity: showGrid.value ? 0.2 : 0,
      }}
      className="pointer-events-none fixed bottom-0 left-4 right-4 top-0 z-50 grid grid-cols-4 gap-4 opacity-20 md:grid-cols-6 lg:grid-cols-6 2xl:grid-cols-8"
    >
      <div className="h-full bg-ted"></div>
      <div className="h-full bg-ted"></div>
      <div className="h-full bg-ted"></div>
      <div className="h-full bg-ted"></div>
      {viewport.width >= 768 && <div className="h-full bg-ted"></div>}
      {viewport.width >= 768 && <div className="h-full bg-ted"></div>}
      {viewport.width >= 1536 && <div className="h-full bg-ted"></div>}
      {viewport.width >= 1536 && <div className="h-full bg-ted"></div>}
    </motion.div>
  );
};

export default GridOverlay;
