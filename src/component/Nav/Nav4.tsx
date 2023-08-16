import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useWindowDimension } from "../../hooks/useWindowDimension"
import NavToggle from "./NavToggle";
import NavToggle3 from "./NavToggle3";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
// import Nav from "./Nav";

type Props = {children:React.ReactNode};

interface NavContextInterface {
  setScrollState: (scrolledState:NavScrollState)=>void
}

export const NavContext = createContext<NavContextInterface>({
  setScrollState: (scrolledState:NavScrollState)=>{}
})
export enum NavScrollState {
  SCROLLED,
  DEFAULT
}


const Nav3 = ({children}: Props) => {
  const path = useRouter();
  const isAboutPage = path.pathname != "/";
  const [scrollState, setScrollState] = useState(NavScrollState.DEFAULT);
  const viewport = useWindowDimension();

  return (
    <NavContext.Provider value={{setScrollState}}>
      <motion.nav
        className="fixed mx-auto left-4 right-4 max-md:bottom-4 md:top-4 z-50 block h-12 max-md:bg-black bg-opacity-90 max-md:text-white max-md:border border-white border-opacity-20 max-md:overflow-hidden md:flex md:gap-x-4 md:justify-center"
        initial={{ width: "auto" }}
        animate={{
          width: scrollState == NavScrollState.DEFAULT || viewport.width >= 768 ? "auto" :  "calc(((100vw - 5rem) / 2) + 1rem)",
          // opacity: scrollState == NavScrollState.DEFAULT ? 1 : 0,
          // background: scrollState == NavScrollState.DEFAULT && viewport.width >= 768 ? (isAboutPage ? "#FFFFFFFF" : "#000000FF") : (isAboutPage ? "#FFFFFF00" : "#00000000"),
        }}
        style={{
          whiteSpace: "nowrap",
          mixBlendMode: "difference"
        }}
      >
        <motion.div 
        className="max-md:w-0 max-md:mx-auto flex justify-center" 
        key="topGroup"
        initial={{
          y: "-100%",
          // opacity: 0,
        }}
        animate={{
          y: viewport.width < 768 ? (scrollState == NavScrollState.DEFAULT ? 0 : "-100%") : 0,
          // opacity: scrollState == NavScrollState.DEFAULT ? 1 : 0,
        }}
        exit={{
          y: "-100%",
          // opacity: 0,
        }}
        transition={{
          duration: AnimationConfig.FAST,
          ease: AnimationConfig.EASING_INVERTED,
        }}
        >
            <motion.div className="w-[calc(100vw-2rem)] md:w-[calc((4*(100vw-7rem)/5)+4rem)] lg:w-[calc((5*(100vw-8rem)/6)+5rem)] 2xl:w-[calc((7*(100vw-10rem)/8)+7rem)] flex flex-shrink-0 justify-center">
              <motion.a
              key="logo"
              href={"/"}
              className="block w-32 h-12 flex flex-row-reverse"
              onClick={(e) => {
                e.preventDefault();
                path.push("/");
              }}
              >
                <motion.svg
                  className="max-w-none block"
                  aria-label="TEDxSFU"
                  key="logo"
                  viewBox="0 0 376 152"
                  style={{mixBlendMode: "difference"}}
                  transition={{
                    duration: AnimationConfig.VERY_SLOW,
                    ease: AnimationConfig.EASING_INVERTED,
                  }}
                >
                  <motion.path 
                    style={{mixBlendMode: "difference", fill: "#FFFFFF"}}
                    transition={{
                      duration: AnimationConfig.VERY_SLOW,
                      ease: AnimationConfig.EASING_INVERTED,
                    }}
                    d="M116.3 39.2998C115.5 31.1992 111.9 24.6992 105.5 19.8994C99.1006 15.0996 91.1006 12.6992 81.5 12.6992C74.7002 12.6992 68.7002 13.8994 63.6006 16.1992C58.4004 18.5 54.4004 21.7998 51.5 25.8994C48.6006 30 47.1006 34.6992 47.1006 39.8994C47.1006 43.7998 47.9004 47.0996 49.6006 50C50.6152 51.7314 51.8086 53.3203 53.2021 54.7676C54.1416 55.7432 55.1719 56.6543 56.2998 57.5C59.1006 59.5996 62.2998 61.2998 65.7002 62.7998C69.1006 64.2998 72.6006 65.5 76.2002 66.5L91.6006 70.8994C96.2998 72.1992 100.9 73.7998 105.601 75.7998C110.3 77.7998 114.5 80.2998 118.4 83.2998C122.3 86.2998 125.4 90 127.7 94.3994C130.101 98.7998 131.2 104 131.2 110.1C131.2 117.899 129.2 124.899 125.101 131.1C121 137.3 115.3 142.3 107.7 145.899C100.101 149.5 91.1006 151.399 80.5 151.399C70.6006 151.399 61.9004 149.699 54.6006 146.399C47.2998 143.1 41.5 138.5 37.2998 132.699C33.1006 126.899 30.7998 120.1 30.2002 112.399H44C44.5 118.199 46.4004 123 49.7002 127C53 131 57.4004 134 62.7002 136.1C68 138.199 74 139.199 80.5 139.199C87.7998 139.199 94.2998 138 99.9004 135.5C105.601 133.1 110.101 129.6 113.3 125.199C116.601 120.8 118.2 115.699 118.2 109.8C118.2 104.899 116.9 100.699 114.3 97.2998C111.7 93.8994 108.2 91.0996 103.601 88.7998C99 86.5 93.7002 84.5 87.7002 82.6992L70.2002 77.5996C58.7002 74.1992 49.7998 69.3994 43.5 63.3994C37.2002 57.3994 34 49.6992 34 40.2998C34 32.5 36.1006 25.5 40.2998 19.5996C44.5 13.5996 50.2002 9 57.4004 5.59961C64.6006 2.19922 72.7002 0.599609 81.7002 0.599609C90.7998 0.599609 98.7998 2.2998 105.8 5.59961C112.8 8.89941 118.3 13.5 122.5 19.2998C126.601 25.0996 128.8 31.7998 129.101 39.1992H116.3V39.2998Z"/>
                  <motion.path 
                    style={{mixBlendMode: "difference", fill: "#FFFFFF"}}
                    transition={{
                      duration: AnimationConfig.VERY_SLOW,
                      ease: AnimationConfig.EASING_INVERTED,
                    }}
                    d="M157.1 148.8V2.7002H241.6V14.7002H170.399V69.7002H235V81.7002H170.399V148.8H157.1Z"/>
                  <motion.path 
                    style={{mixBlendMode: "difference", fill: "#FFFFFF"}}
                    transition={{
                      duration: AnimationConfig.VERY_SLOW,
                      ease: AnimationConfig.EASING_INVERTED,
                    }}
                    d="M374.8 2.69922H361.5L361.6 98.3994C361.6 106.1 359.8 113 356.399 119.1C352.899 125.199 348 129.899 341.699 133.399C335.399 136.899 328 138.6 319.5 138.6C311 138.6 303.6 136.899 297.3 133.399C291 129.899 286.1 125.199 282.6 119.1C279.1 113.1 277.399 106.199 277.399 98.3994V2.59961H264.1V99.3994C264.1 109.3 266.399 118.199 271.1 126C275.8 133.8 282.3 140 290.6 144.5C298.899 149 308.6 151.3 319.5 151.3C330.5 151.3 340.1 149.1 348.399 144.6C356.699 140.1 363.1 133.899 367.8 126.1C372.5 118.3 374.8 109.399 374.8 99.5V2.69922Z"/>
            </motion.svg>
            <motion.svg
                className="max-w-none block"
                aria-label="TEDxSFU"
                key="logo"
                viewBox="0 0 501 152"
                style={{mixBlendMode: "difference", isolation:"isolate"}}
                transition={{
                  duration: AnimationConfig.VERY_SLOW,
                  ease: AnimationConfig.EASING_INVERTED,
                }}
              >
              <motion.path d="M0 38.2002H40.7998V146.8H85.7002V38.2002H126.6V0.799805H0V38.2002Z" fill="#EB0028"/>
              <motion.path d="M256.4 0.799805H133.5V146.8H256.4V109.399H178.4V91.2002H256.4V56.3994H178.4V38.2002H256.4V0.799805Z" fill="#EB0028"/>
              <motion.path fill-rule="evenodd" clip-rule="evenodd" d="M264 0.799805H337.7C386.3 0.799805 403.5 36.7998 403.5 73.5996C403.5 118.399 379.8 146.8 329 146.8H264V0.799805ZM309 109.3H326.5C354.5 109.3 358.6 86.5996 358.6 72.8994C358.6 63.7002 355.7 38.2002 323.3 38.2002H309V109.3Z" fill="#EB0028"/>
              <motion.path d="M454.3 68L468 90.7998H500.7L469.5 44.7998L499.6 0.799805H466.7L454.2 22.5996L442 0.799805H409.1L439.2 44.7998L408 90.7998H440.9L454.3 68Z" fill="#EB0028"/>

          </motion.svg>
              </motion.a>
              <motion.div
                key="toggle"
                className="ml-auto uppercase"
                >
                  {/* <NavToggle path={path.pathname} /> */}
                  <NavToggle3 path={path.pathname} />
              </motion.div>
            </motion.div>
        </motion.div>
        <motion.a 
          key="partnerCTA"
          href={"https://google.com"}
          target="_blank" 
          className="h-12 max-md:w-full flex justify-center items-center text-center md:w-[min(auto,calc((100vw-8rem)/6))] md:px-2 md:ml-auto md:border md:border-white md:border-opacity-50"
          initial={{ 
            y: "100%",
            // opacity: 0
          }}
          animate={{
            y: scrollState == NavScrollState.SCROLLED && viewport.width < 768 ? "-100%" : 0,
            background: isAboutPage ? "#000000" : "#FFFFFF",
            color: isAboutPage ? "#FFFFFF" : "#000000"
            // opacity: scrollState == NavScrollState.SCROLLED ? 1 : 0,
          }}
          exit={{
            y: "100%",
            // opacity: 0,
          }}
          transition={{
            duration: AnimationConfig.FAST,
            ease: AnimationConfig.EASING_INVERTED,
          }}
          >
            Partner with us
          </motion.a>
      </motion.nav>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = ()=>{
  return useContext(NavContext);
}

export default Nav3;
