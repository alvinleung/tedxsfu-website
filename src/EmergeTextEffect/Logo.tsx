import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useContainerScroll } from "@/component/ScrollContainer/ScrollContainer";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import {
  MotionValue,
  motion,
  useMotionValue,
  useTransform,
  animate,
  cubicBezier,
  useAnimate,
  useAnimation,
  useWillChange,
  useInView
} from "framer-motion";
import { useBreakpoint, breakpoints } from "@/hooks/useBreakpoints";
import { useNavContext } from "@/component/Nav/Nav";

type Props = {
  isEnterAnimationDone: boolean;
};

const distSq = (x1: number, y1: number, x2: number, y2: number) => {
  return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
};

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

const LogoAnimationContext = createContext<any>({
  touchAnimProgress: new MotionValue(),
  animProgress: new MotionValue(),
  isEnterAnimationDone: false,
  isInView: false
});

const AnimatedPath = (props: any) => {
  const mousePos = useMousePosition();
  const viewport = useWindowDimension();

  const { touchAnimProgress, animProgress, isEnterAnimationDone } =
    useContext(LogoAnimationContext);

  const { scrollY } = useContainerScroll();

  const [pathRef, bounds] = useBoundingBox([isEnterAnimationDone]);
  const origin = useMemo(() => {
    return {
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    };
  }, [bounds, isEnterAnimationDone]);

  const cursorProgress = useMotionValue(0);
  const lastClampProgress = useRef(0);

  const timeoutRef = useRef<any>();

  useEffect(() => {
    const maxDistSqNorm = 25;
    const distanceSq =
      distSq(origin.x, origin.y, mousePos.x, mousePos.y + scrollY.get()) /
      viewport.width;

    // ease in expo
    const ease = cubicBezier(0.22, 1, 0.36, 1);
    const clampedProgress = 1 - ease(clamp(distanceSq / maxDistSqNorm, 0, 1));

    animate(cursorProgress, clampedProgress, {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    });
    lastClampProgress.current = clampedProgress;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      // reset to normal when mouse is not moving
      animate(cursorProgress, 0, { duration: 1, ease: [0.22, 1, 0.36, 1] });
    }, 200);
  }, [origin, mousePos, viewport, scrollY, isEnterAnimationDone]);

  const animatedProgress = useTransform(
    animProgress,
    (val: number) =>
      (Math.sin(
        val * 0.3 +
          (bounds.y * 3) / viewport.width +
          (bounds.x * 5) / viewport.width,
      ) +
        1) /
      2,
  );

  const animtedProgressEase = useTransform(animatedProgress, [0, 1], [1, 0], {
    ease: cubicBezier(0.16, 1, 0.3, 1),
  });

  const animatedStrokeWidth = useTransform(
    [animtedProgressEase, cursorProgress, touchAnimProgress],
    ([val, cursor, touch]: any) => {
      return (clamp(cursor + val * 0.1, 0, 1) + touch) * 10 + "px";
    },
  );

  return (
    <motion.path
      ref={pathRef}
      strokeWidth={animatedStrokeWidth}
      style={{
        willChange: "stroke-width",
      }}
      stroke={"black"}
      {...props}
    />
  );
};

