import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import MainGrid from "../layouts/MainGrid";
import arrowTopRight from "../../../public/img/mdi_arrow-top-right.svg";

type Props = {
  className?: string;
};

export const EventInfoModule = (props: Props) => {
  const [hover, setHover] = useState("");
  return (
    <MainGrid className={`w-full px-grid-margin-x py-grid-margin-y `}>
      <motion.a
        href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
        target="_blank"
        className="flex flex-col text-micro-mobile uppercase md:col-start-3 md:text-micro-tablet"
        onHoverStart={(e) => {
          setHover("date");
        }}
        onHoverEnd={(e) => {
          setHover("");
        }}
      >
        <span className="hidden xs:block">
          Saturday, <br className="hidden xs:block" />
          Nov 11, 2023
        </span>
        <span className="xs:hidden">Sat, Nov 11, 2023</span>
        <span className="mt-1 hidden gap-x-1 opacity-50 xs:flex">
          Calendar
          <motion.div
            animate={{
              x: hover === "date" ? "0.125rem" : 0,
              y: hover === "date" ? "-0.125rem" : 0,
            }}
          >
            <Image src={arrowTopRight} alt="" className="h-4 w-auto invert" />
          </motion.div>
        </span>
      </motion.a>
      <motion.a
        href="https://goo.gl/maps/yx7ytZ2okDUuF33q7"
        target="_blank"
        className="flex flex-col text-micro-mobile uppercase md:text-micro-tablet"
        onHoverStart={(e) => {
          setHover("dir");
        }}
        onHoverEnd={(e) => {
          setHover("");
        }}
      >
        <span className="hidden sm:block">
          The Centre for <br className="hidden sm:block" />
          Performing Arts
        </span>
        <span className="sm:hidden">The Centre Vancouver</span>
        <span className="mt-1 hidden gap-x-1 opacity-50 xs:flex">
          Directions
          <motion.div
            animate={{
              x: hover === "dir" ? "0.125rem" : 0,
              y: hover === "dir" ? "-0.125rem" : 0,
            }}
          >
            <Image src={arrowTopRight} alt="" className="h-4 w-auto invert" />
          </motion.div>
        </span>
      </motion.a>
    </MainGrid>
  );
};

export const EventInfoModuleCond = (props: Props) => {
  const [hover, setHover] = useState("");
  return (
    <MainGrid className={`w-full ${props.className}`}>
      <motion.a
        href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
        target="_blank"
        className="col-span-2 flex flex-col text-micro-mobile uppercase md:col-span-3 md:text-micro 2xl:col-span-4"
        onHoverStart={(e) => {
          setHover("date");
        }}
        onHoverEnd={(e) => {
          setHover("");
        }}
      >
        <span className="hidden xs:block md:text-body">
          Saturday, <br className="hidden xs:block" />
          Nov 11, 2023
        </span>
        <span className="xs:hidden md:text-body">Sat, Nov 11, 2023</span>
        <span className="mt-1 hidden gap-x-1 opacity-50 xs:flex">
          Calendar
          <motion.div
            animate={{
              x: hover === "date" ? "0.125rem" : 0,
              y: hover === "date" ? "-0.125rem" : 0,
            }}
          >
            <Image src={arrowTopRight} alt="" className="h-4 w-auto invert" />
          </motion.div>
        </span>
      </motion.a>
      <motion.a
        href="https://goo.gl/maps/yx7ytZ2okDUuF33q7"
        target="_blank"
        className="col-span-2 flex flex-col text-micro-mobile uppercase md:col-span-3 md:text-micro-tablet 2xl:col-span-4"
        onHoverStart={(e) => {
          setHover("dir");
        }}
        onHoverEnd={(e) => {
          setHover("");
        }}
      >
        <span className="md:text-body">
          The Centre for <br className="hidden sm:block" />
          Performing Arts
        </span>
        {/* <span className="sm:hidden md:text-body">The Centre Vancouver</span> */}
        <span className="mt-1 hidden gap-x-1 opacity-50 xs:flex">
          Directions
          <motion.div
            animate={{
              x: hover === "dir" ? "0.125rem" : 0,
              y: hover === "dir" ? "-0.125rem" : 0,
            }}
          >
            <Image src={arrowTopRight} alt="" className="h-4 w-auto invert" />
          </motion.div>
        </span>
      </motion.a>
    </MainGrid>
  );
};
