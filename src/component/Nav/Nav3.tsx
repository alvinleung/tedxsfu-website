import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
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

  return (
    <NavContext.Provider value={{setScrollState}}>
      <motion.nav
        className="fixed mx-auto left-4 right-4 bottom-4 z-50 block h-12 bg-black text-white border border-white border-opacity-20 overflow-hidden"
        initial={{ width: "auto" }}
        animate={{
          width: scrollState == NavScrollState.DEFAULT ? "auto" :  "50%",
          // opacity: scrollState == NavScrollState.DEFAULT ? 1 : 0,
        }}
        style={{
          whiteSpace: "nowrap"
        }}
      >
        <motion.div 
        className="w-0 mx-auto flex justify-center" 
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
            <motion.div className="w-[calc(100vw-2rem)] flex flex-shrink-0 justify-center">
              <motion.a
              key="logo"
              href={"/"}
              className="block w-32 h-12"
              >
                <motion.img
                      className="max-w-none block w-32 h-12"
                      src="./TEDxSFU_logo_white.svg"
                      width="1168"
                      height="438"
                      alt="TEDxSFU"
                      key="white"
                    />
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
          className="h-12 w-full flex justify-center items-center text-center"
          initial={{ 
            y: "100%",
            // opacity: 0
          }}
          animate={{
            y: scrollState == NavScrollState.SCROLLED ? "-100%" : 0,
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
