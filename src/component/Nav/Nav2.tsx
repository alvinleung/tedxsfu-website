import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import NavToggle from "./NavToggle";
import NavToggle2 from "./NavToggle2";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";

type Props = {};

const Nav2 = (props: Props) => {
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
            <motion.svg 
              className="block h-16 w-fit absolute top-0 left-0"
              aria-label="TEDxSFU"
              key="logo"
              viewBox="0 0 1168 438"
              transition={{
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_INVERTED,
              }}>
              <motion.path 
              // fill="#EE0028"
              animate={{fill: isAboutPage ? "#000000" : "#FFFFFF"}}
              // style={{mixBlendMode: "difference"}}
              transition={{
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_INVERTED,
              }}
              d="M763.3,182.3c-0.8-8.1-4.4-14.6-10.8-19.4c-6.4-4.8-14.4-7.2-24-7.2c-6.8,0-12.8,1.2-17.9,3.5c-5.2,2.3-9.2,5.6-12.1,9.7
                c-2.9,4.1-4.4,8.8-4.4,14c0,3.9,0.8,7.2,2.5,10.1c1.7,2.9,3.9,5.4,6.7,7.5s6,3.8,9.4,5.3c3.4,1.5,6.9,2.7,10.5,3.7l15.4,4.4
                c4.7,1.3,9.3,2.9,14,4.9c4.7,2,8.9,4.5,12.8,7.5c3.9,3,7,6.7,9.3,11.1c2.4,4.4,3.5,9.6,3.5,15.7c0,7.8-2,14.8-6.1,21
                c-4.1,6.2-9.8,11.2-17.4,14.8c-7.6,3.6-16.6,5.5-27.2,5.5c-9.9,0-18.6-1.7-25.9-5c-7.3-3.3-13.1-7.9-17.3-13.7
                c-4.2-5.8-6.5-12.6-7.1-20.3H691c0.5,5.8,2.4,10.6,5.7,14.6s7.7,7,13,9.1s11.3,3.1,17.8,3.1c7.3,0,13.8-1.2,19.4-3.7
                c5.7-2.4,10.2-5.9,13.4-10.3c3.3-4.4,4.9-9.5,4.9-15.4c0-4.9-1.3-9.1-3.9-12.5c-2.6-3.4-6.1-6.2-10.7-8.5c-4.6-2.3-9.9-4.3-15.9-6.1
                l-17.5-5.1c-11.5-3.4-20.4-8.2-26.7-14.2s-9.5-13.7-9.5-23.1c0-7.8,2.1-14.8,6.3-20.7c4.2-6,9.9-10.6,17.1-14c7.2-3.4,15.3-5,24.3-5
                c9.1,0,17.1,1.7,24.1,5c7,3.3,12.5,7.9,16.7,13.7c4.1,5.8,6.3,12.5,6.6,19.9h-12.8V182.3z"/>
              <motion.path 
              // fill="#EE0028"
              animate={{fill: isAboutPage ? "#000000" : "#FFFFFF"}}
              // style={{mixBlendMode: "difference"}}
              transition={{
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_INVERTED,
              }}
              d="M804.1,291.9V145.7h84.5v12h-71.2v55H882v12h-64.6v67.1L804.1,291.9L804.1,291.9z"/>
              <motion.path 
              fill="#EE0028"
              animate={{fill: isAboutPage ? "#000000" : "#FFFFFF"}}
              transition={{
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_INVERTED,
              }}
              d="M1008.5,145.7h13.3v96.8c0,9.9-2.3,18.8-7,26.6c-4.7,7.8-11.1,14-19.4,18.5c-8.3,4.5-17.9,6.7-28.9,6.7
                c-10.9,0-20.6-2.3-28.9-6.8c-8.3-4.5-14.8-10.7-19.5-18.5c-4.7-7.8-7-16.7-7-26.6v-96.8h13.3v95.8c0,7.8,1.7,14.7,5.2,20.7
                c3.5,6.1,8.4,10.8,14.7,14.3s13.7,5.2,22.2,5.2s15.9-1.7,22.2-5.2s11.2-8.2,14.7-14.3c3.4-6.1,5.2-13,5.2-20.7L1008.5,145.7z"/>
              <motion.path 
              fill="#EE0028"
              d="M186.8,183.2H146v-37.4h126.6v37.4h-40.9v108.6h-44.9C186.8,291.7,186.8,183.2,186.8,183.2z"/>
              <motion.path 
              fill="#EE0028"
              d="M279.5,145.8h122.9v37.4h-78v18.2h78v34.8h-78v18.2h78v37.4H279.5V145.8z"/>
              <motion.path 
              fill="#EE0028"
              d="M410,145.8h73.7c48.6,0,65.8,36,65.8,72.8c0,44.8-23.7,73.2-74.5,73.2h-65V145.8z M454.9,254.3h17.6
                c28,0,32.1-22.7,32.1-36.4c0-9.2-2.9-34.7-35.3-34.7H455v71.1H454.9z"/>
              <motion.path
              fill="#EE0028"
              d="M614,235.8L600.3,213l-13.4,22.8H554l31.2-46l-30.1-44H588l12.2,21.8l12.5-21.8h32.9l-30.1,44l31.2,46H614z"/>

            </motion.svg>
        </AnimatePresence>
      </Link>
      <div className="fixed right-0 top-0 uppercase">
        {/* <NavToggle path={path.pathname} /> */}
        <NavToggle2 path={path.pathname} />
      </div>
    </nav>
  );
};

export default Nav2;
