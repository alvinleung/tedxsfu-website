import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import iconFacebook from "../../../public/img/ic_baseline-facebook.svg";
import iconInstagram from "../../../public/img/mdi_instagram.svg";
import iconLinkedin from "../../../public/img/mdi_linkedin.svg";
import iconTwitter from "../../../public/img/mdi_twitter.svg";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useBreakpoint, breakpoints } from "@/hooks/useBreakpoints";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import NavToggle from "./NavToggle";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import MainGrid from "../layouts/MainGrid";
import EmailForm from "../Footer/EmailForm";

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

const Nav = ({ children }: Props) => {
  const path = useRouter();
  const isAboutPage = path.pathname != "/";
  const [scrollState, setScrollState] = useState(NavScrollState.DEFAULT);
  const viewport = useWindowDimension();

  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  }

  return (
    <NavContext.Provider value={{ setScrollState }}>
      <motion.nav
        className="fixed z-50 top-0 left-0 right-0 px-4 pt-4 h-12 flex justify-between md:grid grid-cols-5 lg:grid-cols-6 2xl:grid-cols-8 gap-x-3 xs:gap-x-4"
        animate={{
          background: open ? "linear-gradient(#000000FF, #00000000)" : "linear-gradient(#00000000, #00000000)"
        }}
      >
        <motion.div
          key="logo"
          className="flex"
          >
              <motion.svg
                key="TEDx"
                viewBox="0 0 501 151"
                className="h-6"
              >
                <motion.path
                  fill="#EB0028"
                  d="M40.8 39.6522H0V2.20264h126.6V39.6522H85.7V148.396H40.8V39.6522Zm92.7-37.44956h122.9V39.6522h-78v18.2242h78v34.8461h-78v18.2245h78v37.449H133.5V2.20264Zm130.5 
                  0h73.7c48.6 0 65.8 36.04776 65.8 72.89656 0 44.8598-23.7 73.2968-74.5 73.2968h-65V2.20264ZM308.9 110.847h17.6c28 0 32.1-22.7306 
                  32.1-36.4487 0-9.2122-2.9-34.7461-35.3-34.7461H309v71.1948h-.1ZM468 92.322l-13.7-22.8302-13.4 22.8302H408l31.2-46.061-30.1-44.05836H442l12.2 21.82896 
                  12.5-21.82896h32.9L469.5 46.261l31.2 46.061H468Z"
                />
              </motion.svg>

              <motion.svg
                key="SFU"
                viewBox="0 0 375 151"
                className="h-6"
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
        </motion.div>
        <motion.div
          key="details"
          className={`flex flex-col md:flex-row max-md:items-end max-md:pr-1 max-md:border-r max-md:border-ted ${!open && "hidden"}`}  
        >
          <motion.a 
          className="w-fit text-micro-mobile max-xs:text-right flex-shrink-0 flex flex-col"
          >
            Sat{useBreakpoint(breakpoints.xs) && <>urday</>}, Nov{useBreakpoint(breakpoints.xs) && <>ember</>} 11, 2023
            {useBreakpoint(breakpoints.md) && <motion.span>Date</motion.span>}
          </motion.a>
          <motion.a
            className="w-fit text-micro-mobile max-xs:text-right flex-shrink-0 flex flex-col"
          >
            The Centre {useBreakpoint(breakpoints.xs) ? <>for Performing Arts</> : <>Vancouver</> }
            {useBreakpoint(breakpoints.md) && <motion.span>Venue</motion.span>}
          </motion.a>

        </motion.div>

        <motion.div className="max-md:fixed max-md:h-24 bottom-0 left-0 right-0 max-md:px-4 max-md:pt-5 max-md:grid grid-cols-4 gap-x-4
        md:gap-x-2 md:flex md:col-span-2 md:col-start-4 md:justify-self-end w-full md:justify-end
        lg:col-start-5 2xl:col-start-7"
        animate={{
          background: open ? "linear-gradient(#00000000, #000000FF)" : "linear-gradient(#00000000, #00000000)"
        }}
        >
          <motion.a className="col-span-2 text-micro-mobile md:text-micro py-3 text-center rounded-full bg-white text-black uppercase h-fit md:px-6 md:w-full max-w-[16rem]">
            Buy tickets now
          </motion.a>
          <motion.button 
            className="col-start-4 col-span-1 flex justify-center items-center h-10 py-3 border border-white rounded-full justify-self-end w-full max-w-[6rem] md:max-w-[4rem]"
            // style={{width: "max(auto, 4rem)"}}
            onClick={toggleOpen}>
            <motion.div className="h-5 w-5 bg-white rounded-full"/>
          </motion.button>
        </motion.div>
      </motion.nav>
      <AnimatePresence>
        {
        open &&
        <motion.div 
        className="fixed top-0 left-0 right-0 bottom-0 px-4 z-40 bg-black overflow-y-auto"
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        >
          <MainGrid className="pt-32">
              <motion.a className="col-span-full text-lead">
                Event info
              </motion.a>
              <motion.a className="col-span-full text-lead">
                About us
              </motion.a>

              <motion.div className="col-span-full">
                <motion.h2 className="text-lead-mobile">Let&apos;s keep in touch</motion.h2>
                <motion.div className="my-5">
                  <motion.h3 className="text-body-mobile">General inquiries</motion.h3>
                  <motion.a className="text-body-mobile opacity-50">info@tedxsfu.com</motion.a>
                </motion.div>

                <motion.div className="my-5">
                  <motion.h3 className="text-body-mobile">Partnership inquiries</motion.h3>
                  <motion.a className="text-body-mobile opacity-50">partner@tedxsfu.com</motion.a>
                </motion.div>
              </motion.div>

              <div className="col-span-full pb-12 sm:col-span-2 sm:col-start-1 md:col-start-2 md:col-span-2 2xl:col-span-2 2xl:col-start-2">
            <div className="mb-6 text-lead">
              Early bird ticket sale and exclusive content — right to your inbox.
            </div>
            <EmailForm isDarkMode={true} />
            </div>

            <div className="col-span-full sm:col-span-2 sm:col-start-3 md:col-start-4 2xl:col-span-2 2xl:col-start-6">
              <div className="pb-6 text-body md:text-lead">
                This independent TEDx event is operated under license from TED.
              </div>
              <div className="mb-6 flex flex-row gap-2">
                <a href="https://" target="_blank">
                  <Image
                    src={iconFacebook}
                    alt=""
                    className={true ? "" : "invert"}
                  />
                </a>
                <a href="https://instagram.com/tedxsfu" target="_blank">
                  <Image
                    src={iconInstagram}
                    alt=""
                    className={true ? "" : "invert"}
                  />
                </a>
                <a href="https://twitter.com/tedxsfu">
                  <Image
                    src={iconTwitter}
                    alt=""
                    className={true ? "" : "invert"}
                  />
                </a>
                <a href="https://linkedin.com/company/tedxsfu" target="_blank">
                  <Image
                    src={iconLinkedin}
                    alt=""
                    className={true ? "" : "invert"}
                  />
                </a>
              </div>
              <div className="text-body opacity-50">
                TEDxSFU respectfully acknowledges the xʷməθkʷəy̓əm (Musqueam),
                Sḵwx̱wú7mesh Úxwumixw (Squamish), səl̓ilw̓ətaʔɬ (Tsleil-Waututh),
                q̓íc̓əy̓ (Katzie), kʷikʷəƛ̓əm (Kwikwetlem), Qayqayt, Kwantlen,
                Semiahmoo and Tsawwassen peoples on whose unceded traditional
                territories our three campuses reside.
              </div>
            </div>
          </MainGrid>
        </motion.div>}
      </AnimatePresence>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  return useContext(NavContext);
};

export default Nav;
