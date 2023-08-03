import React, { MutableRefObject, useEffect, useRef, useState } from "react";
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
  const videoFrame = useRef(0);
  const [isScrubbingVideo, setIsScrubbingVideo] = useState(false);

  useEffect(() => {
    const scrollStartPosition = containerBound.top;
    const scrollHeight =
      containerBound.bottom - scrollStartPosition - videoBounds.height;

    const cancel = scrollY.on("change", (v) => {
      const timeProgress = (v - scrollStartPosition) / scrollHeight;
      const timeProgressClamped = clamp(0, 1, timeProgress);
      videoFrame.current = timeProgressClamped * videoRef.current.duration;

      if (timeProgress > 0 && timeProgress < 1) {
        setIsScrubbingVideo(true);
      } else {
        setIsScrubbingVideo(false);
      }
    });
    return () => cancel();
  }, [videoRef, videoBounds, containerBound]);

  useEffect(() => {
    if (!isScrubbingVideo) return;

    let animFrame = 0;
    const updateFrame = () => {
      videoRef.current.currentTime = videoFrame.current;
      animFrame = requestAnimationFrame(updateFrame);
    };
    animFrame = requestAnimationFrame(updateFrame);

    return () => cancelAnimationFrame(animFrame);
  }, [isScrubbingVideo]);

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
