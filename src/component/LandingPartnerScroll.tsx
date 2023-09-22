import partners from "@/data/partnerData";
import { motion, useTransform } from "framer-motion";
import React from "react";
import { useContainerScroll } from "./ScrollContainer/ScrollContainer";
import { useWindowDimension } from "@/hooks/useWindowDimension";

type Props = {
  isVisible: boolean;
};

const LandingPartnerScroll = ({ isVisible }: Props) => {
  return (
    <motion.div
      animate={{
        y: isVisible ? 0 : -20,
        opacity: isVisible ? 0 : 1,
      }}
    >
      <div className="text-center text-micro-mobile uppercase">
        Proudly Supported By
      </div>
      <div className="mt-4 flex items-center justify-center gap-6 px-12">
        {partners.map(
          (partner) =>
            partner.featured && (
              <div className="grow">
                <img src={partner.logo} className="max-h-12" />
              </div>
            ),
        )}
      </div>
    </motion.div>
  );
};

export default LandingPartnerScroll;
