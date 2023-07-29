import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useContainerScroll } from "@/component/ScrollContainer";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { useBoundingBox } from "@/hooks/useBoundingBox";
import { MotionValue, motion, useMotionValue, useTransform, animate, cubicBezier } from "framer-motion";
import { useBreakpoint, breakpoints } from "@/hooks/useBreakpoints";

type Props = {};

const distSq = (x1: number, y1: number, x2: number, y2: number) => {
  return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
};

const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);


const LogoAnimationContext = createContext<MotionValue>(new MotionValue());

const AnimatedPath = (props: any) => {
  const mousePos = useMousePosition();
  const viewport = useWindowDimension();
  const [progress, setProgress] = useState(0);
  // const pathRef = useRef<HTMLElement>();
  const globalProgress = useContext(LogoAnimationContext);

  const [pathRef, bounds] = useBoundingBox([]);
  const origin = useMemo(()=> {
    return {
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
    }
  }, [bounds]);


  const cursorProgress = useMotionValue(0);
  const lastClampProgress = useRef(0);

  const timeoutRef = useRef<any>();

  useEffect(() => {
    const maxDistSqNorm = 150;
    const distanceSq = distSq(origin.x, origin.y, mousePos.x, mousePos.y)/viewport.width;

    // ease in expo
    const ease = cubicBezier(0.22, 1, 0.36, 1);
    const clampedProgress = 1 - ease(clamp(distanceSq / maxDistSqNorm, 0, 1));

    animate(cursorProgress, clampedProgress, {duration: 2, ease: [0.22, 1, 0.36, 1]});
    lastClampProgress.current = clampedProgress;

    if(timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(()=>{
      // reset to normal when mouse is not moving
      animate(cursorProgress, 0, {duration: 4, ease: [0.22, 1, 0.36, 1]});
    }, 100);
    
  }, [origin, mousePos, viewport]);

  const animatedProgress = useTransform(globalProgress,(val:number) => 
    (Math.sin(val*.3 + bounds.y*3/viewport.width + bounds.x*5/viewport.width) + 1)/2  
  );

  // const strokeInteractionProgress = useTransform();

  const animtedProgressEase = useTransform(animatedProgress,[0,1],[1,0], {ease: cubicBezier(0.16, 1, 0.3, 1)});

  const animatedStrokeWidth = useTransform([animtedProgressEase, cursorProgress], ([val, cursor]:any)=>{
      return (clamp((cursor) + ((val * .1)), 0,1)) * 10 + "px";
    })
    

  // useEffect(()=> {
  //   const cleanup = globalProgress.on("change", (val)=>{
  //     const v = (Math.sin(val*.4) + 1)/2;
  //     console.log(v)
  //     setProgress(v);
  //   })

  //   return ()=>{
  //     cleanup();
  //   }
  // },[])

  // reverse
  // const strokeWidth = (1 - progress) * 2;

  // reverse
  // const strokeWidth = (1 - (1 - progress)) * 2;


  return (

    <motion.path
      ref={pathRef}
      // strokeWidth={strokeWidth}
      strokeWidth={animatedStrokeWidth}
      stroke={"black"}
      style={{
        // opacity: strokeWidth > 2 ? 0.3 : 1,
        // transitionProperty: "stroke-width, opacity",
        // transitionDuration: ".4s",
        // transitionDuration: ".3s",
        // transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        // strokeWidth: animatedStrokeWidth
      }}
      {...props}
    />
  );
};

const Logo = (props: Props) => {
  const animProgress = useMotionValue(0);
  const viewport = useWindowDimension();

  useEffect(()=>{
    let prevTouch = 0;
    let touchDelta = 0;

    const handleTouchMove = (e:TouchEvent) => {
      const currTouch = e.touches[0].clientY;
      touchDelta = currTouch - prevTouch;
      prevTouch = currTouch;
      
      animProgress.set(animProgress.get() + touchDelta * .1);
      
      // e.preventDefault();
      // e.stopPropagation();
    }

    let animFrame = 0;
    function frameUpdate() {
      animProgress.set(animProgress.get() - .1);
      animFrame = requestAnimationFrame(frameUpdate)
    }
    animFrame = requestAnimationFrame(frameUpdate)

    const handleTouchStart = (e:TouchEvent) => {
      const currTouch = e.touches[0].clientY;
      touchDelta = 0;
      prevTouch = currTouch;
    }
    const handleTouchEnd = (e:TouchEvent) => {

    }

    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    return ()=>{
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      cancelAnimationFrame(animFrame);
    }
  },[])

  const isBiggerThan2xl = useBreakpoint(breakpoints.xl);

  return (
    <LogoAnimationContext.Provider value={animProgress}>
      <svg
        style={ 
          isBiggerThan2xl ?
          {
            maxWidth: 'min(60vw, 80vh)',
            minWidth: '28rem'
          }
          :
          {
            maxWidth: 'min(85vw, 75vh)'
          }
        }
        className="fill-white"
        // width="363"
        // height="303"
        viewBox="0 0 363 303"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <AnimatedPath d="M72.8975 14.1C72.5975 8.3 70.4975 0.999997 63.3975 0.699998L58.3975 0.499996V0H73.3975V55.1L37.0975 90H0.897461V89.5C5.89746 89.5 10.5975 86.7 15.6975 72.5L37.0975 12.3C39.3975 5.9 39.5975 0.999997 34.5975 0.699998L30.8975 0.499996V0H41.9975L17.3975 72.6C12.5975 86.8 16.8975 87.5 21.8975 87.5H25.8975C34.5975 87.5 38.0975 87.7 57.0975 69.8C71.4975 56.1 72.5975 44.4 72.5975 36.9L72.8975 14.1Z" />
        <AnimatedPath d="M105.388 0L135.888 50V82.6H135.388C135.388 63.7 134.688 60.4 131.388 51.3C127.688 41.1 113.688 16.6 109.588 10.9C105.888 5.7 103.988 0.499996 87.7877 0.499996V0H105.388ZM63.3877 90V89.5C68.3877 89.5 73.0877 86.6 78.1877 72.5L101.988 5.7H102.588L79.8877 72.6C74.9877 86.8 79.3877 89.5 84.3877 89.5V90H63.3877ZM118.388 0.499996V0H135.888V42.5H135.388C135.388 37.4 135.188 13.5 134.388 7.5C133.988 4.5 134.588 0.499996 118.388 0.499996Z" />
        <AnimatedPath d="M175.878 66C175.878 79.8 184.278 53.2 185.878 48.8L198.978 12.5H199.278L175.878 87.5H174.878C174.878 72.5 174.778 27 174.378 15C174.178 9 173.378 0.499996 158.378 0.499996V0H175.878V66ZM128.378 90V89.5C133.378 89.5 138.078 86.6 143.178 72.5L167.278 5H167.878L144.878 72.6C139.978 86.8 144.378 89.5 149.378 89.5V90H128.378ZM191.078 0.499996V0H208.378V67.5H207.878C207.878 52.5 207.278 27 206.878 15C206.678 9 206.878 0.499996 191.078 0.499996Z" />
        <AnimatedPath d="M222.738 0H252.738V82.4H252.338C252.138 76.5 251.438 71.3 250.738 69C248.938 63.2 243.738 61 222.738 61V60H251.938C251.938 49.4 251.338 20.2 250.538 12C249.438 6.7 245.738 0.999997 232.738 0.799996L222.738 0.599999V0ZM197.738 90V89.5C202.738 89.5 207.438 86.6 212.538 72.5L237.538 2.3H238.138L214.238 72.6C209.338 86.8 213.738 89.5 218.738 89.5V90H197.738Z" />
        <AnimatedPath d="M303.099 0V15H302.499C302.499 10.9 302.199 10 300.999 7.5C298.999 3.3 294.799 0.999997 286.399 0.799996L278.699 0.599999C277.099 4.3 274.099 13.8 273.799 14.5L302.999 44.9L303.099 80H302.299C302.299 60 300.999 42.8 272.799 14.5L278.099 0H303.099ZM248.099 90V89.5C253.099 89.5 257.799 86.5 262.899 72.5L278.299 30H278.899L264.599 72.6C259.799 86.9 264.099 89.5 276.599 89.5V90H248.099Z" />
        <AnimatedPath d="M328.099 34.5L355.599 0H363.099C351.299 9.7 333.099 28.9 329.299 34.5H363.099V90H362.599C362.599 80 362.499 60.8 361.499 48.8C360.999 42.8 360.199 35 345.199 35H328.099V34.5ZM293.099 90V89.5C298.099 89.5 302.799 86.7 307.899 72.5L329.299 12.3C331.299 6.8 332.199 0.499996 328.599 0.499996H328.099V0H334.199L309.599 72.6C304.799 86.8 309.099 89.5 314.099 89.5V90H293.099Z" />
        <AnimatedPath d="M95.5723 268C95.5723 281.8 103.972 255.2 105.572 250.8L118.672 214.5H118.972L95.5723 289.5H94.5723C94.5723 274.5 94.4723 229 94.0723 217C93.8723 211 93.0723 202.5 78.0723 202.5V202H95.5723V268ZM48.0723 292V291.5C53.0723 291.5 57.7723 288.6 62.8723 274.5L86.9723 207H87.5723L64.5723 274.6C59.6723 288.8 64.0723 291.5 69.0723 291.5V292H48.0723ZM110.772 202.5V202H128.072V269.5H127.572C127.572 254.5 126.972 229 126.572 217C126.372 211 126.572 202.5 110.772 202.5Z" />
        <AnimatedPath d="M145.582 202H175.582V284.4H175.182C174.982 278.5 174.282 273.3 173.582 271C171.782 265.2 166.582 263 145.582 263V262H174.782C174.782 251.4 174.182 222.2 173.382 214C172.282 208.7 168.582 203 155.582 202.8L145.582 202.6V202ZM120.582 292V291.5C125.582 291.5 130.282 288.6 135.382 274.5L160.382 204.3H160.982L137.082 274.6C132.182 288.8 136.582 291.5 141.582 291.5V292H120.582Z" />
        <AnimatedPath d="M228.043 202V232H227.543C227.543 227 227.643 223.6 227.043 217.2C225.743 205 225.543 202.9 206.543 202.3L182.043 274.6C177.243 288.8 181.543 291.5 195.543 291.5V292H165.543V291.5C170.543 291.5 175.343 288.6 180.343 274.5L206.043 202H228.043ZM193.043 274.1V273.8L228.043 250.6V284.4H227.643C227.643 271.9 227.443 260.5 224.543 258C220.643 254.7 205.543 267.1 193.043 274.1Z" />
        <AnimatedPath d="M259.214 214.3C261.214 208.8 263.714 203.3 255.514 202.6L254.214 202.5V202H276.014V202.5H275.514C265.414 202.5 263.114 205.1 261.614 209.6L239.514 274.6C234.714 288.8 238.014 291.5 245.514 291.5V292H218.014V291.5C227.414 291.5 232.714 288.7 237.814 274.5L259.214 214.3Z" />
        <AnimatedPath d="M318.473 202V232H317.973C317.973 227 318.073 223.6 317.473 217.2C316.173 205 315.973 202.9 296.973 202.3L272.473 274.6C267.673 288.8 271.973 291.5 285.973 291.5H287.173C302.573 291.5 303.073 290.2 308.073 276.4L312.373 264.5H312.873L303.973 292H255.973V291.5C260.973 291.5 265.773 288.6 270.773 274.5L296.473 202H318.473Z" />
        <AnimatedPath opacity="0.9" d="M220.313 128.501L229.313 103.301H229.913L221.313 128.501L220.913 129.701L206.013 173.601C201.113 187.801 205.513 190.501 210.513 190.501H231.313C247.413 190.501 247.913 189.201 252.913 175.401L257.213 163.501H257.713L248.813 191.001H189.513V190.501C194.513 190.501 199.213 187.601 204.313 173.501L219.913 129.701L220.313 128.501Z" />
        <AnimatedPath opacity="0.9" d="M165.505 173.599L180.605 129.199H179.574C179.24 130.189 178.884 131.222 178.505 132.299L163.805 173.499C158.705 187.699 154.005 190.499 149.005 190.499V190.999H170.005V190.499C165.005 190.499 160.705 187.799 165.505 173.599Z" />
        <AnimatedPath opacity="0.9" d="M221.306 128.5H239.506V142.8H239.206C238.906 139.1 238.606 135.7 237.406 133.5C236.006 131.1 235.306 130.2 220.906 129.7H219.906L180.606 129.2H179.575C179.655 128.964 179.733 128.731 179.81 128.5H180.806H220.306H221.306Z" />
        <AnimatedPath d="M180.813 128.5L190.113 101H114.513V126H115.013C115.013 102.7 119.813 101.5 127.113 101.5H147.513C158.113 101.5 178.113 101.4 181.113 104.4C184.306 106.842 185.999 109.989 179.817 128.5H180.813Z" />
        <AnimatedPath d="M112.013 190.5V191H133.013V190.5C128.013 190.5 123.613 187.8 128.513 173.6L152.413 103.3H151.813L126.813 173.5C121.713 187.6 117.013 190.5 112.013 190.5Z" />
        <AnimatedPath opacity="0.9" d="M214.52 101V101.3L234.92 101.9C246.12 102.2 249.52 104.2 252.92 108.4C256.52 112.7 256.72 123.2 256.72 126H257.02V101H214.52Z" />

      </svg>
    </LogoAnimationContext.Provider>
  );
};

export default Logo;
