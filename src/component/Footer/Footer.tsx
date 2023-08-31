import React, { useEffect, useState } from "react";
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

type Props = {
  mode?: "dark" | "light";
  arrowDirection?: "normal" | "reverse";
  targetPageName: string;
  targetPageHref: string;
  bgImageSrc: string;
  pageNumber: string;
};

const Footer = ({
  mode = "dark",
  targetPageHref: href,
  arrowDirection = "normal",
  bgImageSrc,
  targetPageName,
  pageNumber,
}: Props) => {
  const { isOverscrollComplete, isOverscrollStarted, overscrollProgress } =
    useOverscroll(OverscrollDirection.DOWN, 100);
  const { scrollHeight, scrollY } = useContainerScroll();
  const windowDim = useWindowDimension();

  const offset = useTransform(
    overscrollProgress,
    [0, 1],
    [0, arrowDirection === "normal" ? 10 : -10],
  );

  const exitTransitionProgress = useTransform(
    scrollY,
    [
      scrollHeight - windowDim.height - windowDim.height,
      scrollHeight - windowDim.height,
    ],
    [0, 1],
  );

  const bgScale = useTransform(exitTransitionProgress, [0, 1], [1.2, 1.4]);
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
  useEffect(() => {
    if (isOverscrollComplete) {
      router.push(href);
    }
  }, [isOverscrollComplete]);

  const handleClick = () => {
    router.push(href);
  };

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
              <a href="https://" target="_blank">
                <Image
                  src={iconFacebook}
                  alt=""
                  className={isDarkMode ? "" : "invert"}
                />
              </a>
              <a href="https://instagram.com/tedxsfu" target="_blank">
                <Image
                  src={iconInstagram}
                  alt=""
                  className={isDarkMode ? "" : "invert"}
                />
              </a>
              <a href="https://twitter.com/tedxsfu">
                <Image
                  src={iconTwitter}
                  alt=""
                  className={isDarkMode ? "" : "invert"}
                />
              </a>
              <a href="https://linkedin.com/company/tedxsfu" target="_blank">
                <Image
                  src={iconLinkedin}
                  alt=""
                  className={isDarkMode ? "" : "invert"}
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
      </motion.footer>
      <MainGrid
        className={`relative z-0 h-[80vh] cursor-pointer bg-black px-4 text-white`}
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="z-10 mt-4 pl-4 uppercase md:col-start-1"
          animate={{
            opacity: isHovering || isOverscrollStarted ? 1 : 0.3,
          }}
        >
          {pageNumber}
        </motion.div>
        <motion.div
          className="relative z-10 col-span-1 mt-4 uppercase max-md:ml-2 md:col-start-2"
          animate={{
            opacity: isHovering || isOverscrollStarted ? 1 : 0.4,
          }}
        >
          {targetPageName}
        </motion.div>
        <motion.img
          className={`relative z-10 mt-4`}
          src="../icon/arrow-white.svg"
          style={{ x: offset, rotate: arrowDirection == "normal" ? 0 : 180 }}
          animate={{
            opacity: isHovering || isOverscrollStarted ? 1 : 0.3,
          }}
        />

        <div className="absolute z-0 h-full w-full overflow-hidden">
          <motion.img
            src={bgImageSrc}
            className="h-full object-cover"
            width={2560}
            height={1440}
            alt="Picture of the author"
            style={{ y: bgOverscrollOffset, scale: bgScale }}
            animate={{
              opacity: isHovering || isOverscrollStarted ? 1 : 0.9,
            }}
          />
        </div>
      </MainGrid>
    </>
  );
};

export default Footer;
