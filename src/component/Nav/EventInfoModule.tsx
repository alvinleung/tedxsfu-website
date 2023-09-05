import { motion } from "framer-motion";
import React from "react";
import MainGrid from "../layouts/MainGrid";

type Props = {};

const EventInfoModule = (props: Props) => {
  return (
    <MainGrid className={`w-full px-4 py-4 `}>
      <a
        href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
        target="_blank"
        className="flex flex-col text-micro-mobile md:col-start-3 md:text-micro-tablet"
      >
        <span className="hidden xs:block">
          Saturday, <br className="hidden xs:block" />
          Nov 11, 2023
        </span>
        <span className="xs:hidden">Sat, Nov 11, 2023</span>
        <span className="mt-1 hidden gap-x-4 opacity-50 xs:block">
          Calendar
        </span>
      </a>
      <a
        href="https://goo.gl/maps/yx7ytZ2okDUuF33q7"
        target="_blank"
        className="flex flex-col text-micro-mobile md:text-micro-tablet"
      >
        <span className="hidden sm:block">
          The Centre for <br className="hidden sm:block" />
          Performing Arts
        </span>
        <span className="sm:hidden">The Centre Vancouver</span>
        <span className="mt-1 hidden flex gap-x-4 opacity-50 xs:block">
          Directions
        </span>
      </a>
    </MainGrid>
  );
};

export default EventInfoModule;
