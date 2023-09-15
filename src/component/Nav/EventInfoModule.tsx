import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";
import MainGrid from "../layouts/MainGrid";
import arrowTopRight from "../../../public/img/mdi_arrow-top-right.svg";
import EventInfoLink from "./EventInfoLink";
import StaggerTransition from "./StaggerTransition";

type Props = {
  className?: string;
  isActive: boolean;
};

export const EventInfoModule = ({ isActive }: Props) => {
  return (
    <MainGrid
      className={`fixed left-0 right-0 z-50 px-grid-margin-x py-grid-margin-y`}
    >
      <div className="max-sm:hidden sm:col-start-2 xl:col-start-3">
        <StaggerTransition staggerIndex={0} secondary isActive={isActive}>
          <EventInfoLink
            label={"Directions"}
            href="https://goo.gl/maps/KrAtQTKUTuSxVoFT7"
          >
            <span className="sm:hidden sm:whitespace-nowrap uppercase">
              The Centre <br/> Vancouver
            </span>
            <span className="max-sm:hidden sm:whitespace-nowrap uppercase">
              The Centre For <br /> Performing Arts
            </span>
          </EventInfoLink>
        </StaggerTransition>
      </div>
      <div className="max-sm:col-start-3 max-sm:col-span-2 col-start-3 xl:col-start-4">
        <StaggerTransition staggerIndex={0} secondary isActive={isActive}>
          <EventInfoLink
            label={"Calendar"}
            href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
          >
            <div className="flex flex-row">
              <span className="text-[34px] font-light uppercase leading-[32px]">
                <span className="ml-[-4px] tracking-[-0.17em]">1</span>
                <span className="tracking-[-0.05em]">1/</span>
                <span className="tracking-[-0.17em]">11</span>
              </span>
              <span className="ml-2 opacity-70 uppercase">(Sat)</span>
            </div>
          </EventInfoLink>
        </StaggerTransition>
      </div>
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
        <span className="xs:block hidden md:text-body">
          Saturday, <br className="xs:block hidden" />
          Nov 11, 2023
        </span>
        <span className="xs:hidden md:text-body">Sat, Nov 11, 2023</span>
        <span className="xs:flex mt-1 hidden gap-x-1 opacity-50">
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
        <span className="xs:flex mt-1 hidden gap-x-1 opacity-50">
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
