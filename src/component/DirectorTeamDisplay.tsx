import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { directors } from "../data/teamData";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { motion, useInView, useTransform } from "framer-motion";
import { useContainerScroll } from "./ScrollContainer";

type Props = {};

const DirectorTeamDisplay = (props: Props) => {
  const [containerRef, bound] = useBoundingBox<HTMLDivElement>([]);

  const [currentDirector, setCurrentDirector] = useState(0);
  const { scrollY } = useContainerScroll();

  useEffect(() => {
    const handleMotionChange = (pos: number) => {
      // decide which one is the current one
      const totalDirectors = directors.length;
      const offset = pos - bound.top;
      const currentProgress = offset / bound.height;
      const currentDirector = Math.round(currentProgress * totalDirectors);
      setCurrentDirector(currentDirector);
      console.log(offset);
    };

    handleMotionChange(scrollY.get());

    const cleanupScroll = scrollY.on("change", handleMotionChange);

    return () => {
      cleanupScroll();
    };
  }, [bound, scrollY]);

  const itemScrollHeightVW = 15;

  return (
    <div ref={containerRef} className="grid grid-cols-8 relative">
      <div className="col-start-2 col-span-4 pb-[14vw] flex flex-col">
        {directors.map((director, i) => {
          const isOdd = i % 2 === 0;
          const isCurrentDirector = currentDirector === i;

          const imageWidth = `${itemScrollHeightVW * 2.1}vw`;
          return (
            <DirectorIllustration
              isOdd={isOdd}
              isCurrentDirector={isCurrentDirector}
              director={director}
              imageWidth={imageWidth}
              itemScrollHeightVW={itemScrollHeightVW}
              onDirectorEnter={() => setCurrentDirector(i)}
            />
          );
        })}
      </div>
      <div className="col-start-6 col-span-1 absolute">
        <div className="mt-[15vw]">
          {directors.map((director, i) => {
            const isCurrentDirector = currentDirector === i;
            const isOdd = i % 2 === 0;

            return (
              <motion.div
                animate={{
                  opacity: isCurrentDirector ? 1 : 0,
                  x: isCurrentDirector ? 0 : currentDirector > i ? 0 : -20,
                  transition: {
                    ease: [0.22, 1, 0.36, 1],
                    duration: 0.5,
                  },
                }}
                className={` sticky top-[20vw]`}
                style={{
                  height: itemScrollHeightVW + "vw",
                }}
              >
                <DirectorInfo director={director} />
              </motion.div>
            );
          })}{" "}
        </div>
      </div>
    </div>
  );
};

type DirectorIllustrationProp = {
  isOdd: boolean;
  isCurrentDirector: boolean;
  director: any;
  imageWidth: string;
  itemScrollHeightVW: number;
  onDirectorEnter: () => void;
};
const DirectorIllustration = ({
  isOdd,
  isCurrentDirector,
  director,
  imageWidth,
  itemScrollHeightVW,
  onDirectorEnter,
}: DirectorIllustrationProp) => {
  return (
    <div
      // className={`h-[${itemScrollHeightVW}vw]`}
      style={{
        height: `${itemScrollHeightVW}vw`,
        pointerEvents: isCurrentDirector ? "none" : "all",
      }}
    >
      <motion.div
        className={`relative`}
        style={{
          x: isOdd ? "0px" : "38%",
          pointerEvents: isCurrentDirector ? "none" : "all",
        }}
        onMouseEnter={() => {
          // setCurrentDirector(i);
        }}
      >
        <motion.img
          src={director.fill}
          style={{
            width: imageWidth,
          }}
          animate={{
            y: isCurrentDirector ? 0 : 50,
          }}
        />
        <motion.img
          className="absolute top-0"
          style={{
            width: imageWidth,
          }}
          animate={{
            opacity: isCurrentDirector ? 1 : 0.1,
            y: isCurrentDirector ? 0 : 50,
          }}
          src={director.stroke}
        />
      </motion.div>
    </div>
  );
};

const DirectorInfo = ({ director }: any) => (
  <>
    <div className="text-lead mb-4">
      {director.name}({director.pronouns})
    </div>
    <div className="text-body">
      {director.position},{" "}
      <span className="opacity-50">{director.description}</span>
    </div>
  </>
);

export default DirectorTeamDisplay;
