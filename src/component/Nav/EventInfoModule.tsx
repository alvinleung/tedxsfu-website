import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import MainGrid from "../layouts/MainGrid";
import arrowTopRight from "../../../public/img/mdi_arrow-top-right.svg";
import EventInfoLink from "./EventInfoLink";
import StaggerTransition from "./StaggerTransition";
import { AnimationConfig } from "../AnimationConfig";
import { useBreakpoint, breakpoints } from "@/hooks/useBreakpoints";
import {
  ScrollDirection,
  useContainerScroll,
} from "../ScrollContainer/ScrollContainer";

type Props = {
  className?: string;
  isActive: boolean;
  isLandingLogoVisible: boolean;
  isMenuOpened: boolean;
  scrollDirection: ScrollDirection;
};

export const EventInfoModule = ({
  isActive,
  isLandingLogoVisible,
  isMenuOpened,
  scrollDirection,
}: Props) => {
  const atBreakpointSM = useBreakpoint(breakpoints.sm);
  const isScrollingDown = scrollDirection === ScrollDirection.DOWN;

  return (
    <MainGrid
      className={`fixed left-0 right-0 z-50 px-grid-margin-x py-grid-margin-y`}
    >
      <motion.div
        animate={{
          opacity: isLandingLogoVisible && !isMenuOpened ? 0 : 1,
          transition: {
            duration: isLandingLogoVisible
              ? AnimationConfig.VERY_FAST
              : AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
        }}
        className="right-grid-margin-x top-grid-margin-y max-sm:absolute max-sm:pr-14 sm:col-start-2 xl:col-start-3"
      >
        <motion.div
          animate={{
            opacity:
              atBreakpointSM || (!atBreakpointSM && !isScrollingDown) ? 1 : 0,
            y:
              atBreakpointSM || (!atBreakpointSM && !isScrollingDown) ? 0 : -20,
          }}
          transition={{
            duration: AnimationConfig.FAST,
            ease: AnimationConfig.EASING,
          }}
        >
          <StaggerTransition staggerIndex={0} secondary isActive={isActive}>
            <EventInfoLink
              label={atBreakpointSM ? "Google Maps" : ""}
              href="https://goo.gl/maps/KrAtQTKUTuSxVoFT7"
            >
              <span className="uppercase sm:hidden sm:whitespace-nowrap">
                The Centre <br /> Vancouver
              </span>
              <span className="uppercase max-sm:hidden sm:whitespace-nowrap">
                The Centre For <br /> Performing Arts
              </span>
            </EventInfoLink>
          </StaggerTransition>
        </motion.div>
      </motion.div>
      <motion.div
        animate={{
          opacity: isLandingLogoVisible && !isMenuOpened ? 0 : 1,
          transition: {
            duration: isLandingLogoVisible
              ? AnimationConfig.VERY_FAST
              : AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
        }}
        className="col-start-3 border-white/40 max-sm:col-span-2 max-sm:col-start-3 max-sm:mr-10 max-sm:border-r max-sm:pr-4 xl:col-start-4"
      >
        <motion.div
          animate={{
            opacity:
              atBreakpointSM || (!atBreakpointSM && isScrollingDown) ? 1 : 0,
            y: atBreakpointSM || (!atBreakpointSM && isScrollingDown) ? 0 : 20,
          }}
          transition={{
            duration: AnimationConfig.FAST,
            ease: AnimationConfig.EASING,
          }}
        >
          <StaggerTransition staggerIndex={0} secondary isActive={isActive}>
            <EventInfoLink
              label={atBreakpointSM ? "Calendar" : ""}
              href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T163000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
            >
              <div className="flex flex-row-reverse max-sm:items-end max-sm:gap-x-1 sm:flex-row">
                <span className="text-[34px] font-light uppercase leading-[32px]">
                  <span className="ml-[-4px] tracking-[-0.17em]">1</span>
                  <span className="tracking-[-0.05em]">1/</span>
                  <span className="tracking-[-0.17em]">11</span>
                </span>
                {atBreakpointSM ? (
                  <span className="ml-2 uppercase opacity-70">(Sat)</span>
                ) : (
                  <span className="mb-[0.125rem] ml-2 uppercase opacity-70">
                    Sat
                  </span>
                )}
              </div>
            </EventInfoLink>
          </StaggerTransition>
        </motion.div>
      </motion.div>
    </MainGrid>
  );
};
