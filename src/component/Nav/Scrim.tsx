import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Props = {
  isShowing?: boolean;
};

const Scrim = ({ isShowing }: Props) => {
  return (
    <AnimatePresence>
      {isShowing && (
        <motion.div
          className="fixed left-0 right-0 top-0 z-[45] h-16 bg-gradient-to-b from-black to-transparent"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        />
      )}
      {isShowing && (
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-[45] h-20 bg-gradient-to-t from-black via-black to-transparent"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
        />
      )}
    </AnimatePresence>
  );
};

export default Scrim;
