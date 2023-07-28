import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { directors } from "../data/teamData";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { motion, useScroll, useTransform } from "framer-motion";

type Props = {};

const DirectorTeamDisplay = (props: Props) => {
  const [containerRef, bound] = useBoundingBox<HTMLDivElement>([]);

  const [currentDirector, setCurrentDirector] = useState(0);
  const { scrollY } = useScroll();

  const scrollOffset = useMemo(() => bound.height * 0, [bound]);

  useEffect(() => {
    const handleMotionChange = (pos: number) => {
      // decide which one is the current one
      const totalDirectors = directors.length;
      const offset = pos - bound.top + 300;
      const currentProgress = offset / bound.height;
      const currentDirector = Math.round(currentProgress * totalDirectors);
      setCurrentDirector(currentDirector);
    };

    const cleanupScroll = scrollY.on("change", handleMotionChange);

    return () => {
      cleanupScroll();
    };
  }, [bound]);

  console.log(currentDirector);

  return (
    <div ref={containerRef} className="grid grid-cols-8">
      <div className="col-start-2 col-span-4 pb-[14vw] flex flex-col">
        {directors.map((director, i) => {
          const isOdd = i % 2 === 0;
          const isCurrentDirector = currentDirector === i;
          return (
            <div className="relative h-[10.25vw]">
              <div
                className="absolute w-[23vw]"
                style={{
                  left: isOdd ? "0px" : "50%",
                }}
              >
                {" "}
                <motion.img
                  onMouseEnter={() => {
                    setCurrentDirector(i);
                  }}
                  animate={{
                    opacity: isCurrentDirector ? 1 : 0.2,
                  }}
                  src={director.image}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="col-start-6 col-span-1  h-fit">
        <div className="mt-[5vw]">
          {directors.map((director, i) => {
            const isCurrentDirector = currentDirector === i;
            return (
              <motion.div
                animate={{ opacity: isCurrentDirector ? 1 : 0 }}
                className="h-[10.25vw]"
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
