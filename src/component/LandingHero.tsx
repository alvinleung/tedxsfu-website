import { Logo } from "../EmergeTextEffect/Logo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import MainGrid from "./layouts/MainGrid";
import { EventInfoModuleCond } from "./Nav/EventInfoModule";
import EmailForm from "./Footer/EmailForm";
import { AnimationConfig } from "./AnimationConfig";

export const LandingHero = () => {
  const viewport = useWindowDimension();
  const anim = useAnimation();
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useEffect(() => {
    // logo flashing
    const totalFlashingFrame = 5;
    let flashingFrame = 0;

    const imageDuration = 100;
    const blankDuration = 50;

    let timeout = setTimeout(flashFrame, imageDuration);

    function flashFrame() {
      if (flashingFrame > totalFlashingFrame) {
        anim.set({
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
        });
        clearTimeout(timeout);

        // set animation done in the next frame so that the layout is
        // to be sure updated before calling it done
        requestAnimationFrame(() => setIsAnimationDone(true));
        return;
      }

      flashingFrame++;

      if (flashingFrame % 2 === 0) {
        anim.set({
          opacity: 0,
        });
        setTimeout(flashFrame, blankDuration);
        return;
      }
      anim.set({
        opacity: 1,
        x: (Math.random() * window.innerWidth) / 2 - window.innerWidth / 4,
        y: (Math.random() * window.innerHeight) / 2 - window.innerHeight / 4,
        scale:
          Math.random() * (1 - flashingFrame / totalFlashingFrame) * 70 + 1.5,
      });

      setTimeout(flashFrame, imageDuration);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="max-w-screen h-[100dvh] overflow-hidden px-grid-margin-x">
      <motion.div
        initial={{ scale: 50 }}
        animate={anim}
        // className="max-lg:pointer-events-none"
      >
        {/* <a
          className={`pointer-events-auto text-center uppercase leading-tight lg:translate-x-28`}
          href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
          target="_blank"
        >
          November 11 {viewport.width >= 1024 && <br />}2023
        </a> */}
        <Logo isEnterAnimationDone={isAnimationDone} />
        {/* <a
          className={`pointer-events-auto text-center uppercase leading-tight lg:-translate-x-28`}
          href="https://goo.gl/maps/yx7ytZ2okDUuF33q7"
          target="_blank"
        >
          The Centre for
          <br />
          Performing Arts
        </a> */}

        
      </motion.div>
    </section>
  );
};
