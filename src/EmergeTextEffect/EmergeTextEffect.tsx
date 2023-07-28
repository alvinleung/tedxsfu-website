import React, { useMemo } from "react";

type Props = {
  children: string;
};

const EmergeTextEffect = ({ children }: Props) => {
  const allText = useMemo(
    () =>
      children.split("").map((letter) => {
        return <Letter letter={letter} />;
      }),
    [children]
  );

  return <div>{allText}</div>;
};

const Letter = ({ letter }: { letter: String }) => {
  return (
    <span
      style={{
        WebkitTextStroke: 5,
        color: "transparent",
        WebkitTextFillColor: "white",
        WebkitTextStrokeColor: "red",
        textTransform: "uppercase",
        // transitionProperty: "all",
        // transitionDuration: "0.2s",
        // transitionTimingFunction: "cubic",
      }}
    >
      {letter}
    </span>
  );
};

export default EmergeTextEffect;
