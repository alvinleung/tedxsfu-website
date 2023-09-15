import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { useBreakpoint, breakpoints } from "@/hooks/useBreakpoints";
import iconCopy from "../../../public/img/ph_copy.svg";
import { useCopyToClipboard } from "usehooks-ts";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import NavToggle from "./NavToggle";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import MainGrid from "../layouts/MainGrid";

type Props = { desc: string; email: string; isDarkMode?: boolean };

const Copiable = ({ desc, email, isDarkMode }: Props) => {
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const copyAction = () => {
    copy(email);
    setCopied(true);

    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex flex-row">
      <div className="mb-4 mr-auto flex flex-col">
        <motion.h3 className="text-body-mobile">{desc}</motion.h3>
        <a
          href={`mailto:${email}`}
          className="flex w-full justify-between text-body-mobile opacity-50"
        >
          {email}
        </a>
      </div>
      {useBreakpoint(breakpoints.sm) && (
        <motion.button
          animate={{
            // background: isDarkMode ? "#232323" : "#555",
            color: isDarkMode ? "#FFFFFF7F" : "#333",
            // : "#242424"
          }}
          whileHover={{
            color: isDarkMode ? "#FFFFFF7F" : "#333",
            // background: isDarkMode ? "#444444" : "#5F5F5F",
          }}
          transition={{
            duration: AnimationConfig.NORMAL,
            ease: AnimationConfig.EASING,
          }}
          onClick={copyAction}
          className="mb-auto flex w-fit place-self-end overflow-hidden rounded-full p-[2px] text-micro"
          layout
        >
          <AnimatePresence mode="popLayout">
            <Image
              src={iconCopy}
              alt=""
              className={`h-4 opacity-60 ${isDarkMode ? "invert" : ""}`}
            />
            {copied ? (
              <motion.span
                key="copied"
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: "-100%",
                  opacity: 0,
                }}
                transition={{
                  duration: AnimationConfig.NORMAL,
                  ease: AnimationConfig.EASING,
                }}
              >
                Copied
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{
                  y: "100%",
                }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: "-100%",
                  opacity: 0,
                }}
                transition={{
                  duration: AnimationConfig.NORMAL,
                  ease: AnimationConfig.EASING,
                }}
              >
                Copy
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      )}
    </div>
  );
};

export default Copiable;
