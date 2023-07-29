import { pastActivities } from "@/data/pastActivitiesData";
import { motion } from "framer-motion";
import React from "react";

type Props = {};

const PastActivitiesGallery = (props: Props) => {
  return (
    <div className="grid grid-cols-8 gap-4 align-start">
      {pastActivities.map((activity,i) => (
        <React.Fragment key={i}>
          <motion.div className="col-start-1 col-span-1">
            <div className="sticky top-[20vh] float-left h-[50vh]">
              <div className="text-body">{activity.date}</div>
            </div>
          </motion.div>
          <motion.div className="col-start-2 col-span-1">
            <div className="sticky top-[20vh] float-left h-[50vh]">
              <h4 className="text-body mb-4">{activity.header}</h4>
              <p className="text-body opacity-50">{activity.description}</p>
            </div>
          </motion.div>
          <div className="col-start-3 col-span-full">
            <div className="grid grid-cols-6 gap-4">
              {activity.media.map((media, i) => {
                const firstItemStyling =
                  i === 0 ? "col-span-full" : "col-span-3";

                return (
                  <div className={`${firstItemStyling}`} key={i}>
                    <img src={media.src} width={1280} height={720} />
                  </div>
                );
              })}
            </div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default PastActivitiesGallery;
