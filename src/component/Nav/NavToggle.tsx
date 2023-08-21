import { useBoundingBox } from "@/hooks/useBoundingBox";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useMemo, useEffect } from "react";
import { AnimationConfig } from "../AnimationConfig";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import Link from "next/link";

type Props = { path: string };

const NavToggle = (props: Props) => {
  const router = useRouter();
  const [conferenceTextRef, conferenceTextBounds] = useBoundingBox([]);
  const [aboutTextRef, aboutTextBounds] = useBoundingBox([]);

  const isAboutPage = useMemo(
    () => router.pathname === "/about",
    [router.pathname],
  );

  const handleToggleClick = () => {
    if (router.pathname === "/about") {
      router.push("/");
      return;
    }
    router.push("/about");
  };

  const push = (path: string) => {
    router.push(path);
    return;
  };

  const viewport = useWindowDimension();

  return viewport.width >= 768 ? (
    <motion.div className="flex w-[calc((2*(100vw-6rem)/5)+1rem)] gap-4 text-micro uppercase lg:w-[calc((2*(100vw-7rem)/6)+1rem)] 2xl:w-[calc((2*(100vw-9rem)/8)+1rem)]">
      <motion.div
        className="
      top-0 h-0.5 w-[calc((100vw-6rem)/5)]
      bg-ted md:fixed md:right-[calc(2*((100vw-6rem)/5)+3rem)]
      md:z-50 lg:right-[calc(2*((100vw-7rem)/6)+3rem)] lg:w-[calc((100vw-7rem)/6)] 2xl:right-[calc(2*((100vw-9rem)/8)+3rem)] 2xl:w-[calc((100vw-9rem)/8)]"
        animate={{
          x: isAboutPage ? "calc(100% + 1rem)" : 0,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
      />
      <Link className={`flex w-full flex-col`} href="/">
        <motion.div
          className="
          flex w-[calc((100vw-6rem)/5)] flex-col 
          md:fixed md:right-[calc(2*((100vw-6rem)/5)+3rem)] md:top-4
          md:z-50 md:mix-blend-exclusion lg:right-[calc(2*((100vw-7rem)/6)+3rem)] lg:w-[calc((100vw-7rem)/6)] 2xl:right-[calc(2*((100vw-9rem)/8)+3rem)] 2xl:w-[calc((100vw-9rem)/8)] 
          "
          animate={{
            opacity: isAboutPage ? 0.5 : 1,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        >
          <span className="h-6">Event Info</span>
          <span>1</span>
        </motion.div>
      </Link>
      <Link href="/about" className="flex w-full flex-col">
        <motion.div
          className="
          flex w-[calc((100vw-6rem)/5)] flex-col 
          md:fixed md:right-[calc(((100vw-6rem)/5)+2rem)] md:top-4
          md:z-50 md:mix-blend-exclusion lg:right-[calc(((100vw-7rem)/6)+2rem)] lg:w-[calc((100vw-7rem)/6)] 2xl:right-[calc(((100vw-9rem)/8)+2rem)] 2xl:w-[calc((100vw-9rem)/8)] "
          animate={{
            opacity: !isAboutPage ? 0.5 : 1,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        >
          <span className="h-6">Our Story</span>
          <span>2</span>
        </motion.div>
      </Link>
    </motion.div>
  ) : (
    <motion.button
      onClick={handleToggleClick}
      className="my-2 h-8 flex items-center overflow-hidden px-2 text-micro uppercase"
      animate={{
        // backgroundColor: isAboutPage ? "#FFF" : "#000",
        // color: isAboutPage ? "#000" : "#FFF",
        // borderColor: isAboutPage ? "#CCC" : "#444",
        transition: {
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING_IN_OUT,
        },
      }}
    >
      <motion.span
        className="relative flex flex-row justify-end py-1"
        animate={{
          width: isAboutPage ? 24 : aboutTextBounds.width + 12,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
      >
        <motion.span
          className="whitespace-nowrap pr-2"
          ref={aboutTextRef}
          animate={{
            opacity: isAboutPage ? 0 : 1,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        >
          Our Story
        </motion.span>
        <motion.img
          className={`left-0 top-0 md:invert`}
          src="../icon/arrow-white.svg"
          animate={{
            opacity: isAboutPage ? 1 : 0,
            rotate: isAboutPage ? 180 : 0,
            width: isAboutPage ? 24 : 0,
            transition: {
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        />
      </motion.span>
      <motion.span
        className="relative flex flex-row py-1"
        animate={{
          width: isAboutPage ? conferenceTextBounds.width + 12 : 24,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
      >
        <motion.img
          className={` left-0 top-0 `}
          src="../icon/arrow-white.svg"
          animate={{
            width: !isAboutPage ? 24 : 0,
            opacity: !isAboutPage ? 1 : 0,
            rotate: isAboutPage ? 180 : 0,
            transition: {
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        />
        <motion.span
          className="whitespace-nowrap pl-2 md:text-black"
          ref={conferenceTextRef}
          animate={{
            opacity: !isAboutPage ? 0 : 1,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        >
          Event Info
        </motion.span>
      </motion.span>
    </motion.button>
  );
};

{
  /* <motion.img
        src="../icon/arrow-black.svg"
        style={{ scale: 0.8 }}
        animate={{
          rotate: isAboutPage ? 180 : 0,
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          },
        }}
      /> */
}

export default NavToggle;
