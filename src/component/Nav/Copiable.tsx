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

type Props = { desc: string; email: string };

const Copiable = ({ desc, email }: Props) => {
const lg = useBreakpoint(breakpoints.lg);
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const copyAction = () => {
    copy(email);
    setCopied(true);
  };

  return (
    <div className="flex flex-row">
      <div className="mb-4 mr-auto flex flex-col">
        <motion.h3 className="text-body-mobile">{desc}</motion.h3>
        <motion.button
          onClick={copyAction}
          className="flex w-full justify-between text-body-mobile opacity-50"
          onHoverEnd={(e) => {
            setCopied(!lg);
          }}
        >
          {email}
        </motion.button>
      </div>
      {useBreakpoint(breakpoints.sm) && (
        <motion.button
          animate={{
            background: "#242424",
          }}
          whileHover={{
            background: "#393939",
          }}
          onClick={copyAction}
          className="mb-auto flex w-fit place-self-end overflow-hidden rounded-full p-1 pr-2 text-micro text-white/50"
          layout
          onHoverEnd={(e) => {
            setCopied(!lg);
          }}
        >
          <AnimatePresence mode="popLayout">
            <Image src={iconCopy} alt="" className={"h-4 opacity-50 invert"} />
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
