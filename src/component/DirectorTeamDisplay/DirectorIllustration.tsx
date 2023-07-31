import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import { motion } from "framer-motion";

type DirectorIllustrationProp = {
  isOdd: boolean;
  isCurrentDirector: boolean;
  director: any;
  imageWidth: string;
  itemScrollHeightVW: number;
  onDirectorEnter: () => void;
};
export const DirectorIllustration = ({
  isOdd,
  isCurrentDirector,
  director,
  imageWidth,
  itemScrollHeightVW,
  onDirectorEnter,
}: DirectorIllustrationProp) => {
  const isBiggerThanDesktop = useBreakpoint(breakpoints.md);

  return (
    <div
      style={
        {
          height: `${itemScrollHeightVW}vw`,
          pointerEvents: isCurrentDirector ? "none" : "all",
        } as React.CSSProperties
      }
    >
      <motion.div
        className={`relative`}
        style={{
          x: isOdd
            ? isBiggerThanDesktop
              ? "0px"
              : "-15%"
            : isBiggerThanDesktop
            ? "38%"
            : "32%",
          pointerEvents: isCurrentDirector ? "none" : "all",
        }}
        animate={{
          y: isCurrentDirector ? 0 : 30,
          transition: {
            ease: [0.22, 1, 0.36, 1],
            duration: 0.5,
          },
        }}
      >
        <motion.img
          src={director.fill}
          style={{
            width: imageWidth,
          }}
          animate={{}}
        />
        <motion.img
          className="absolute top-0"
          style={{
            width: imageWidth,
          }}
          animate={{
            opacity: isCurrentDirector ? 1 : 0.2,
          }}
          src={director.stroke}
        />
      </motion.div>
    </div>
  );
};
