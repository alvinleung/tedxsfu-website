import { useWindowDimension } from "@/hooks/useWindowDimension";
import React, { useMemo } from "react";

type Props = {
  children: React.ReactNode;
};

const BaselineGridContext = ({ children }: Props) => {
  const windowDim = useWindowDimension();
  const intervalValue = useMemo(() => {
    const isPortrait = windowDim.height > windowDim.width;
    if (isPortrait) return "20vw";
    return "20vh";
  }, [windowDim]);

  return (
    <div
      style={
        {
          "--baseline-grid-interval": intervalValue,
        } as any
      }
    >
      {children}
    </div>
  );
};

export default BaselineGridContext;
