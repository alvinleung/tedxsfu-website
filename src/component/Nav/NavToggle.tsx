import { useBoundingBox } from "@/hooks/useBoundingBox";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { AnimationConfig } from "../AnimationConfig";

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

  return (
    <motion.button
      onClick={handleToggleClick}
      className="flex items-center border mr-4 mt-4 px-2 overflow-hidden bg-white text-black"
    >
      <motion.span
        className="bg-white z-10"
        animate={{
          width: !isAboutPage ? 0 : "1em",
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
      >
        <motion.img
          src="../icon/arrow-black.svg"
          animate={{
            rotate: isAboutPage ? 180 : 0,
            transition: {
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        />
      </motion.span>
      <motion.span
        className="flex flex-row gap-2 py-1 uppercase tracking-wide"
        animate={{
          width: isAboutPage
            ? conferenceTextBounds.width
            : aboutTextBounds.width,
          x: isAboutPage ? -aboutTextBounds.width - 8 : 0,
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
      >
        <motion.span
          className="flex flex-row"
          animate={{
            opacity: isAboutPage ? 0 : 1,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        >
          <span className="whitespace-nowrap pr-2" ref={aboutTextRef}>
            About Us
          </span>
        </motion.span>
        <motion.span
          className="flex flex-row"
          animate={{
            opacity: isAboutPage ? 1 : 0,
            transition: {
              duration: AnimationConfig.SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        >
          <span className="whitespace-nowrap pl-2" ref={conferenceTextRef}>
            Conference
          </span>
        </motion.span>
      </motion.span>
      <motion.span
        animate={{
          width: isAboutPage ? 0 : "1em",
          transition: {
            duration: AnimationConfig.SLOW,
            ease: AnimationConfig.EASING_IN_OUT,
          },
        }}
      >
        <motion.img
          src="../icon/arrow-black.svg"
          animate={{
            rotate: isAboutPage ? 180 : 0,
            transition: {
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
        />
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