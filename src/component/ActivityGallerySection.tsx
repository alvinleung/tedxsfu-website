import React, { useState } from "react";
import {
  SectionInfo,
  SectionInfoDescription,
  SectionInfoHeader,
  SectionLayout,
} from "./layouts/SectionLayouts";
import ActivityGallery from "./ActivityGallery/ActivityGallery";
import { motion } from "framer-motion";

type Props = {};

const ActivityGallerySection = (props: Props) => {
  const [isPastGallery, setIsPastGallery] = useState(false);

  return (
    <SectionLayout padding>
      <SectionInfo sticky>
        <motion.div
          animate={{
            opacity: isPastGallery ? 0 : 1,
          }}
        >
          <SectionInfoHeader>Stuff we&apos;ve done this year</SectionInfoHeader>
          <SectionInfoDescription>
            We&apos;re opening up new personal and professional connections, one
            step at a time.
          </SectionInfoDescription>
        </motion.div>
      </SectionInfo>
      <div className="col-span-full col-start-1 mb-0">
        <ActivityGallery
          onScrolledPastGallery={() => setIsPastGallery(true)}
          onScrolledBeforeGallery={() => setIsPastGallery(false)}
        />
      </div>
    </SectionLayout>
  );
};

export default ActivityGallerySection;
