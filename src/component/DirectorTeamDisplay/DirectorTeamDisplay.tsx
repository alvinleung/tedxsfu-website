import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { directors } from "../../data/teamData";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { motion, useInView, useTransform } from "framer-motion";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import MainGrid from "../layouts/MainGrid";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import Fixed from "../ScrollContainer/Fixed";
import { DirectorIllustration } from "./DirectorIllustration";
import { DirectorInfo } from "./DirectorInfo";

type Props = {};

const DirectorTeamDisplay = (props: Props) => {
  const [containerRef, bound] = useBoundingBox<HTMLDivElement>([]);
  const windowDim = useWindowDimension();

  const [currentDirector, setCurrentDirector] = useState(0);
  const { scrollY } = useContainerScroll();

  useEffect(() => {
    const handleMotionChange = (pos: number) => {
      // decide which one is the current one
      const totalDirectors = directors.length;
      const offset = pos - bound.top + windowDim.height * 0.35;
      const currentProgress = offset / bound.height;
      const currentDirector = Math.round(currentProgress * totalDirectors);
      setCurrentDirector(currentDirector);
      // console.log(offset);
    };

    handleMotionChange(scrollY.get());

    const cleanupScroll = scrollY.on("change", handleMotionChange);

    return () => {
      cleanupScroll();
    };
  }, [bound, scrollY, windowDim]);

  const isDesktop = useBreakpoint(breakpoints.md);
  const itemScrollHeightVW = isDesktop ? 15 : 40;

  return (
    <MainGrid
      ref={containerRef}
      className="relative"
      style={{
        marginBottom: `${itemScrollHeightVW}vw`,
      }}
    >
      <div className="col-start-1 col-span-full md:col-start-2 md:col-span-3 2xl:col-start-2 2xl:col-span-4 flex flex-col">
        {directors.map((director, i) => {
          const isOdd = i % 2 === 0;
          const isCurrentDirector = currentDirector === i;

          const imageWidth = `${itemScrollHeightVW * 2.1}vw`;
          return (
            <DirectorIllustration
              key={i}
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
      <div className="md:col-start-5 md:col-span-1 2xl:col-start-6 2xl:col-span-1 absolute">
        <div className="mt-[15vw]">
          {directors.map((director, i) => {
            return (
              <>
                {!isDesktop && (
                  <Fixed bottom="0px" top={"auto"} key={i} pointerEvents="none">
                    <DirectorInfo
                      director={director}
                      currentDirector={currentDirector}
                      index={i}
                      itemScrollHeightVW={itemScrollHeightVW}
                    />
                  </Fixed>
                )}
                {isDesktop && (
                  <DirectorInfo
                    director={director}
                    currentDirector={currentDirector}
                    index={i}
                    itemScrollHeightVW={itemScrollHeightVW}
                    key={i}
                  />
                )}
              </>
            );
          })}{" "}
        </div>
      </div>
    </MainGrid>
  );
};

export default DirectorTeamDisplay;
