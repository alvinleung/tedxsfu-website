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
      return isCurrentDirector ? 0 : currentDirector > index ? 0 : 20;
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
      initial={{ opacity: 0 }}
      animate={{
        opacity: isCurrentDirector ? 1 : 0,
        x: isDesktop ? xOffset : 0,
        y: isDesktop ? yOffset : 0,
        transition: {
          ease: [0.22, 1, 0.36, 1],
          duration: 0.3,
        },
      }}
      className={isDesktop ? "" : "px-grid-margin-x pb-24 pt-32"}
      style={{
        height: isDesktop ? itemScrollHeightVW + "vw" : "auto",
        background: isDesktop
          ? ""
          : "linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,1) 50%)",
      }}
    >
      <div className="mb-2 pb-1 text-lead-mobile sm:text-lead-tablet 2xl:text-lead">
        {director.name}
        {"\n"}({director.pronouns})
      </div>
      <div className="text-body-mobile sm:text-body-tablet 2xl:text-body">
        {director.position},{" "}
        <span className="opacity-50">{director.description}</span>
      </div>
    </motion.div>
  );
};
