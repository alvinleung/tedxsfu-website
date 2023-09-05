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

type Props = { desc : string, email : string };


const Copiable = ({ desc, email }: Props) => {
    const lg = useBreakpoint(breakpoints.lg);
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const copyAction = () => {
    copy(email);
    setCopied(true);
  }
  
  return (
    <motion.div className="col-span-full xs:col-span-3 xs:col-start-2 md:col-start-3 lg:col-span-2 lg:col-start-3
        grid grid-cols-4 md:grid-cols-3 gap-x-4">
        <motion.div className="col-span-3 md:col-span-2">
        <motion.h3 className="text-body-mobile">{desc}</motion.h3>
        <motion.button
            onClick={copyAction} 
            className="text-body-mobile opacity-50 w-full flex justify-between"
            onHoverEnd={e => setCopied(lg ? false : true)}
            >
            {email}
        </motion.button>
        </motion.div>
        {useBreakpoint(breakpoints.sm) && 
        <motion.button 
        animate={{
            background: "#303030"
        }}
        whileHover={{
            background:"#393939"
        }}
        onClick={copyAction} 
        className="place-self-end text-white/50 w-fit py-1 px-2 flex gap-x-1 rounded-full overflow-hidden"
        layout
        onHoverEnd={e => {setCopied(lg ? false : true)}}
        >
            <AnimatePresence mode="popLayout">
                <Image
                    src={iconCopy}
                    alt=""
                    className={"invert opacity-50 aspect-square"}/> 
            {
                copied ?
                <motion.span
                    key="copied"
                    initial={{
                        y: "100%"
                    }}
                    animate={{
                        y: 0
                    }}
                    exit={{
                        y: "-100%",
                        opacity: 0
                    }}
                >
                    Copied
                </motion.span> 
                : 
                <motion.span
                    key="copy"
                    initial={{
                        y: "100%"
                    }}
                    animate={{
                        y: 0
                    }}
                    exit={{
                        y: "-100%",
                        opacity: 0
                    }}
                >
                    Copy
                </motion.span>
            }
            </AnimatePresence>
        </motion.button>}
    </motion.div>
  );
};

export default Copiable;
