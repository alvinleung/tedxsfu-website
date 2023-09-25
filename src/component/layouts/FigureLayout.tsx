import { useBoundingBox } from "@/hooks/useBoundingBox";
import { motion, useInView } from "framer-motion";
import React, { MutableRefObject, useRef } from "react";
import { AnimationConfig } from "../AnimationConfig";
import MainGrid from "./MainGrid";

type Caption = {
  header: string;
  description: string;
};

type Props = {
  children: React.ReactNode;
  caption?: Caption;
  width: number;
  height: number;
};

const FigureLayout = ({ children, caption, width, height }: Props) => {
  const [ref, bounds] = useBoundingBox<HTMLDivElement>([]);
  const isInView = useInView(ref, { margin: "0% 0% -10% 0%" });

  const aspectRatio = width / height;

  return (
    <figure className="relative col-span-full col-start-1 row-start-2 mt-12 md:col-span-4 md:col-start-2 xl:col-span-4 xl:col-start-4">
      <div
        ref={ref}
        className="w-full overflow-hidden"
        style={{
          height: bounds.width / aspectRatio,
        }}
      >
        <motion.div
          className="origin-bottom"
          animate={{
            opacity: isInView ? 1 : 0.2,
            scale: isInView ? 1 : 1.05,
            // x: isInView ? 0 : 0,
          }}
          transition={{
            duration: 2,
            ease: AnimationConfig.EASING,
          }}
        >
          {children}
        </motion.div>
      </div>
      {caption && (
        <div className="bottom-0 left-0 right-0 mt-4 grid grid-cols-4 gap-4 text-white sm:bottom-6 lg:grid-cols-6">
          <motion.div className="text-micro md:col-span-2 md:col-start-1 md:px-0 lg:col-span-2 lg:col-start-1">
            {caption.header}
          </motion.div>
          <motion.div className="col-span-3 col-start-2 h-fit border-l border-l-[rgba(255,255,255,.5)] pl-2 text-micro opacity-60 sm:col-span-2 md:col-span-2 lg:col-span-2">
            {caption.description}
          </motion.div>
        </div>
      )}
    </figure>
  );
};

export default FigureLayout;
