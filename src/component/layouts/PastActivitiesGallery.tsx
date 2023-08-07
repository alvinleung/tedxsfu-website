import { pastActivities } from "@/data/pastActivitiesData";
import { motion } from "framer-motion";
import React from "react";
import StickyContainer from "../ScrollContainer/StickyContainer";
import Sticky from "../ScrollContainer/Sticky";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import MainGrid from "./MainGrid";

type Props = {};

const PastActivitiesGallery = (props: Props) => {
  const { refreshDocumentMeasurement } = useContainerScroll();

  return (
    <MainGrid>
      {pastActivities.map((activity, i) => (
        <React.Fragment key={i}>
          <StickyContainer>
            <Sticky top="20vh" fadeOut>
              <div className="h-[20vh]">
                <div className="text-body">{activity.date}</div>
              </div>
            </Sticky>
          </StickyContainer>
          <StickyContainer>
            <Sticky top="20vh" fadeOut>
              <div className="h-[20vh]">
                <h4 className="mb-4 text-body">{activity.header}</h4>
                <p className="text-body opacity-50">{activity.description}</p>
              </div>
            </Sticky>
          </StickyContainer>

          <div className="col-span-full col-start-4">
            <div className="grid grid-cols-6 gap-4">
              {activity.media.map((media, i) => {
                const firstItemStyling =
                  i === 0 ? "col-span-full" : "col-span-3";

                return (
                  <div className={`${firstItemStyling}`} key={i}>
                    <img
                      src={media.src}
                      width={1280}
                      height={720}
                      onLoad={() => refreshDocumentMeasurement()}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      ))}
    </MainGrid>
  );
};

export default PastActivitiesGallery;
