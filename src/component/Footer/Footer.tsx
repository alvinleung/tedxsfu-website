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

  const offset = useTransform(
    overscrollProgress,
    [0, 1],
    [0, arrowDirection === "normal" ? 10 : -10],
  );
  const bgScale = useTransform(overscrollProgress, [0, 1], [1.4, 1.4]);
  const bgOffset = useTransform(overscrollProgress, [0, 1], [0, -30]);

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
      <footer
        className="px-4 pt-12"
        style={{
          backgroundColor: isDarkMode ? "black" : "white",
          color: isDarkMode ? "white" : "black",
        }}
      >
        <MainGrid>
          <div className="col-span-full pb-12 sm:col-span-2 sm:col-start-1 md:col-start-2 2xl:col-span-2 2xl:col-start-2">
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
              <a>
                <Image
                  src={iconFacebook}
                  alt=""
                  className={isDarkMode ? "" : "invert"}
                />
              </a>
              <a>
                <Image
                  src={iconInstagram}
                  alt=""
                  className={isDarkMode ? "" : "invert"}
                />
              </a>
              <a>
                <Image
                  src={iconTwitter}
                  alt=""
                  className={isDarkMode ? "" : "invert"}
                />
              </a>
              <a>
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
      </footer>
      <MainGrid
        className="relative mx-4 mt-32 h-[30vh] cursor-pointer"
        onClick={handleClick}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <motion.div
          className="mt-4 pl-4 uppercase md:col-start-1"
          animate={{
            opacity: isHovering || isOverscrollStarted ? 1 : 0.3,
          }}
        >
          {pageNumber}
        </motion.div>
        <motion.div
          className="col-span-1 mt-4 uppercase max-md:ml-2 md:col-start-2"
          animate={{
            opacity: isHovering || isOverscrollStarted ? 1 : 0.4,
          }}
        >
          {targetPageName}
        </motion.div>
        <motion.img
          className={`z-10 mt-4 ${isDarkMode ? "" : "invert"}`}
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
            style={{ y: bgOffset, scale: bgScale }}
            animate={{
              opacity: isHovering || isOverscrollStarted ? 0.5 : 0.3,
            }}
          />
        </div>
      </MainGrid>
    </>
  );
};

export default Footer;
