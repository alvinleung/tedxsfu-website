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

  useEffect(() => {
    const maxDistSq = Math.min(70000, viewport.width * 32);
    const distanceSq = distSq(origin.x, origin.y, mousePos.x, mousePos.y);
    const clampedProgress = clamp(distanceSq / maxDistSq, 0, 1);
    // setProgress(clampedProgress);
    // console.log(scrollY.get());
    animate(cursorProgress, clampedProgress, {duration: .2, ease: [0.22, 1, 0.36, 1]});
    
  }, [origin, mousePos]);

  const animatedProgress = useTransform(globalProgress,(val:number) => 
    (Math.sin(val*.3 + bounds.y*0.01 + bounds.x *0.005) + 1)/2  
  );

  // const strokeInteractionProgress = useTransform();

  const animtedProgressEase = useTransform(animatedProgress,[0,1],[0,1], {ease: cubicBezier(0.7, 0, 0.84, 0)});

  const animatedStrokeWidth = useTransform([animtedProgressEase, cursorProgress], ([val, cursor]:any)=>{
      return (clamp(cursor * (val * .15), 0,1)) * 8 + "px";
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
      
      animProgress.set(animProgress.get() + touchDelta * .15);
      
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
            maxWidth: 'min(70vw, 72rem, 90vh)'
          }
          :
          {
            maxWidth: 'min(90vw, 28rem)'
          }
        }
        className="fill-white"
        // width="363"
        // height="303"
        viewBox="0 0 363 303"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <AnimatedPath d="M72.3848 14.1C72.0848 8.3 69.9848 0.999997 62.8848 0.699998L57.8848 0.499996V0H72.8848V55.1L36.5848 90H0.384766V89.5C5.38477 89.5 10.0848 86.7 15.1848 72.5L36.5848 12.3C38.8848 5.9 39.0848 0.999997 34.0848 0.699998L30.3848 0.499996V0H41.4848L16.8848 72.6C12.0848 86.8 16.3848 87.5 21.3848 87.5H25.3848C34.0848 87.5 37.5848 87.7 56.5848 69.8C70.9848 56.1 72.0848 44.4 72.0848 36.9L72.3848 14.1Z" />
        <AnimatedPath d="M104.875 0L135.375 50V82.6H134.875C134.875 63.7 134.175 60.4 130.875 51.3C127.175 41.1 113.175 16.6 109.075 10.9C105.375 5.7 103.475 0.499996 87.275 0.499996V0H104.875ZM62.875 90V89.5C67.875 89.5 72.575 86.6 77.675 72.5L101.475 5.7H102.075L79.375 72.6C74.475 86.8 78.875 89.5 83.875 89.5V90H62.875ZM117.875 0.499996V0H135.375V42.5H134.875C134.875 37.4 134.675 13.5 133.875 7.5C133.475 4.5 134.075 0.499996 117.875 0.499996Z" />
        <AnimatedPath d="M175.365 66C175.365 79.8 183.765 53.2 185.365 48.8L198.465 12.5H198.765L175.365 87.5H174.365C174.365 72.5 174.265 27 173.865 15C173.665 9 172.865 0.499996 157.865 0.499996V0H175.365V66ZM127.865 90V89.5C132.865 89.5 137.565 86.6 142.665 72.5L166.765 5H167.365L144.365 72.6C139.465 86.8 143.865 89.5 148.865 89.5V90H127.865ZM190.565 0.499996V0H207.865V67.5H207.365C207.365 52.5 206.765 27 206.365 15C206.165 9 206.365 0.499996 190.565 0.499996Z" />
        <AnimatedPath d="M222.225 0H252.225V82.4H251.825C251.625 76.5 250.925 71.3 250.225 69C248.425 63.2 243.225 61 222.225 61V60H251.425C251.425 49.4 250.825 20.2 250.025 12C248.925 6.7 245.225 0.999997 232.225 0.799996L222.225 0.599999V0ZM197.225 90V89.5C202.225 89.5 206.925 86.6 212.025 72.5L237.025 2.3H237.625L213.725 72.6C208.825 86.8 213.225 89.5 218.225 89.5V90H197.225Z" />
        <AnimatedPath d="M302.586 0V15H301.986C301.986 10.9 301.686 10 300.486 7.5C298.486 3.3 294.286 0.999997 285.886 0.799996L278.186 0.599999C276.586 4.3 273.586 13.8 273.286 14.5L302.486 44.9L302.586 80H301.786C301.786 60 300.486 42.8 272.286 14.5L277.586 0H302.586ZM247.586 90V89.5C252.586 89.5 257.286 86.5 262.386 72.5L277.786 30H278.386L264.086 72.6C259.286 86.9 263.586 89.5 276.086 89.5V90H247.586Z" />
        <AnimatedPath d="M327.586 34.5L355.086 0H362.586C350.786 9.7 332.586 28.9 328.786 34.5H362.586V90H362.086C362.086 80 361.986 60.8 360.986 48.8C360.486 42.8 359.686 35 344.686 35H327.586V34.5ZM292.586 90V89.5C297.586 89.5 302.286 86.7 307.386 72.5L328.786 12.3C330.786 6.8 331.686 0.499996 328.086 0.499996H327.586V0H333.686L309.086 72.6C304.286 86.8 308.586 89.5 313.586 89.5V90H292.586Z" />
        <AnimatedPath d="M95.0596 268C95.0596 281.8 103.46 255.2 105.06 250.8L118.16 214.5H118.46L95.0596 289.5H94.0596C94.0596 274.5 93.9596 229 93.5596 217C93.3596 211 92.5596 202.5 77.5596 202.5V202H95.0596V268ZM47.5596 292V291.5C52.5596 291.5 57.2596 288.6 62.3596 274.5L86.4596 207H87.0596L64.0596 274.6C59.1596 288.8 63.5596 291.5 68.5596 291.5V292H47.5596ZM110.26 202.5V202H127.56V269.5H127.06C127.06 254.5 126.46 229 126.06 217C125.86 211 126.06 202.5 110.26 202.5Z" />
        <AnimatedPath d="M145.069 202H175.069V284.4H174.669C174.469 278.5 173.769 273.3 173.069 271C171.269 265.2 166.069 263 145.069 263V262H174.269C174.269 251.4 173.669 222.2 172.869 214C171.769 208.7 168.069 203 155.069 202.8L145.069 202.6V202ZM120.069 292V291.5C125.069 291.5 129.769 288.6 134.869 274.5L159.869 204.3H160.469L136.569 274.6C131.669 288.8 136.069 291.5 141.069 291.5V292H120.069Z" />
        <AnimatedPath d="M227.53 202V232H227.03C227.03 227 227.13 223.6 226.53 217.2C225.23 205 225.03 202.9 206.03 202.3L181.53 274.6C176.73 288.8 181.03 291.5 195.03 291.5V292H165.03V291.5C170.03 291.5 174.83 288.6 179.83 274.5L205.53 202H227.53ZM192.53 274.1V273.8L227.53 250.6V284.4H227.13C227.13 271.9 226.93 260.5 224.03 258C220.13 254.7 205.03 267.1 192.53 274.1Z" />
        <AnimatedPath d="M258.701 214.3C260.701 208.8 263.201 203.3 255.001 202.6L253.701 202.5V202H275.501V202.5H275.001C264.901 202.5 262.601 205.1 261.101 209.6L239.001 274.6C234.201 288.8 237.501 291.5 245.001 291.5V292H217.501V291.5C226.901 291.5 232.201 288.7 237.301 274.5L258.701 214.3Z" />
        <AnimatedPath d="M317.96 202V232H317.46C317.46 227 317.56 223.6 316.96 217.2C315.66 205 315.46 202.9 296.46 202.3L271.96 274.6C267.16 288.8 271.46 291.5 285.46 291.5H286.66C302.06 291.5 302.56 290.2 307.56 276.4L311.86 264.5H312.36L303.46 292H255.46V291.5C260.46 291.5 265.26 288.6 270.26 274.5L295.96 202H317.96Z" />
        <AnimatedPath d="M111.5 191V190.5C116.5 190.5 121.2 187.6 126.3 173.5L151.3 103.3H151.9L128 173.6C123.1 187.8 127.5 190.5 132.5 190.5V191H111.5ZM214 101.3V101H256.5V126H256.2C256.2 123.2 256 112.7 252.4 108.4C249 104.2 245.6 102.2 234.4 101.9L214 101.3Z" />
        <AnimatedPath d="M165 173.6C160.2 187.8 164.5 190.5 169.5 190.5V191H148.5V190.5C153.5 190.5 158.2 187.7 163.3 173.5L178 132.3C178.378 131.224 178.734 130.193 179.068 129.204H180.061L165 173.6Z" />
        <AnimatedPath d="M189.6 101L180.3 128.5H179.304C185.487 109.989 183.793 106.842 180.6 104.4C177 101.5 172.4 101.5 147 101.5H126.6C119.3 101.5 114.5 102.7 114.5 126H114V101H189.6Z" />
        <AnimatedPath d="M228.8 103.301L219.8 128.501H220.8L229.4 103.301H228.8Z" />
        <AnimatedPath d="M205.5 173.601L220.4 129.701H219.4L203.8 173.501C198.7 187.601 194 190.501 189 190.501V191.001H248.3L257.2 163.501H256.7L252.4 175.401C247.4 189.201 246.9 190.501 230.8 190.501H210C205 190.501 200.6 187.801 205.5 173.601Z" />
        <AnimatedPath d="M220.8 128.5H179.3L179.07 129.2C197.87 129.3 212.2 129.4 220.4 129.7C234.8 130.2 235.5 131.1 236.9 133.5C238.1 135.7 238.4 139.1 238.7 142.8H239V128.5H220.8Z" />
      </svg>
    </LogoAnimationContext.Provider>
  );
};

export default Logo;
