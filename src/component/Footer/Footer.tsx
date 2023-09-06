import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import MainGrid from "../layouts/MainGrid";

import iconFacebook from "../../../public/img/ic_baseline-facebook.svg";
import iconInstagram from "../../../public/img/mdi_instagram.svg";
import iconLinkedin from "../../../public/img/mdi_linkedin.svg";
import iconTwitter from "../../../public/img/mdi_twitter.svg";
import Image from "next/image";
import EmailForm from "./EmailForm";
import OverscrollLink from "./OverscrollLink";
import {
  OverscrollDirection,
  useOverscroll,
} from "@/hooks/Overscroll/useOverscroll";
import { motion, useTransform } from "framer-motion";
import { useRouter } from "next/router";
import Sticky from "../ScrollContainer/Sticky";
import StickyContainer from "../ScrollContainer/StickyContainer";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Copiable from "../Nav/Copiable";
import { AnimationConfig } from "../AnimationConfig";

type Props = {
  mode?: "dark" | "light";
  targetPageName: string;
  targetPageHref: string;
  bgSrc: string;
  bgType: "video" | "image";
  pageNumber: string;
};

const Footer = ({
  mode = "dark",
  targetPageHref: href,
  bgSrc,
  bgType = "image",
  targetPageName,
  pageNumber,
}: Props) => {
  const { isOverscrollComplete, isOverscrollStarted, overscrollProgress } =
    useOverscroll(OverscrollDirection.DOWN, 100);
  const { scrollEnd, scrollY, scrollTo, setCanScroll } = useContainerScroll();

  const windowDim = useWindowDimension();
  const offset = useTransform(overscrollProgress, [0, 1], [0, 15]);

  const exitTransitionProgress = useTransform(
    scrollY,
    [scrollEnd - windowDim.height, scrollEnd],
    [0, 1],
  );

  const bgScale = useTransform(exitTransitionProgress, [0, 1], [1, 1.125]);
  const footerOpacity = useTransform(
    exitTransitionProgress,
    [0.7, 1],
    [1, 0.1],
  );
  const bgOverscrollOffset = useTransform(
    exitTransitionProgress,
    [0, 1],
    [-windowDim.height * 0.8, 0],
  );

  const [isHovering, setIsHovering] = useState(false);

  const router = useRouter();

  const transitionImageContainerRef =
    useRef() as MutableRefObject<HTMLDivElement>;
  const [transitionInitialY, setTransitionInitialY] = useState(0);

  // beginPageTransition
  const beginPageTransition = () => {
    const bounds = transitionImageContainerRef.current.getBoundingClientRect();
    setTransitionInitialY(bounds.top - windowDim.height * 0.2);

    // scorll lock
    scrollTo(scrollY.getPrevious());
    setCanScroll(false);

    // only change page after updating the exit transition value
    requestAnimationFrame(() => router.push(href));
  };

  useEffect(() => {
    if (isOverscrollComplete) {
      beginPageTransition();
    }
  }, [isOverscrollComplete, windowDim.height]);

  const handleClick = () => beginPageTransition();

  const isDarkMode = mode === "dark";

  return (
    <>
      <motion.footer
        className="px-4 pt-12"
        style={{
          backgroundColor: isDarkMode ? "black" : "white",
          color: isDarkMode ? "white" : "black",
          opacity: footerOpacity,
        }}
      >
        <MainGrid className="pb-24">
          <div className="col-span-full pb-12 sm:col-span-2 sm:col-start-1 md:col-span-2 md:col-start-2 2xl:col-span-2 2xl:col-start-2">
            <div className="mb-6 text-lead">
              Early bird ticket sale and exclusive content — right to your
              inbox.
            </div>
            <EmailForm isDarkMode={isDarkMode} />
          </div>

          <div className="col-span-full sm:col-span-2 sm:col-start-3 md:col-start-4 2xl:col-span-2 2xl:col-start-6">
            <div className="pb-6 text-body md:text-lead">
              This independent TEDx event is operated under license from TED.
            </div>
            <div className="mb-6 flex flex-row gap-2">
            <motion.a
              href="https://www.facebook.com/profile.php?id=100094774132695"
              target="_blank"
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={iconFacebook}
                alt="Facebook"
                className={isDarkMode ? "" : "invert"}
              />
            </motion.a>
            <motion.a
              href="https://instagram.com/tedxsfu"
              target="_blank"
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={iconInstagram}
                alt="Instagram"
                className={isDarkMode ? "" : "invert"}
              />
            </motion.a>
            <motion.a
              href="https://twitter.com/tedxsfu"
              target="_blank"
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={iconTwitter}
                alt="Twitter"
                className={isDarkMode ? "" : "invert"}
              />
            </motion.a>
            <motion.a
              href="https://linkedin.com/company/tedxsfu"
              target="_blank"
              whileHover={{ scale: 1.1 }}
            >
              <Image
                src={iconLinkedin}
                alt="LinkedIn"
                className={isDarkMode ? "" : "invert"}
              />
            </motion.a>
            </div>
            <div className="text-body opacity-50 mb-4">
              TEDxSFU respectfully acknowledges the xʷməθkʷəy̓əm (Musqueam),
              Sḵwx̱wú7mesh Úxwumixw (Squamish), səl̓ilw̓ətaʔɬ (Tsleil-Waututh),
              q̓íc̓əy̓ (Katzie), kʷikʷəƛ̓əm (Kwikwetlem), Qayqayt, Kwantlen,
              Semiahmoo and Tsawwassen peoples on whose unceded traditional
              territories our three campuses reside.
            </div>
            <Copiable
                    desc="General inquiries &amp; ticketing"
                    email="info@tedxsfu.com"
                  />
            <Copiable
              desc="Partnership inquiries"
              email="partner@tedxsfu.com"
            />
          </div>
        </MainGrid>
      </motion.footer>
      <MainGrid
        className={`relative z-0 h-[80dvh] cursor-pointer bg-black text-white`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="z-10 mt-4 pl-4 uppercase md:col-start-1"
          animate={{
            opacity: isHovering || isOverscrollStarted ? 1 : 0.3,
          }}
          exit={{
            opacity: 0,
          }}
        >
          {pageNumber}
        </motion.div>
        <motion.div
          className="relative z-10 col-span-1 mt-4 uppercase max-md:ml-2 md:col-start-2"
          animate={{
            opacity: isHovering || isOverscrollStarted ? 1 : 0.4,
          }}
          exit={{
            opacity: 0,
          }}
        >
          {targetPageName}
        </motion.div>
        <motion.img
          className={`relative z-10 mt-4`}
          src="../icon/arrow-white.svg"
          style={{ x: offset }}
          animate={{
            opacity: isHovering || isOverscrollStarted ? 1 : 0.3,
          }}
          exit={{
            opacity: 0,
          }}
        />

        <motion.div
          className="absolute bottom-0 z-0 h-full w-full overflow-hidden bg-black"
          exit={{
            height: windowDim.height,
            y: -transitionInitialY,
            transition: {
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING_IN_OUT,
            },
          }}
          ref={transitionImageContainerRef}
        >
          <motion.div
            className="origin-top"
            style={{
              y: bgOverscrollOffset,
              scale: bgScale,
            }}
            animate={{
              opacity: isHovering || isOverscrollStarted ? 1 : 0.6,
            }}
            exit={{
              scale: 1.125,
              opacity: 1,
              y: 0,
              transition: {
                duration: AnimationConfig.VERY_SLOW,
                ease: AnimationConfig.EASING_IN_OUT,
              },
            }}
          >
            {bgType === "image" && (
              <Image
                src={bgSrc}
                className="h-[100dvh] object-cover"
                width={2560}
                height={1440}
                alt="Picture of the author"
              />
            )}
            {bgType === "video" && (
              <video
                src={bgSrc}
                className="h-[100dvh] object-cover"
                width={2560}
                height={1440}
                muted
                loop
                autoPlay
              />
            )}
          </motion.div>
        </motion.div>
      </MainGrid>
    </>
  );
};

export default Footer;
