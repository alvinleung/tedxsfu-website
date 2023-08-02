import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import NavToggle from "./NavToggle";
import NavToggle2 from "./NavToggle2";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";

type Props = {};

const Nav = (props: Props) => {
  const path = useRouter();
  const isAboutPage = path.pathname != "/";

  return (
    <nav
      className="block fixed left-0 right-0 top-0 h-8 z-50"
      style={{
        color: isAboutPage ? "#000" : "#FFF",
      }}
    >
      <Link href={"/"} className="inline-block h-16 w-36 relative">
        <AnimatePresence>
          {!isAboutPage ? (
            <motion.img
              className="block h-16 w-fit absolute top-0 left-0"
              src="./TEDxSFU_logo_white.svg"
              width="1168"
              height="438"
              alt="TEDxSFU"
              key="white"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_INVERTED,
              }}
            />
          ) : (
            <motion.img
              className="block h-16 w-fit absolute top-0 left-0"
              src="./TEDxSFU_logo_black.svg"
              width="1168"
              height="438"
              alt="TEDxSFU"
              key="black"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_INVERTED,
              }}
            />
          )}
        </AnimatePresence>
      </Link>
      <div className="fixed right-0 top-0 bottom-0 uppercase">
        {/* <NavToggle path={path.pathname} /> */}
        <NavToggle2 path={path.pathname} />
      </div>
    </nav>
  );
};

export default Nav;
