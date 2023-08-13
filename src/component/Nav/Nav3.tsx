import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useWindowDimension } from "../../hooks/useWindowDimension"
import NavToggle from "./NavToggle";
import NavToggle3 from "./NavToggle3";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import Nav from "./Nav";

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
          background: scrollState == NavScrollState.DEFAULT && viewport.width >= 768 ? (isAboutPage ? "#FFFFFFFF" : "#000000FF") : (isAboutPage ? "#FFFFFF00" : "#00000000"),
        }}
        style={{
          whiteSpace: "nowrap"
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
          y: scrollState == NavScrollState.DEFAULT ? 0 : "-100%",
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
              className="block w-32 h-12"
              onClick={(e) => {
                e.preventDefault();
                path.push("/");
              }}
              >
                <motion.svg
            className="max-w-none block w-32 h-12 px-4"
            aria-label="TEDxSFU"
            key="logo"
            viewBox="0 0 877 152"
            transition={{
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING_INVERTED,
            }}
          >

            <motion.path
              animate={{ fill: isAboutPage && viewport.width >= 768 ? "#000000" : "#FFFFFF" }}
              // style={{mixBlendMode: "difference"}}
              transition={{
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_INVERTED,
              }}
              d="M618.12 39.2697C617.31 31.1397 613.73 24.6697 607.36 19.8597C600.99 15.0597 592.99 12.6497 583.35 12.6497C576.56 12.6497 570.58 13.8197 565.43 16.1497C560.28 18.4797 556.24 21.6997 553.32 25.8197C550.4 29.9297 548.94 34.6097 548.94 39.8397C548.94 43.6897 549.77 47.0697 551.43 49.9697C553.09 52.8697 555.34 55.3597 558.16 57.4297C560.98 59.4997 564.12 61.2697 567.57 62.7497C571.01 64.2197 574.49 65.4597 578.01 66.4597L593.4 70.8797C598.06 72.1597 602.71 73.7997 607.37 75.7997C612.03 77.7997 616.29 80.3097 620.16 83.3297C624.03 86.3497 627.14 90.0397 629.49 94.3897C631.84 98.7397 633.02 103.96 633.02 110.05C633.02 117.85 631 124.87 626.96 131.1C622.92 137.33 617.13 142.27 609.57 145.9C602.01 149.53 592.97 151.36 582.42 151.36C572.49 151.36 563.87 149.71 556.56 146.4C549.24 143.1 543.5 138.52 539.32 132.67C535.14 126.82 532.79 120.04 532.27 112.34H545.95C546.42 118.1 548.33 122.97 551.65 126.97C554.97 130.97 559.3 134 564.62 136.07C569.94 138.14 575.88 139.17 582.43 139.17C589.7 139.17 596.17 137.95 601.85 135.5C607.53 133.05 611.99 129.63 615.25 125.23C618.5 120.83 620.13 115.7 620.13 109.85C620.13 104.9 618.85 100.75 616.28 97.3997C613.72 94.0497 610.14 91.2297 605.56 88.9397C600.98 86.6597 595.67 84.6397 589.63 82.8797L572.17 77.7397C560.72 74.3197 551.84 69.5797 545.52 63.5397C539.2 57.4997 536.04 49.7897 536.04 40.4197C536.04 32.5697 538.14 25.6597 542.35 19.6897C546.55 13.7197 552.25 9.0597 559.45 5.7097C566.65 2.3597 574.73 0.679688 583.71 0.679688C592.69 0.679688 600.81 2.34969 607.79 5.67969C614.77 9.00969 620.32 13.5897 624.43 19.4097C628.54 25.2397 630.74 31.8597 631.02 39.2797H618.12V39.2697Z"
            />
            <motion.path
              animate={{ fill: isAboutPage && viewport.width >= 768 ? "#000000" : "#FFFFFF" }}
              // style={{mixBlendMode: "difference"}}
              transition={{
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_INVERTED,
              }}
              d="M658.84 148.86V2.74023H743.27V14.7302H672.16V69.7402H736.64V81.7302H672.16V148.87H658.84V148.86Z"
            />
            <motion.path
              animate={{ fill: isAboutPage && viewport.width >= 768 ? "#000000" : "#FFFFFF" }}
              transition={{
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_INVERTED,
              }}
              d="M862.98 2.74023H876.3V99.4902C876.3 109.43 873.97 118.31 869.32 126.14C864.66 133.97 858.19 140.12 849.9 144.62C841.61 149.12 831.98 151.36 821.01 151.36C810.04 151.36 800.47 149.1 792.15 144.58C783.84 140.06 777.35 133.9 772.7 126.1C768.04 118.3 765.72 109.43 765.72 99.4902V2.74023H779.04V98.5602C779.04 106.31 780.77 113.22 784.24 119.29C787.71 125.35 792.59 130.12 798.88 133.6C805.17 137.07 812.55 138.81 821 138.81C829.45 138.81 836.84 137.07 843.16 133.6C849.48 130.13 854.36 125.36 857.8 119.29C861.24 113.23 862.97 106.32 862.97 98.5602V2.74023H862.98Z"
            />
            <motion.path
              fill="#EE0028"
              d="M41.81 40.1698H0.959961V2.75977H127.53V40.1698H86.69V148.72H41.81V40.1698Z"
            />
            <motion.path
              fill="#EE0028"
              d="M134.51 2.75977H257.38V40.1698H179.42V58.3598H257.38V93.1198H179.42V111.31H257.4V148.72H134.51V2.75977Z"
            />
            <motion.path
              fill="#EE0028"
              d="M264.93 2.75977H338.63C387.21 2.75977 404.38 38.7398 404.38 75.5298C404.38 120.31 380.7 148.73 329.86 148.73H264.93V2.76978V2.75977ZM309.84 111.31H327.4C355.38 111.31 359.47 88.6098 359.47 74.8998C359.47 65.7198 356.6 40.1698 324.13 40.1698H309.84V111.31Z"
            />
            <motion.path
              fill="#EE0028"
              d="M468.91 92.8301L455.21 70.0801L441.85 92.8301H408.94L440.18 46.8301L410.1 2.83008H443.02L455.21 24.5801L467.75 2.83008H500.66L470.59 46.8301L501.83 92.8301H468.92H468.91Z"
            />
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
