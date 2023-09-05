import { motion } from "framer-motion";
import React from "react";

type Props = {};

const EventInfoModule = (props: Props) => {
  return (
    <motion.div
      key="details"
      className={`fixed left-4 z-50 
            -mt-[2px] w-full
            max-w-[calc((2*(100vw-5rem)/4)+1rem)] flex-col max-md:bottom-4 max-md:flex 
            xs:grid xs:grid-cols-2 xs:gap-x-4
            md:left-[calc((2*(100vw-7rem)/6)+3rem)] md:top-4 md:col-span-2 md:max-w-[calc((2*(100vw-7rem)/6)+1rem)] lg:col-start-4 2xl:left-[calc((2*(100vw-9rem)/8)+3rem)] 2xl:col-start-6 2xl:max-w-[calc((2*(100vw-9rem)/8)+1rem)]`}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      <motion.a
        href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
        target="_blank"
        className="flex w-fit flex-col text-micro-mobile md:text-micro-tablet"
      >
        <motion.span className="hidden xs:block">
          Saturday, <br className="hidden xs:block" />
          Nov 11, 2023
        </motion.span>
        <motion.span className="xs:hidden">Sat, Nov 11, 2023</motion.span>
        <motion.span className="mt-1 hidden gap-x-4 opacity-50 xs:block">
          Calendar
        </motion.span>
      </motion.a>
      <motion.a
        href="https://goo.gl/maps/yx7ytZ2okDUuF33q7"
        target="_blank"
        className="flex w-fit flex-col text-micro-mobile md:text-micro-tablet"
      >
        <motion.span className="hidden sm:block">
          The Centre for <br className="hidden sm:block" />
          Performing Arts
        </motion.span>
        <motion.span className="sm:hidden">The Centre Vancouver</motion.span>
        <motion.span className="mt-1 flex gap-x-4 opacity-50 xs:block">
          Directions
        </motion.span>
      </motion.a>
    </motion.div>
  );
};

export default EventInfoModule;
