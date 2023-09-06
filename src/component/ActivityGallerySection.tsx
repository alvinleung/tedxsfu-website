import React from "react";
import {
  SectionInfo,
  SectionInfoDescription,
  SectionInfoHeader,
  SectionLayout,
} from "./layouts/SectionLayouts";
import ActivityGallery from "./ActivityGallery/ActivityGallery";

type Props = {};

const ActivityGallerySection = (props: Props) => {
  return (
    <SectionLayout padding>
      <SectionInfo sticky>
        <SectionInfoHeader>Stuff we&apos;ve done this year</SectionInfoHeader>
        <SectionInfoDescription>
          We&apos;re opening up new personal and professional connections, one
          step at a time.
        </SectionInfoDescription>
      </SectionInfo>
      <div className="col-span-full col-start-1 mb-0">
        <ActivityGallery />
      </div>
    </SectionLayout>
  );
};

export default ActivityGallerySection;
