import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

import arrowTopRight from "../../../public/img/mdi_arrow-top-right.svg";
import MainGrid from "../layouts/MainGrid";

type Props = {};

const EventInfo = (props: Props) => {
  return (
    <>
      <div className="col-start-3">
        <EventInfoLink />
      </div>
      <div className="col-start-4">
        <EventInfoLink />
      </div>
    </>
  );
};

export const EventInfoLink = () => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.a
      href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
      target="_blank"
      className="my-[-3px] flex flex-col text-nav"
      onHoverStart={(e) => {
        setIsHovering(true);
      }}
      onHoverEnd={(e) => {
        setIsHovering(false);
      }}
    >
      <span className="hidden uppercase xs:block">
        Saturday, <br className="hidden xs:block" />
        Nov 11, 2023
      </span>
      <span className="xs:hidden">Sat, Nov 11, 2023</span>
      <span className="mt-1 hidden gap-x-1 tracking-wide opacity-50 xs:flex">
        Calendar
        <motion.div
          animate={{
            x: isHovering ? "0.125rem" : 0,
            y: isHovering ? "-0.125rem" : 0,
          }}
        >
          <Image src={arrowTopRight} alt="" className="h-4 w-auto invert" />
        </motion.div>
      </span>
    </motion.a>
  );
};

export default EventInfo;
