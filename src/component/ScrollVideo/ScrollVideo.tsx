import React, { MutableRefObject, useEffect, useRef } from "react";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useStickyContainerBounds } from "../ScrollContainer/StickyContainer";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { clamp } from "framer-motion";

type Props = {};

const ScrollVideo = (props: Props) => {
  const { scrollY } = useContainerScroll();

  // const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const containerBound = useStickyContainerBounds();
  const [videoRef, videoBounds] = useBoundingBox<HTMLVideoElement>([]);

  useEffect(() => {
    const scrollStartPosition = containerBound.top;
    const scrollHeight =
      containerBound.bottom - scrollStartPosition - videoBounds.height;

    const cancel = scrollY.on("change", (v) => {
      const timeProgress = (v - scrollStartPosition) / scrollHeight;
      const timeProgressClamped = clamp(0, 1, timeProgress);
      videoRef.current.currentTime =
        timeProgressClamped * videoRef.current.duration;
    });
    return () => cancel();
  }, [videoRef, videoBounds, containerBound]);

  return (
    <>
      <video
        ref={videoRef}
        src="./about/about-intro-video.mp4"
        loop
        muted
        // autoPlay
        className="h-[100vh]"
        style={{
          zIndex: -1000,
        }}
      />
    </>
  );
};

export default ScrollVideo;
