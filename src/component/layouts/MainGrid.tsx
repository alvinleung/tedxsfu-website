import React, { MutableRefObject } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const MainGrid = React.forwardRef((props: Props, ref) => {
  const gridStyling = "grid grid-cols-4 md:grid-cols-6 2xl:grid-cols-8 gap-4";
  const combined = `${props.className} ${gridStyling}`;

  return (
    <div
      {...props}
      className={combined}
      ref={ref as MutableRefObject<HTMLDivElement>}
    >
      {props.children}
    </div>
  );
});

export default MainGrid;
