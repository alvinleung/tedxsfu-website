import { useContainerScroll } from "@/component/ScrollContainer";
import {
  MutableRefObject,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

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
  dependency?: any[]
): [MutableRefObject<T>, BoundingBoxInfo] {
  const containerRef = useRef<T>() as MutableRefObject<T>;

  const { scrollY } = useContainerScroll();

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

  useLayoutEffect(() => {
    const handleResize = () => {
      const bounds = containerRef.current.getBoundingClientRect();

      setBounds({
        x: bounds.x,
        y: bounds.y + scrollY.get(),
        width: bounds.width,
        height: bounds.height,
        left: bounds.left,
        right: bounds.right,
        top: bounds.top + scrollY.get(),
        bottom: bounds.bottom + scrollY.get(),
      });
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, dependency);

  return [containerRef, bounds];
}
