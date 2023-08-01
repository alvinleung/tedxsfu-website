import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import { motion } from "framer-motion";
import { useMemo } from "react";

export const DirectorInfo = ({
  director,
  currentDirector,
  itemScrollHeightVW,
  index,
}: any) => {
  const isCurrentDirector = currentDirector === index;
  const isDesktop = useBreakpoint(breakpoints.md);

  const xOffset = useMemo(() => {
    if (isDesktop) {
      return isCurrentDirector ? 0 : currentDirector > index ? 0 : -20;
    }
    return 0;
  }, [isDesktop, isCurrentDirector, currentDirector, index]);
  const yOffset = useMemo(() => {
    if (isDesktop) {
      return 0;
    }
    return isCurrentDirector ? 0 : currentDirector > index ? -40 : 40;
  }, [isDesktop, isCurrentDirector, currentDirector, index]);

  return (
    <motion.div
      animate={{
        opacity: isCurrentDirector ? 1 : 0,
        x: xOffset,
        y: yOffset,
        transition: {
          ease: [0.22, 1, 0.36, 1],
          duration: 0.5,
        },
      }}
      className={isDesktop ? "" : "px-4 pt-32 pb-8"}
      style={{
        height: isDesktop ? itemScrollHeightVW + "vw" : "auto",
        background: isDesktop
          ? ""
          : "linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 50%)",
      }}
    >
      <div className="text-micro uppercase tracking-wide mb-2 border-b border-b-[#AAA] opacity-50 pb-1">
        {director.name}
        {"\n"}({director.pronouns})
      </div>
      <div className="text-body">
        {director.position},{" "}
        <span className="opacity-50">{director.description}</span>
      </div>
    </motion.div>
  );
};
