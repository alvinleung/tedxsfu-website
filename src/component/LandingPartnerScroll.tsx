import partners from "@/data/partnerData";
import { motion, useTransform } from "framer-motion";
import React, { useMemo } from "react";
import { useContainerScroll } from "./ScrollContainer/ScrollContainer";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { AnimationConfig } from "./AnimationConfig";

type Props = {
  isVisible: boolean;
};

const LandingPartnerScroll = ({ isVisible }: Props) => {
  const featuredPartners = useMemo(
    () => partners.filter((partner) => partner.featured),
    [],
  );

  return (
    <div>
      <motion.div
        animate={{
          opacity: isVisible ? 1 : 0,
          transition: {
            duration: AnimationConfig.FAST,
          },
        }}
        className="text-center text-micro-mobile uppercase"
      >
        Proudly Supported By
      </motion.div>
      <motion.div
        className="mt-4 flex items-center justify-center gap-6 px-12"
        // transition={{ delayChildren: 0.1 }}
      >
        {featuredPartners.map((partner, index) => (
          <motion.div
            className="grow"
            key={index}
            animate={{
              opacity: isVisible ? 1 : 0,
              y: isVisible ? 0 : 10,
              transition: {
                duration: AnimationConfig.FAST,
                delay: isVisible ? index * 0.1 : 0,
              },
            }}
          >
            <img src={partner.logo} className="max-h-12" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LandingPartnerScroll;
