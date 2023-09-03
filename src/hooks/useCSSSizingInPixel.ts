import { useEffect, useMemo } from "react";
import { useWindowDimension } from "./useWindowDimension";

export type CSSSizingValue = string | number;
export function useCSSSizingInPixel(cssValue: CSSSizingValue) {
  const windowDim = useWindowDimension();
  const pixel = useMemo<number>(() => {
    if (typeof cssValue === "string") {
      if ((cssValue as String).includes("vh")) {
        return windowDim.height * parseFloat(cssValue) * 0.01;
      }
      if ((cssValue as String).includes("vw")) {
        return windowDim.width * parseFloat(cssValue) * 0.01;
      }
      if ((cssValue as String).includes("px")) {
        return parseFloat(cssValue);
      }
      return parseFloat(cssValue);
    }
    return cssValue;
  }, [cssValue, windowDim]);

  return pixel;
}
