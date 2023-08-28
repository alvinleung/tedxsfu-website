import React, {
  MutableRefObject,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import StickyContainer, {
  useStickyContainerBounds,
} from "../ScrollContainer/StickyContainer";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { clamp, motion } from "framer-motion";
import Sticky from "../ScrollContainer/Sticky";

type Props = {
  playbackConst?: number;
  src: {
    webm: string;
    mp4: string;
  };
};

const ScrollVideo = ({ playbackConst = 150, src }: Props) => {
  const { scrollY, refreshDocumentMeasurement, scrollHeight } =
    useContainerScroll();
  const [videoScrollDistance, setVideoScrollDistance] = useState(0);

  // const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;
  const containerBound = useStickyContainerBounds();
  const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;
  // const [videoRef, videoBounds] = useBoundingBox<HTMLVideoElement>([]);
  const videoFrame = useRef(0);
  const [isScrubbingVideo, setIsScrubbingVideo] = useState(false);
  const windowDim = useWindowDimension();

  useEffect(() => {
    const scrollStartPosition = containerBound.top;
    const videoScrollDistance = containerBound.bottom - scrollStartPosition;

    const cancel = scrollY.on("change", (v) => {
      const timeProgress = (v - scrollStartPosition) / videoScrollDistance;

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
  }, [containerBound, windowDim.height]);

  useEffect(() => {
    let animFrame = 0;
    let prevFrameRounded = 0;
    const updateFrame = () => {
      if (!videoFrame.current) {
        animFrame = requestAnimationFrame(updateFrame);
        return;
      }
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
    setVideoScrollDistance(
      Math.floor(videoRef.current.duration) * playbackConst,
    );
  };

  useEffect(() => {
    videoRef.current.load();
  }, [videoRef]);

  useEffect(() => {
    refreshDocumentMeasurement();
  }, [videoScrollDistance]);

  return (
    <div
      style={{
        height: videoScrollDistance,
      }}
      className="flex flex-col items-start"
    >
      <Sticky top={"0px"}>
        <motion.video
          onLoadedMetadata={handleMetaDataLoaded}
          //@ts-ignore
          autobuffer="autobuffer"
          preload="preload"
          ref={videoRef}
          // src="./about/about-intro-video.mp4"
          loop
          muted
          // autoPlay
          className="h-[100vh] w-[100vw] object-cover"
          style={{
            zIndex: -1000,
            scale: 1.07,
          }}
        >
          {/* <source
          type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
          src="https://www.apple.com/media/us/mac-pro/2013/16C1b6b5-1d91-4fef-891e-ff2fc1c1bb58/videos/macpro_main_desktop.mp4"
        ></source> */}
          <source
            type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'
            src={src.mp4}
          ></source>
          <source
            // webm command
            // ffmpeg -i about-intro-video.mp4 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus output.webm
            // ffmpeg -i about-intro-video.mp4 -keyint_min 30 -g 30 -c:v libvpx-vp9 -crf 30 -b:v 0 -b:a 128k -c:a libopus output.webm

            // how to make webm to play smoothly
            // https://forum.videohelp.com/threads/389787-Using-ffmpeg-to-make-an-html5-webm-video-scroll-smoothly
            // type='video/mp4; codecs="avc1.42E01E, mp4a.40.2"'

            // more resource on a vue component
            // https://github.com/diracleo/vue-scrubbable-video
            type='video/webm; codecs="vp9, opus"'
            // src="./about/about-intro-video.mp4"
            src={src.webm}
          ></source>
        </motion.video>
      </Sticky>
    </div>
  );
};

export default ScrollVideo;
