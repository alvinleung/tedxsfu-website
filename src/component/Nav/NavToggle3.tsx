import { useBoundingBox } from "@/hooks/useBoundingBox";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { AnimationConfig } from "../AnimationConfig";
import { useWindowDimension } from "../../hooks/useWindowDimension"
import Link from "next/link";

type Props = { path: string };

const NavToggle = (props: Props) => {
  const router = useRouter();
  const [conferenceTextRef, conferenceTextBounds] = useBoundingBox([]);
  const [aboutTextRef, aboutTextBounds] = useBoundingBox([]);
  
  const isAboutPage = useMemo(
    () => router.pathname === "/about",
    [router.pathname]
  );

  const handleToggleClick = () => {
    if (router.pathname === "/about") {
      router.push("/");
      return;
    }
    router.push("/about");
  };

  const push = (path : string) => {
    router.push(path);
    return;
  }

  const viewport = useWindowDimension();
  return (
    viewport.width >= 768 ?
    <motion.div className="md:mix-blend-exclusion flex w-[calc((2*(100vw-7rem)/5)+1rem)] lg:w-[calc((2*(100vw-8rem)/6)+1rem)] 2xl:w-[calc((2*(100vw-10rem)/8)+1rem)] gap-4 uppercase text-micro">
      <motion.div 
      className="absolute w-[calc((100vw-7rem)/5)] lg:w-[calc((100vw-7rem)/6)] 2xl:w-[calc((100vw-7rem)/8)] bg-ted h-0.5 -top-4"
      animate={{
        x: isAboutPage ? "calc(100% + 1rem)" : 0,
        transition: {
          duration: AnimationConfig.SLOW,
          ease: AnimationConfig.EASING_IN_OUT,
        },
      }}

      />
      <Link className="w-full flex flex-col" href="/">
        <motion.div 
          className="flex flex-col"
          animate={{
            opacity: isAboutPage ? 0.5 : 1,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}>
          Conference 
        <span>1</span>
        </motion.div>
      </Link>
      <Link 
       href="/about"
        className="w-full flex flex-col">
        <motion.div 
          className="flex flex-col"
          animate={{
            opacity: !isAboutPage ? 0.5 : 1,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}>
        About us
        <span>2</span>
        </motion.div>
      </Link>
    </motion.div>
    :
    (<motion.button
      onClick={handleToggleClick}
      className="flex items-center my-2 px-2 overflow-hidden uppercase text-micro"
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
        className="flex flex-row justify-end relative py-1"
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
          className={`top-0 left-0 md:invert`}
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
        className="flex flex-row relative py-1"
        animate={{
          width: isAboutPage ? conferenceTextBounds.width + 12 : 24,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
      >
        <motion.img
          className={` top-0 left-0 `}
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
  ));
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