export const Logo = ({ isEnterAnimationDone }: Props) => {
  const animProgress = useMotionValue(0);
  const touchAnimProgress = useMotionValue(0);
  const { width } = useWindowDimension();
  const { setEventModuleOpenWithoutLogo } = useNavContext();
  const ref = useRef(null);
  const isInView = useInView(ref);
  useEffect(() => {
    setEventModuleOpenWithoutLogo(isInView)
  }, [isInView])

  useEffect(() => {
    if (!isEnterAnimationDone) return;

    let prevTouch = 0;
    let touchDelta = 0;

    let timeout: any = 0;

    const handleTouchMove = (e: TouchEvent) => {
      const currTouch = e.touches[0].clientY;
      touchDelta = currTouch - prevTouch;
      prevTouch = currTouch;

      const newProgress = clamp(
        touchAnimProgress.get() + Math.abs(clamp(touchDelta / 20, -1, 1)),
        0,
        1,
      );
      // touchAnimProgress.set(newProgress);

      // e.preventDefault();
      // e.stopPropagation();

      animate(touchAnimProgress, newProgress, {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      });

      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => {
        // reset to normal when mouse is not moving
        animate(touchAnimProgress, 0, {
          duration: 1,
          ease: [0.22, 1, 0.36, 1],
        });
      }, 300);
    };

    let animFrame = 0;
    function frameUpdate() {
      animProgress.set(animProgress.get() - 0.1);
      animFrame = requestAnimationFrame(frameUpdate);
    }
    animFrame = requestAnimationFrame(frameUpdate);

    const handleTouchStart = (e: TouchEvent) => {
      const currTouch = e.touches[0].clientY;
      touchDelta = 0;
      prevTouch = currTouch;
    };
    const handleTouchEnd = (e: TouchEvent) => {};

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animFrame);
    };
  }, [isEnterAnimationDone]);

  useEffect(() => {
    console.log("Hi "+isInView)
  }, [isInView])

  // const isBiggerThan2xl = useBreakpoint(breakpoints.xl);

  // const condition = (
  //   // width >= breakpoints["2xl"] && {height: "max(11.5vw, 24dvh)", maxHeight: "11.5vw", minHeight:"9rem"}
  //   // ||
  //   // width >= breakpoints.xl && {height: "min(calc(-50vw + 59rem), 24dvh)", maxHeight: "15.4vw", minHeight:"9rem"}
  //   // ||
  //   // width >= breakpoints.lg && {height: "max(calc(46.875vw - 25rem), 24dvh)", maxHeight: "15.4vw"}
  //   // ||
  //   // width >= breakpoints.md && {height: "24dvh", maxHeight: "15.5vw"}
  //   // ||
  //   // // width >= breakpoints.sm && {height: "11vw"}

  //   // // ||

  //   // {minHeight: "69px", height: "20dvh", maxHeight: "22vw"}

  // )


  return (
    <LogoAnimationContext.Provider
      value={{ animProgress, touchAnimProgress, isEnterAnimationDone }}
    >
      <div
        className="sm:w-fit pointer-events-none mt-36 flex flex-col gap-4 xl:mt-grid-margin-y" ref={ref}
        // style={{
        //   marginTop: useBreakpoint(breakpoints.md)
        //     ? "min(max(1rem, calc(-50vw + 33rem)), max(1rem, calc(25dvh - 4rem)))"
        //     : "min(max(calc(-37.5vw + 19rem), 1rem, calc(2rem + 22vw)), max(4rem, calc(25dvh - 4rem)))",
        // }}
      >
        <svg
          className="
          h-baseline
          fill-white"
          // width="363"
          // height="303"
          viewBox="0 0 268 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>TEDxSFU 2023&mdash;Unmask the Magic</title>
          <AnimatedPath
            d="M52.2 10.0267C51.9867 5.90222 50.4933 0.711109 45.4444 0.497776L41.8889 0.355553V0H52.5556V39.1822L26.7422 64H1V63.6444C4.55556 63.6444 7.89778 61.6533 11.5244 51.5556L26.7422 8.74667C28.3778 4.19555 28.52 0.711109 24.9644 0.497776L22.3333 0.355553V0H30.2267L12.7333 51.6267C9.32 61.7244 12.3778 62.2222 15.9333 62.2222H18.7778C24.9644 62.2222 27.4533 62.3644 40.9644 49.6356C51.2044 39.8933 51.9867 31.5733 51.9867 26.24L52.2 10.0267Z"
            fill="white"
          />
          <AnimatedPath
            d="M75.3042 0L96.9931 35.5556V58.7378H96.6375C96.6375 45.2978 96.1397 42.9511 93.7931 36.48C91.1619 29.2267 81.2064 11.8044 78.2908 7.75111C75.6597 4.05333 74.3086 0.355553 62.7886 0.355553V0H75.3042ZM45.4375 64V63.6444C48.9931 63.6444 52.3353 61.5822 55.9619 51.5556L72.8864 4.05333H73.3131L57.1708 51.6267C53.6864 61.7244 56.8153 63.6444 60.3708 63.6444V64H45.4375ZM84.5486 0.355553V0H96.9931V30.2222H96.6375C96.6375 26.5956 96.4953 9.6 95.9264 5.33333C95.6419 3.2 96.0686 0.355553 84.5486 0.355553Z"
            fill="white"
          />
          <AnimatedPath
            d="M127.215 46.9333C127.215 56.7467 133.189 37.8311 134.326 34.7022L143.642 8.88889H143.855L127.215 62.2222H126.504C126.504 51.5556 126.433 19.2 126.149 10.6667C126.006 6.4 125.438 0.355553 114.771 0.355553V0H127.215V46.9333ZM93.4375 64V63.6444C96.9931 63.6444 100.335 61.5822 103.962 51.5556L121.1 3.55555H121.526L105.171 51.6267C101.686 61.7244 104.815 63.6444 108.371 63.6444V64H93.4375ZM138.024 0.355553V0H150.326V48H149.971C149.971 37.3333 149.544 19.2 149.26 10.6667C149.117 6.4 149.26 0.355553 138.024 0.355553Z"
            fill="white"
          />
          <AnimatedPath
            d="M164.528 0H185.861V58.5956H185.577C185.434 54.4 184.937 50.7022 184.439 49.0667C183.159 44.9422 179.461 43.3778 164.528 43.3778V42.6667H185.292C185.292 35.1289 185.363 12.0889 184.794 6.25778C184.012 2.48889 180.883 0.782219 171.639 0.568886L164.528 0.426666V0ZM146.75 64V63.6444C150.306 63.6444 153.648 61.5822 157.274 51.5556L175.052 1.63556H175.479L158.483 51.6267C154.999 61.7244 158.128 63.6444 161.683 63.6444V64H146.75Z"
            fill="white"
          />
          <AnimatedPath
            d="M221.424 0V10.6667H220.997C220.997 7.75111 220.784 7.11111 219.93 5.33333C218.508 2.34666 215.521 0.711109 209.548 0.568886L204.072 0.426666C202.935 3.05778 200.801 9.81333 200.588 10.3111L221.353 31.9289L221.424 56.8889H220.855C220.855 42.6667 219.93 30.4356 199.877 10.3111L203.646 0H221.424ZM182.312 64V63.6444C185.868 63.6444 189.21 61.5111 192.837 51.5556L203.788 21.3333H204.215L194.046 51.6267C190.633 61.7956 193.69 63.6444 202.579 63.6444V64H182.312Z"
            fill="white"
          />
          <AnimatedPath
            d="M242.764 24.5333L262.319 0H267.653C259.262 6.89778 246.319 20.5511 243.617 24.5333H267.653V64H267.297V53.6889C267.297 46.5778 267.226 43.2356 266.515 34.7022C266.159 30.4356 265.591 24.8889 254.924 24.8889H242.764V24.5333ZM217.875 64V63.6444C221.431 63.6444 224.773 61.6533 228.399 51.5556L243.617 8.74667C245.039 4.83556 245.679 0.355553 243.119 0.355553H242.764V0H247.102L229.608 51.6267C226.195 61.7244 229.253 63.6444 232.808 63.6444V64H217.875Z"
            fill="white"
          />
        </svg>

        <svg
          className="h-baseline fill-white"
          // width="363"
          // height="303"
          viewBox="0 0 104 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>TEDxSFU 2023&mdash;Unmask the Magic</title>
          <AnimatedPath
            d="M0 63.6444C3.55556 63.6444 6.89778 61.5822 10.5244 51.5556L28.3022 1.63556H28.7289L11.7333 51.6267C8.24889 61.7244 11.3778 63.6444 14.9333 63.6444V64H0V63.6444ZM0 17.7778V0H54.1156L36.6222 51.6267C33.2089 61.7244 36.2667 63.6444 39.8222 63.6444V64H24.8889V63.6444C28.4444 63.6444 31.7867 61.6533 35.4133 51.5556L48.8533 13.7956C50.4178 9.24444 52.4089 0.568886 47.0756 0.497776L22.9689 0.426666L15.6444 0.639999C7.68 0.853333 5.26222 0.639999 2.84444 3.55555C0.284445 6.68444 0.213333 15.7867 0.213333 17.7778H0ZM72.8889 0.213333V0H103.111V17.7778H102.898C102.898 15.7867 102.756 8.32 100.196 5.26222C97.7778 2.27555 95.36 0.853333 87.3956 0.639999L72.8889 0.213333Z"
            fill="white"
          />
          <AnimatedPath
            d="M76.3733 21.3333L83.4133 1.63556H83.84L77.1556 21.3333H76.3733Z"
            fill="white"
          />
          <AnimatedPath
            d="M77.0133 21.8311L66.8444 51.6267C63.36 61.7244 66.4889 63.6444 70.0444 63.6444H81.28C92.2311 63.6444 92.5867 62.72 96.1422 52.9067L99.2 44.4444H99.5556L93.2267 64H55.1111V63.6444C58.6667 63.6444 62.0089 61.5822 65.6356 51.5556L76.2311 21.8311H77.0133Z"
            fill="white"
          />
          <AnimatedPath
            d="M49.4223 21.3335L49.209 21.8313H77.0134H77.5112C86.2579 21.8313 87.2534 22.1157 89.1734 25.3868C90.0891 27.0068 90.2373 28.836 90.4473 31.4273L90.4534 31.5024H90.6668V21.3335H77.1557H49.4223Z"
            fill="white"
          />
        </svg>
        <svg
          className="h-baseline fill-white"
          // width="363"
          // height="303"
          viewBox="0 0 200 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>TEDxSFU 2023&mdash;Unmask the Magic</title>
          <AnimatedPath
            d="M35.7778 46.9333C35.7778 56.7467 41.7511 37.8311 42.8889 34.7022L52.2044 8.88889H52.4178L35.7778 62.2222H35.0667C35.0667 51.5556 34.9956 19.2 34.7111 10.6667C34.5689 6.4 34 0.355553 23.3333 0.355553V0H35.7778V46.9333ZM2 64V63.6444C5.55556 63.6444 8.89778 61.5822 12.5244 51.5556L29.6622 3.55555H30.0889L13.7333 51.6267C10.2489 61.7244 13.3778 63.6444 16.9333 63.6444V64H2ZM46.5867 0.355553V0H58.8889V48H58.5333C58.5333 37.3333 58.1067 19.2 57.8222 10.6667C57.68 6.4 57.8222 0.355553 46.5867 0.355553Z"
            fill="white"
          />
          <AnimatedPath
            d="M73.0903 0H94.4236V58.5956H94.1392C93.9969 54.4 93.4992 50.7022 93.0014 49.0667C91.7214 44.9422 88.0236 43.3778 73.0903 43.3778V42.6667H93.8547C93.8547 35.1289 93.9258 12.0889 93.3569 6.25778C92.5747 2.48889 89.4458 0.782219 80.2014 0.568886L73.0903 0.426666V0ZM55.3125 64V63.6444C58.8681 63.6444 62.2103 61.5822 65.8369 51.5556L83.6147 1.63556H84.0414L67.0458 51.6267C63.5614 61.7244 66.6903 63.6444 70.2458 63.6444V64H55.3125Z"
            fill="white"
          />
          <AnimatedPath
            d="M135.319 0V21.3333H134.964C134.964 17.7778 135.035 15.36 134.608 10.8089C133.684 2.13333 133.542 0.639999 120.031 0.213333L102.608 51.6267C99.195 61.7244 102.253 63.6444 112.208 63.6444V64H90.875V63.6444C94.4306 63.6444 97.8439 61.5822 101.399 51.5556L119.675 0H135.319ZM110.431 51.2711V51.0578L135.319 34.56V58.5956H135.035C135.035 49.7067 134.893 41.6 132.831 39.8222C130.057 37.4756 119.319 46.2933 110.431 51.2711Z"
            fill="white"
          />
          <AnimatedPath
            d="M157.485 8.74667C158.907 4.83556 160.685 0.924442 154.854 0.426666L153.93 0.355553V0H170.854V0.355553H169.076C161.894 0.355553 160.259 2.20444 159.192 5.40444L143.476 51.6267C140.063 61.7244 142.41 63.6444 147.743 63.6444V64H128.188V63.6444C134.872 63.6444 138.641 61.6533 142.268 51.5556L157.485 8.74667Z"
            fill="white"
          />
          <AnimatedPath
            d="M197.569 0V21.3333H197.214C197.214 17.7778 197.285 15.36 196.858 10.8089C195.934 2.13333 195.792 0.639999 182.281 0.213333L164.858 51.6267C161.445 61.7244 166.707 63.6444 176.663 63.6444H177.516C188.467 63.6444 188.823 62.72 192.378 52.9067L195.436 44.4444H195.792L189.463 64H153.125V63.6444C156.681 63.6444 160.094 61.5822 163.649 51.5556L181.925 0H197.569Z"
            fill="white"
          />
        </svg>
      </div>
    </LogoAnimationContext.Provider>
  );
};

export const useLogoContext = () => useContext(LogoAnimationContext);
