import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import MainGrid from "../layouts/MainGrid";
import { pastActivities } from "@/data/pastActivitiesData";
import Sticky from "../ScrollContainer/Sticky";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import MediaSlide from "./MediaSlide";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import {
  AnimateSharedLayout,
  LayoutGroup,
  clamp,
  motion,
  useTransform,
} from "framer-motion";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import Fixed from "../ScrollContainer/Fixed";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  onScrolledPastGallery: () => void;
  onScrolledBeforeGallery: () => void;
};

interface ActivityMedia {
  src: string;
  format: "landscape" | "square";
  type: "image";
}

type ActivityMediaWithInfo = Omit<Activity & ActivityMedia, "media">;

interface Activity {
  month: string;
  day: string;
  date: string;
  header: string;
  description: string;
  media: ActivityMedia[];
}

type Month =
  | "jan"
  | "feb"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec";

interface ActivitiesByMonth {
  month: Month;
  activities: Activity[];
}

const ActivityGallery = ({
  onScrolledPastGallery,
  onScrolledBeforeGallery,
}: Props) => {
  const activitiesByMonth = useMemo(() => {
    let activitiesByMonth: ActivitiesByMonth[] = [];
    pastActivities.forEach((currActivity) => {
      const foundMonthIndex = activitiesByMonth.findIndex(
        (monthActivity) => monthActivity.month === currActivity.month,
      );
      let monthIndex = foundMonthIndex;
      if (foundMonthIndex === -1) {
        activitiesByMonth.push({
          month: currActivity.month as Month,
          activities: [],
        });
        monthIndex = activitiesByMonth.length - 1;
      }

      const currentMonth = activitiesByMonth[monthIndex];
      currentMonth.activities.push(currActivity as Activity);
    });
    return activitiesByMonth;
  }, []);

  const isDesktopView = useBreakpoint(breakpoints.md);
  const windowDim = useWindowDimension();

  const perItemScrollHeight = useMemo(() => 1200, []);

  const galleryTotalScrollHeight = useMemo(() => {
    // half a scroll per activity
    return perItemScrollHeight * pastActivities.length;
  }, [pastActivities, perItemScrollHeight]);

  const allMedia = useMemo(() => {
    return pastActivities.reduce((result, currActivity) => {
      const activityMedia = currActivity.media as ActivityMedia[];
      const mediaArr = activityMedia.reduce((result, currMedia) => {
        result.push({
          ...currActivity,
          ...currMedia,
        });
        return result;
      }, [] as ActivityMediaWithInfo[]);
      return result.concat(mediaArr);
    }, [] as ActivityMediaWithInfo[]) as ActivityMediaWithInfo[];
  }, []);

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlideIndexClamped = useMemo(
    () => clamp(0, allMedia.length - 1, currentSlideIndex),
    [currentSlideIndex],
  );
  const currentSlideMonth = useMemo(
    () => allMedia[currentSlideIndexClamped].month,
    [currentSlideIndexClamped],
  );
  const currentSlideMonthIndex = useMemo(
    () =>
      activitiesByMonth.findIndex(
        (activityInMonth) => activityInMonth.month === currentSlideMonth,
      ),
    [currentSlideMonth, activitiesByMonth],
  );

  const isSectionActive = useMemo(
    () => currentSlideIndex == currentSlideIndexClamped,
    [currentSlideIndex],
  );

  const isPastGallery = useMemo(
    () => currentSlideIndex >= allMedia.length,
    [currentSlideIndex],
  );

  useEffect(() => {
    if (isPastGallery) {
      onScrolledPastGallery();
      return;
    }
    onScrolledBeforeGallery();
  }, [isPastGallery]);

  const [containerRef, bounds] = useBoundingBox([]);
  const { scrollY, scrollTo } = useContainerScroll();

  useEffect(() => {
    setCurrentSlideIndex(0);
    const updateSlide = (v: number) => {
      const itemHeight = (bounds.height - windowDim.height) / allMedia.length;
      const currentItem = Math.round((v - bounds.top) / itemHeight);
      setCurrentSlideIndex(currentItem);
    };

    const cleanup = scrollY.on("change", updateSlide);
    updateSlide(scrollY.get());

    return () => {
      cleanup();
    };
  }, [bounds, allMedia, windowDim, scrollY]);

  const slideIndexContinuousValue = useTransform(scrollY, (latest) => {
    const itemHeight = (bounds.height - windowDim.height) / allMedia.length;
    const currentItem = (latest - bounds.top) / itemHeight;
    return currentItem;
  });

  const [monthContainerRef, monthContainerBound] =
    useBoundingBox<HTMLDivElement>([]);

  const gotoMonth = (month: string) => {
    const monthTargetIndex = allMedia.findIndex((media) => {
      return media.month === month;
    });
    const itemHeight = (bounds.height - windowDim.height) / allMedia.length;

    scrollTo(bounds.top + monthTargetIndex * itemHeight, true);
  };

  return (
    <>
      {!isDesktopView && (
        <Sticky top={"15vh"}>
          <motion.div
            className="flex h-0 flex-col text-micro-mobile"
            animate={{
              opacity:
                currentSlideIndex >= 0 && currentSlideIndex < allMedia.length
                  ? 1
                  : 0,
            }}
          >
            <div className="mx-auto mb-1 w-2/4 flex-shrink-0 text-center text-body-mobile">
              {allMedia[currentSlideIndexClamped].header}
            </div>
            <div className="mx-auto mb-2 w-2/4 text-center opacity-50">
              {allMedia[currentSlideIndexClamped].description}
            </div>
            <div className="mx-auto w-2/4 text-center capitalize opacity-50">
              {allMedia[currentSlideIndexClamped].month}{" "}
              {allMedia[currentSlideIndexClamped].day}
            </div>
          </motion.div>
        </Sticky>
      )}
      <MainGrid ref={containerRef} className="relative">
        <div className="col-span-full col-start-1 hidden md:col-span-1 md:block 2xl:col-start-2">
          <Sticky top={"140px"} fadeOut className="pt-[6dvh]">
            <motion.div
              className="flex h-[50dvh] flex-col items-end pt-[20vh] 2xl:items-start"
              // style={{ height: windowDim.height * perItemScrollVH }}

              animate={{
                opacity: isSectionActive ? 1 : 0,
              }}
            >
              <div className="mb-4">2023</div>
              <div className="relative flex flex-col" ref={monthContainerRef}>
                <motion.div
                  className="absolute -left-2 top-2 h-1 w-1 bg-black"
                  animate={{
                    y:
                      currentSlideMonthIndex *
                      (monthContainerBound.height / activitiesByMonth.length),
                    transition: {
                      duration: AnimationConfig.FAST,
                      ease: AnimationConfig.EASING,
                    },
                  }}
                />
                {activitiesByMonth.map((monthActivity, index) => (
                  <motion.button
                    onClick={() => gotoMonth(monthActivity.month)}
                    className="text-body uppercase"
                    key={index}
                    animate={{
                      opacity:
                        currentSlideMonth === monthActivity.month ? 1 : 0.5,
                    }}
                  >
                    {monthActivity.month}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </Sticky>
        </div>
        <div
          className="col-span-full md:col-span-4 lg:col-span-4 2xl:col-start-3"
          style={{
            height: galleryTotalScrollHeight,
          }}
        >
          <Sticky top={"140px"} className="pt-[6dvh]">
            <div className="relative h-[60dvh]">
              {allMedia.map((media, index) => {
                return (
                  <MediaSlide
                    src={media.src}
                    currentSlideIndex={currentSlideIndexClamped}
                    slideCount={allMedia.length}
                    slideIndex={index}
                    slideIndexContinuousValue={slideIndexContinuousValue}
                    key={index}
                  />
                );
              })}
            </div>
          </Sticky>
        </div>
        <motion.div
          className="col-span-full col-start-1 md:col-span-1 2xl:col-start-8"
          animate={{
            opacity: isSectionActive ? 1 : 0,
          }}
        >
          {isDesktopView && (
            <Sticky top={"140px"} fadeOut className="pt-[6dvh]">
              <SlideInfo slide={allMedia[currentSlideIndexClamped]} />
            </Sticky>
          )}
        </motion.div>
      </MainGrid>
    </>
  );
};

const SlideInfo = ({ slide }: { slide: any }) => (
  <div className="flex h-[30vh] flex-col pt-[20vh]">
    <div className="mb-4 text-micro-mobile lg:text-body">{slide.header}</div>
    <div className="text-micro-mobile opacity-50 lg:text-body">
      {slide.description}
    </div>
    <div className="mt-16 text-micro-mobile capitalize opacity-50 lg:text-body">
      {slide.month} {slide.day}
    </div>
  </div>
);

export default ActivityGallery;
