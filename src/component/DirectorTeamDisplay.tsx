import React from "react";
import { directors } from "../data/team";

type Props = {};

const DirectorTeamDisplay = (props: Props) => {
  return (
    <div className="grid grid-cols-8">
      <div className="col-start-2 col-span-3 pb-[30vh] flex flex-col">
        {directors.map((director, i) => {
          const isOdd = i % 2 == 0;
          return (
            <div className="relative h-[30vh]">
              <img
                className="absolute"
                style={{
                  marginLeft: isOdd ? "0px" : "50%",
                }}
                src={director.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DirectorTeamDisplay;
