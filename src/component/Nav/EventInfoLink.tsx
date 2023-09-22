import { motion } from "framer-motion";
import React, { useState } from "react";
import Image from "next/image";

import arrowTopRight from "../../../public/img/mdi_arrow-top-right.svg";
import MainGrid from "../layouts/MainGrid";

interface EventInfoLinkProps {
  children: React.ReactNode;
  label: string;
  href: string;
  className?: string;
  centerAlign?: boolean;
}
export const EventInfoLink = ({
  children,
  href,
  label,
  className,
  centerAlign,
}: EventInfoLinkProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      className={`my-[-3px] flex flex-col text-nav ${className} ${
        centerAlign ? "items-center justify-center text-center" : ""
      }`}
      onHoverStart={(e) => {
        setIsHovering(true);
      }}
      onHoverEnd={(e) => {
        setIsHovering(false);
      }}
    >
      {children}
      <span className={`mt-1 hidden gap-x-1 tracking-wide opacity-50 xs:flex`}>
        {label}
        <motion.div
          animate={{
            x: isHovering ? "0.125rem" : 0,
            y: isHovering ? "-0.125rem" : 0,
          }}
        >
          <Image src={arrowTopRight} alt="" className="h-4 w-auto invert" />
        </motion.div>
      </span>
    </motion.a>
  );
};

export default EventInfoLink;
