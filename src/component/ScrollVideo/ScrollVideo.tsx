import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useStickyContainerBounds } from "../ScrollContainer/StickyContainer";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { clamp } from "framer-motion";
import Sticky from "../ScrollContainer/Sticky";

type Props = {
  playbackConst?: number;
  src: string;
};

const ScrollVideo = ({ playbackConst = 150, src }: Props) => {
  const { scrollY, refreshDocumentMeasurement } = useContainerScroll();
  const [scrollHeight, setScrollHeight] = useState(0);

  // const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const containerBound = useStickyContainerBounds();
  const [videoRef, videoBounds] = useBoundingBox<HTMLVideoElement>([]);
  const videoFrame = useRef(0);
  const [isScrubbingVideo, setIsScrubbingVideo] = useState(false);
  const windowDim = useWindowDimension();

  useEffect(() => {
    const scrollStartPosition = containerBound.top;
    const scrollHeight = containerBound.bottom - scrollStartPosition;

    const cancel = scrollY.on("change", (v) => {
      const timeProgress = (v - scrollStartPosition) / scrollHeight;

      const timeProgressClamped = clamp(0, 1, timeProgress);

      videoFrame.current =
        timeProgressClamped * Math.floor(videoRef.current.duration);

      if (timeProgress > 0 && timeProgress < 1) {
        setIsScrubbingVideo(true);
      } else {
        setIsScrubbingVideo(false);
      }
    });
    return () => cancel();
  }, [videoRef, videoBounds, containerBound, windowDim.height]);

  useEffect(() => {
    let animFrame = 0;
    let prevFrameRounded = 0;
    const updateFrame = () => {
      // videoRef.current.fastSeek(videoFrame.current);

      // round current frame to 0.0
      const currentFrameRounded = Math.round(videoFrame.current * 10) / 10;
      const updateThreshold = 0.1;

      // only update frame when it is more than a specific delta
      if (Math.abs(currentFrameRounded - prevFrameRounded) > updateThreshold) {
        videoRef.current.currentTime = currentFrameRounded;
      }
      prevFrameRounded = currentFrameRounded;

      animFrame = requestAnimationFrame(updateFrame);
    };

    // only update to the last or first frame
    if (!isScrubbingVideo) {
      updateFrame();
      return;
    }

    animFrame = requestAnimationFrame(updateFrame);

    return () => cancelAnimationFrame(animFrame);
  }, [isScrubbingVideo]);

  const handleMetaDataLoaded = () => {
    setScrollHeight(Math.floor(videoRef.current.duration) * playbackConst);
  };
  useEffect(() => {
    refreshDocumentMeasurement();
  }, [scrollHeight]);

  return (
    <div
      style={{
        height: scrollHeight,
      }}
    >
      <Sticky top={"0px"}>
        <video
          onLoadedMetadata={handleMetaDataLoaded}
          //@ts-ignore
          autobuffer="autobuffer"
          preload="preload"
          ref={videoRef}
          // src="./about/about-intro-video.mp4"
          loop
          muted
          // autoPlay
          className="h-[100vh] w-[100vw]"
          style={{
            zIndex: -1000,
          }}
        >
          {/* <source
          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
          src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
        ></source> */}
          <source
            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            // src="./about/about-intro-video.mp4"
            src={src}
          ></source>
        </video>
      </Sticky>
    </div>
  );
};

export default ScrollVideo;
