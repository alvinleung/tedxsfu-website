import { useContainerScroll } from "@/component/ScrollContainer/ScrollContainer";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useWindowDimension } from "./useWindowDimension";
import { useTransitionContext } from "@/component/transition/TransitionEffect";
import { useIsPresent } from "framer-motion";

type BoundingBoxInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export function useBoundingBox<T extends HTMLElement>(
  dependency: any[],
): [MutableRefObject<T>, BoundingBoxInfo] {
  const containerRef = useRef<T>() as MutableRefObject<T>;

  const { scrollY, scrollHeight } = useContainerScroll();
  const windowDim = useWindowDimension();
  const { isTransitionDone } = useTransitionContext();
  // const isPresent = useIsPresent();

  const [bounds, setBounds] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  // useLayoutEffect(() => {
  //   const handleResize = () => {
  //     const bounds = containerRef.current.getBoundingClientRect();

  //     // console.log(scrollY.get());

  //     setBounds({
  //       x: bounds.x,
  //       y: bounds.y + scrollY.get(),
  //       width: bounds.width,
  //       height: bounds.height,
  //       left: bounds.left,
  //       right: bounds.right,
  //       top: bounds.top + scrollY.get(),
  //       bottom: bounds.bottom + scrollY.get(),
  //     });
  //   };

  //   window.addEventListener("resize", handleResize);
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, dependency);

  // const dep = dependency;

  useLayoutEffect(() => {
    // don't update layout when it is transitioning away
    // if (!isPresent) return;
    if (containerRef.current === null) return;
    const bounds = containerRef.current.getBoundingClientRect();

    // use previous position in framer motion to catch
    // a more accurate offset. the current value is not the one that will
    // match the bounding box value for some reason
    const scrollOffset = scrollY.getPrevious();

    setBounds({
      x: bounds.x,
      y: bounds.y + scrollOffset,
      width: bounds.width,
      height: bounds.height,
      left: bounds.left,
      right: bounds.right,
      top: bounds.top + scrollOffset,
      bottom: bounds.bottom + scrollOffset,
    });
  }, [windowDim, isTransitionDone, scrollHeight, ...dependency]);

  return [containerRef, bounds];
}
