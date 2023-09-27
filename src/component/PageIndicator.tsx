import { motion } from "framer-motion";
import React, { useMemo } from "react";

type Props = {
  totalPages: number;
  current: number;
};

const PageIndicator = ({ totalPages, current }: Props) => {
  const pages = useMemo(() => {
    return [...new Array(totalPages)];
  }, [totalPages]);

  return (
    <motion.div className="flex flex-col gap-2">
      {pages.map((_, index) => {
        return (
          <motion.div
            key={index}
            className="h-[1px] w-4 bg-white"
            animate={{
              opacity: current === index ? 1 : 0.5,
              scaleX: current === index ? 1 : 0.3,
            }}
          />
        );
      })}
    </motion.div>
  );
};

export default PageIndicator;
