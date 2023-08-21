import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useWindowDimension } from "../../hooks/useWindowDimension"
import NavToggle from "./NavToggle";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";

type Props = { children: React.ReactNode };

interface NavContextInterface {
  setScrollState: (scrolledState: NavScrollState) => void;
}

export const NavContext = createContext<NavContextInterface>({
  setScrollState: (scrolledState: NavScrollState) => {},
});
export enum NavScrollState {
  SCROLLED,
  DEFAULT,
}

const Nav3 = ({ children }: Props) => {
  const path = useRouter();
  const isAboutPage = path.pathname != "/";
  const [scrollState, setScrollState] = useState(NavScrollState.DEFAULT);
  const viewport = useWindowDimension();

  return (
    <NavContext.Provider value={{ setScrollState }}>
      <motion.nav
        className="max-md:fixed left-4 right-4 z-50 mx-auto block h-12 border-white border-opacity-20 bg-opacity-90 before:bg-white max-md:fixed max-md:bottom-4 max-md:overflow-hidden max-md:border max-md:bg-black max-md:text-white md:top-4 md:flex md:justify-center md:gap-x-4"
        initial={{ width: "auto" }}
        animate={{
          width:
            scrollState == NavScrollState.DEFAULT || viewport.width >= 768
              ? "auto"
              : "calc(((100vw - 5rem) / 2) + 1rem)",
          // opacity: scrollState == NavScrollState.DEFAULT ? 1 : 0,
          background: viewport.width < 768 ? "#000000FF" : "#00000000",
        }}
        style={{
          whiteSpace: "nowrap",
        }}
      >
        <motion.div
          className="flex justify-center max-md:mx-auto max-md:w-0 md:!transform-none"
          key="topGroup"
          initial={false}
          animate={{
            y:
              viewport.width < 768
                ? scrollState == NavScrollState.DEFAULT
                  ? 0
                  : "-100%"
                : 0,
            // transform: "none",
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
          <motion.div className="flex w-[calc(100vw-2rem)] flex-shrink-0 justify-center md:w-[calc((4*(100vw-7rem)/5)+4rem)] lg:w-[calc((5*(100vw-8rem)/6)+5rem)] 2xl:w-[calc((7*(100vw-10rem)/8)+7rem)]">
            <motion.a
              key="logo"
              href={"/"}
              className="block flex h-12 w-32 flex-row-reverse max-md:px-4"
              onClick={(e) => {
                e.preventDefault();
                path.push("/");
              }}
            >
              {/* <motion.svg
                  className="max-w-none block w-32 h-12 max-md:px-4"
                  aria-label="TEDxSFU"
                  key="logo"
                  viewBox="0 0 876 152"
                  transition={{
                    duration: AnimationConfig.VERY_SLOW,
                    ease: AnimationConfig.EASING_INVERTED,
                  }}
                >
              <motion.path 
                fill="#FFFFFF"
                d="M617.299 39.3001c-.8-8.1-4.4-14.6-10.8-19.4-6.4-4.8-14.4-7.2-24-7.2-6.8 0-12.8 1.2-17.9 3.5-5.2 2.3-9.2 5.6-12.1 9.7-2.9 4.1-4.4 
                8.8-4.4 14 0 3.9.8 7.2 2.5 10.1 1.7 2.9 3.9 5.4 6.7 7.5 2.8 2.1 6 3.8 9.4 5.3 3.4 1.5 6.9 2.7 10.5 3.7l15.4 4.4c4.7 
                1.3 9.3 2.9 14 4.9 4.7 2 8.9 4.5 12.8 7.5 3.9 3 7 6.7 9.3 11.1 2.4 4.4 3.5 9.5999 3.5 15.6999 0 7.8-2 14.8-6.1 21-4.1 6.2-9.8 
                11.2-17.4 14.8-7.6 3.6-16.6 5.5-27.2 5.5-9.9 0-18.6-1.7-25.9-5-7.3-3.3-13.1-7.9-17.3-13.7-4.2-5.8-6.5-12.6-7.1-20.3h13.8c.5 5.8 
                2.4 10.6 5.7 14.6 3.3 4 7.7 7 13 9.1 5.3 2.1 11.3 3.1 17.8 3.1 7.3 0 13.8-1.2 19.4-3.7 5.7-2.4 10.2-5.9 13.4-10.3 3.3-4.4 4.9-9.5 
                4.9-15.4 0-4.9-1.3-9.1-3.9-12.4999-2.6-3.4-6.1-6.2-10.7-8.5s-9.9-4.3-15.9-6.1l-17.5-5.1c-11.5-3.4-20.4-8.2-26.7-14.2-6.3-6-9.5-13.7-9.5-23.1 0-7.8 
                2.1-14.8 6.3-20.7 4.2-6 9.9-10.6 17.1-14 7.2-3.4 15.3-5.000002 24.3-5.000002 9.1 0 17.1 1.700002 24.1 5.000002 7 3.3 12.5 7.9 16.7 13.7 4.1 5.8 6.3 
                12.5 6.6 19.9h-12.8v.1ZM658.1 148.9V2.7002h84.5v12h-71.2v55H736v12h-64.6V148.8h-13.3v.1ZM862.5 2.70009h13.3V99.5001c0 9.8999-2.3 18.7999-7 26.5999-4.7 7.8-11.1 
                14-19.4 18.5-8.3 4.5-17.9 6.7-28.9 6.7-10.9 0-20.6-2.3-28.9-6.8-8.3-4.5-14.8-10.7-19.5-18.5-4.7-7.8-7-16.7-7-26.5999v-96.8h13.3v95.8c0 7.7999 1.7 14.6999 5.2 20.6999 
                3.5 6.1 8.4 10.8 14.7 14.3 6.3 3.5 13.7 5.2 22.2 5.2s15.9-1.7 22.2-5.2c6.3-3.5 11.2-8.2 14.7-14.3 3.4-6.1 5.2-13 5.2-20.6999l-.1-95.70001Z"/>
                <motion.path 
                fill="#EB0028" 
                d="M40.8 40.1998H0v-37.4h126.6v37.4H85.7V148.8H40.8V40.1998Zm92.7-37.4h122.9v37.4h-78v18.2h78v34.8h-78V111.4h78v37.4H133.5V2.7998Zm130.5 
                0h73.7c48.6 0 65.8 36 65.8 72.8C403.5 120.4 379.8 148.8 329 148.8h-65V2.7998ZM308.9 111.3h17.6c28 0 32.1-22.7002 32.1-36.4002 
                0-9.2-2.9-34.7-35.3-34.7H309V111.3h-.1ZM468 92.7998l-13.7-22.8-13.4 22.8H408l31.2-46-30.1-44H442l12.2 21.8 12.5-21.8h32.9l-30.1 44 31.2 46H468Z"/>
              </motion.svg> */}
              <motion.svg 
                key="SFU"
                viewBox="0 0 375 151"
                className="md:fixed z-50 md:mix-blend-exclusion md:top-4 md:left-[6rem] md:h-6"
              >
                <motion.path
                  fill="#FFFFFF"
                  d="M116.299 38.4947c-.8-8.057-4.4-14.5226-10.8-19.2971-6.3998-4.7745-14.3998-7.1618-23.9998-7.1618-6.8 0-12.8 1.1936-17.9 3.4814-5.2 2.2878-9.2 
                  5.5703-12.1 9.6486-2.9 4.0782-4.4 8.7533-4.4 13.9257 0 3.8793.8 7.1618 2.5 10.0464s3.9 5.3714 6.7 7.4602c2.8 2.0889 6 3.7799 9.4 5.2719 3.4 1.4921 
                  6.9 2.6857 10.5 3.6804l15.4 4.3767c4.7 1.2931 9.2998 2.8846 13.9998 4.874 4.7 1.9894 8.9 4.4761 12.8 7.4602 3.9 2.9841 7 6.6644 9.3 11.0411 2.4 4.3766 
                  3.5 9.5486 3.5 15.6166 0 7.759-2 14.722-6.1 20.889s-9.8 11.14-17.4 14.721c-7.6 3.581-16.5998 
                  5.471-27.1998 5.471-9.9 0-18.6-1.691-25.9-4.973-7.3-3.283-13.1-7.859-17.3-13.628-4.2-5.769-6.5-12.533-7.1-20.192h13.8c.5 5.769 2.4 10.544 5.7 14.522 3.3 3.979 
                  7.7 6.963 13 9.052 5.3 2.089 11.3 3.084 17.8 3.084 7.3 0 13.8-1.194 19.4-3.681 5.6998-2.387 10.1998-5.868 13.3998-10.245 3.3-4.377 4.9-9.45 4.9-15.318 
                  0-4.874-1.3-9.052-3.9-12.434-2.6-3.382-6.1-6.1671-10.7-8.4549-4.5998-2.2878-9.8998-4.2772-15.8998-6.0676l-17.5-5.073c-11.5-3.3819-20.4-8.1565-26.7-14.1247-6.3-5.9681-9.5-13.6273-9.5-22.9774 0-7.7586 
                  2.1-14.7215 6.3-20.5902 4.2-5.9682 9.9-10.54376 17.1-13.92572C64.5992 1.59151 72.6992 0 81.6992 0c9.1 0 17.1 1.69098 24.0998 4.97348 7 3.28249 12.5 7.85812 16.7 13.62732 4.1 5.7692 6.3 12.4337 6.6 
                  19.7944h-12.8v.0995ZM157.1 147.513V2.08887h84.5V14.0252h-71.2v54.7082H235v11.9364h-64.6v66.7442h-13.3v.099ZM361.5 2.08872h13.3V98.3752c0 9.8478-2.3 18.6998-7 26.4588s-11.1 13.926-19.4 18.402c-8.3 4.476-17.9 
                  6.664-28.9 6.664-10.9 0-20.6-2.287-28.9-6.764-8.3-4.476-14.8-10.643-19.5-18.401-4.7-7.759-7-16.612-7-26.4593V1.98926h13.3V97.281c0 7.759 1.7 14.622 5.2 20.59 3.5 6.068 8.4 10.743 14.7 14.224 6.3 3.482 13.7 
                  5.173 22.2 5.173s15.9-1.691 22.2-5.173c6.3-3.481 11.2-8.156 14.7-14.224 3.4-6.067 5.2-12.931 5.2-20.59l-.1-95.19228Z"
                />
              </motion.svg>
              <motion.svg 
                key="TEDx"
                viewBox="0 0 501 151"
                className="md:fixed z-50 md:top-4 md:left-4 md:h-6"
                >
                <motion.path 
                  fill="#EB0028"
                  d="M40.8 39.6522H0V2.20264h126.6V39.6522H85.7V148.396H40.8V39.6522Zm92.7-37.44956h122.9V39.6522h-78v18.2242h78v34.8461h-78v18.2245h78v37.449H133.5V2.20264Zm130.5 
                  0h73.7c48.6 0 65.8 36.04776 65.8 72.89656 0 44.8598-23.7 73.2968-74.5 73.2968h-65V2.20264ZM308.9 110.847h17.6c28 0 32.1-22.7306 
                  32.1-36.4487 0-9.2122-2.9-34.7461-35.3-34.7461H309v71.1948h-.1ZM468 92.322l-13.7-22.8302-13.4 22.8302H408l31.2-46.061-30.1-44.05836H442l12.2 21.82896 
                  12.5-21.82896h32.9L469.5 46.261l31.2 46.061H468Z"
                />
              </motion.svg>
            </motion.a>

            <motion.div key="toggle" className="ml-auto uppercase">
              <NavToggle path={path.pathname} />
            </motion.div>

          </motion.div>
        </motion.div>
        <motion.a
          key="partnerCTA"
          href={"mailto:yeeloong.tang@tedxsfu.com"}
          target="_blank"
          className="
          h-10 max-md:w-full flex justify-center items-center text-center uppercase text-micro
          md:max-w-[calc((100vw-7rem)/5)] lg:max-w-[calc((100vw-8rem)/6)] 2xl:max-w-[calc((100vw-10rem)/8)] 
          md:px-2 md:ml-auto md:border md:border-white md:border-opacity-50
          md:fixed z-50 md:top-4 md:right-4 md:mix-blend-exclusion"
          initial={{ 
            y: "100%",
            // opacity: 0
          }}
          animate={{

            y:
              viewport.width < 768
                ? scrollState == NavScrollState.SCROLLED
                  ? "-100%"
                  : 0
                : 0,
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

export const useNavContext = () => {
  return useContext(NavContext);
};

export default Nav3;
