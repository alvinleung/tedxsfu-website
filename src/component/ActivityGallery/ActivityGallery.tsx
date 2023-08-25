import React, { useEffect, useMemo, useState } from "react";
import MainGrid from "../layouts/MainGrid";
import { pastActivities } from "@/data/pastActivitiesData";
import Sticky from "../ScrollContainer/Sticky";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import MediaSlide from "./MediaSlide";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { clamp, motion } from "framer-motion";

type Props = {};

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

const ActivityGallery = (props: Props) => {
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

  const windowDim = useWindowDimension();

  const perItemScrollVH = 1; // 0.5 vh
  const galleryTotalScrollHeight = useMemo(() => {
    // half a scroll per activity
    return windowDim.height * perItemScrollVH * pastActivities.length;
  }, [pastActivities, windowDim.height]);

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
  const isSectionActive = useMemo(
    () => currentSlideIndex == currentSlideIndexClamped,
    [currentSlideIndex],
  );

  const [containerRef, bounds] = useBoundingBox([]);
  const { scrollY } = useContainerScroll();
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
  }, [bounds, allMedia, windowDim]);

  console.log(currentSlideIndexClamped);

  return (
    <MainGrid ref={containerRef}>
      <div className="col-start-2">
        <Sticky top={"20vh"} fadeOut>
          <div
            className="pt-[20vh]"
            style={{ height: windowDim.height * perItemScrollVH }}
          >
            <div className="mb-4">2023</div>
            {activitiesByMonth.map((month) => (
              <div className="text-body uppercase">{month.month}</div>
            ))}
          </div>
        </Sticky>
        <div
          style={{
            height: galleryTotalScrollHeight,
          }}
        ></div>
      </div>
      <div className="col-span-4 col-start-3">
        <Sticky top={"20vh"}>
          <div
            className="relative col-span-2"
            style={{ height: windowDim.height * perItemScrollVH }}
          >
            {allMedia.map((media, index) => {
              return (
                <MediaSlide
                  src={media.src}
                  currentSlideIndex={currentSlideIndexClamped}
                  slideIndex={index}
                />
              );
            })}
          </div>
        </Sticky>
      </div>
      <motion.div
        className="col-span-1 col-start-8"
        animate={{
          opacity: isSectionActive ? 1 : 0,
        }}
      >
        <Sticky top={"40vh"}>
          <div className="mt-[20vh] flex h-[30vh] flex-col">
            <div className="mb-4  text-body">
              {allMedia[currentSlideIndexClamped].header}
            </div>
            <div className="text-body opacity-50">
              {allMedia[currentSlideIndexClamped].description}
            </div>
            <div className="mt-auto text-body capitalize opacity-50">
              {allMedia[currentSlideIndexClamped].month}{" "}
              {allMedia[currentSlideIndexClamped].day}
            </div>
          </div>
        </Sticky>
      </motion.div>
    </MainGrid>
  );
};

export default ActivityGallery;
