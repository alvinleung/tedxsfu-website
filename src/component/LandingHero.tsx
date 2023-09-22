import { Logo } from "../EmergeTextEffect/Logo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { motion, useAnimation, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import MainGrid from "./layouts/MainGrid";
import { EventInfoModuleCond } from "./Nav/EventInfoModule";
import EmailForm from "./Footer/EmailForm";
import { AnimationConfig } from "./AnimationConfig";
import EventInfoLink from "./Nav/EventInfoLink";
import { useContainerScroll } from "./ScrollContainer/ScrollContainer";
import LandingPartnerScroll from "./LandingPartnerScroll";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";

export const LandingHero = () => {
  const viewport = useWindowDimension();

  const { hasScrolled, scrollY } = useContainerScroll();
  const logoOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  // const anim = useAnimation();
  // const [isAnimationDone, setIsAnimationDone] = useState(false);

  // useEffect(() => {
  //   // logo flashing
  //   const totalFlashingFrame = 5;
  //   let flashingFrame = 0;

  //   const imageDuration = 100;
  //   const blankDuration = 50;

  //   let timeout = setTimeout(flashFrame, imageDuration);

  //   function flashFrame() {
  //     if (flashingFrame > totalFlashingFrame) {
  //       anim.set({
  //         opacity: 1,
  //         x: 0,
  //         y: 0,
  //         scale: 1,
  //       });
  //       clearTimeout(timeout);

  //       // set animation done in the next frame so that the layout is
  //       // to be sure updated before calling it done
  //       requestAnimationFrame(() => setIsAnimationDone(true));
  //       return;
  //     }

  //     flashingFrame++;

  //     if (flashingFrame % 2 === 0) {
  //       anim.set({
  //         opacity: 0,
  //       });
  //       setTimeout(flashFrame, blankDuration);
  //       return;
  //     }
  //     anim.set({
  //       opacity: 1,
  //       x: (Math.random() * window.innerWidth) / 2 - window.innerWidth / 4,
  //       y: (Math.random() * window.innerHeight) / 2 - window.innerHeight / 4,
  //       scale:
  //         Math.random() * (1 - flashingFrame / totalFlashingFrame) * 70 + 1.5,
  //     });

  //     setTimeout(flashFrame, imageDuration);
  //   }

  //   return () => {
  //     clearTimeout(timeout);
  //   };
  // }, []);

  const atMDBreakpoint = useBreakpoint(breakpoints.md);

  return (
    <section className="max-w-screen overflow-hidden px-grid-margin-x pb-grid-margin-y">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        className="relative mx-auto sm:w-fit"
      >
        <Logo isEnterAnimationDone={true} />
        <MainGrid className="max-sm:relative max-sm:mb-4 max-sm:mt-20">
          <div className="absolute left-0 right-0">
            {!atMDBreakpoint && (
              <LandingPartnerScroll isVisible={!hasScrolled} />
            )}
          </div>
          <motion.div
            style={{
              opacity: atMDBreakpoint ? logoOpacity : 1,
            }}
            animate={{
              opacity: !atMDBreakpoint && hasScrolled ? 0 : 1,
              y: !atMDBreakpoint && hasScrolled ? -20 : 0,
              transition: {
                duration: AnimationConfig.NORMAL,
                ease: AnimationConfig.EASING,
              },
            }}
            className="flex flex-col max-sm:col-span-2 max-sm:border-r max-sm:border-r-[rgba(255,255,255,.4)] sm:absolute sm:bottom-0 sm:right-[85%] sm:top-0 sm:justify-center"
          >
            <EventInfoLink
              centerAlign
              label={"Calendar"}
              href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
              className="sm:items-center"
            >
              <span className="uppercase sm:whitespace-nowrap sm:text-center">
                Saturday, <br /> Nov 11, 2023
              </span>
            </EventInfoLink>
          </motion.div>
          <motion.div
            style={{
              opacity: atMDBreakpoint ? logoOpacity : 1,
            }}
            animate={{
              opacity: !atMDBreakpoint && hasScrolled ? 0 : 1,
              y: !atMDBreakpoint && hasScrolled ? -20 : 0,
              transition: {
                duration: AnimationConfig.NORMAL,
                ease: AnimationConfig.EASING,
              },
            }}
            className="flex flex-col max-sm:col-span-2 sm:absolute sm:bottom-0 sm:left-[85%] sm:top-0 sm:justify-center"
          >
            <EventInfoLink
              centerAlign
              label={"Google Map"}
              href="https://goo.gl/maps/KrAtQTKUTuSxVoFT7"
              className="sm:items-center"
            >
              <span className="uppercase sm:whitespace-nowrap sm:text-center">
                The Centre For <br /> Performing Arts
              </span>
            </EventInfoLink>
          </motion.div>
        </MainGrid>
      </motion.div>
    </section>
  );
};
