import { useBoundingBox } from "@/hooks/useBoundingBox";
import React, { createContext, useContext, useEffect } from "react";
import { useContainerScroll } from "./ScrollContainer";

type Props = {
  children: React.ReactNode;
};

const StickyContainerContext = createContext({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  height: 0,
  width: 0,
  x: 0,
  y: 0,
});

const StickyContainer = ({ children }: Props) => {
  const { scrollHeight, isUsingSmoothScroll } = useContainerScroll();
  const [containerRef, bounds] = useBoundingBox<HTMLDivElement>([scrollHeight]);

  return (
    <div ref={containerRef}>
      <StickyContainerContext.Provider value={bounds}>
        {children}
      </StickyContainerContext.Provider>
    </div>
  );
};

export function useStickyContainerBounds() {
  return useContext(StickyContainerContext);
}

export default StickyContainer;
