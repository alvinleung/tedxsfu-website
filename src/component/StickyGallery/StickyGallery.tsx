import React, { useEffect, useState } from "react";
import Image from "next/image";
import StickyContainer from "../ScrollContainer/StickyContainer";
import Sticky from "../ScrollContainer/Sticky";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import { motion } from "framer-motion";
import ImageSlide from "./ImageSlide";

type Props = {};

const StickyGallery = (props: Props) => {
  const { scrollY } = useContainerScroll();

  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    if (!isSectionVisible) return;
  }, [isSectionVisible]);

  return (
    <motion.div
      className="col-start-1 col-span-full"
      onViewportLeave={() => setIsSectionVisible(false)}
      onViewportEnter={() => setIsSectionVisible(true)}
    >
      <div>
        <ImageSlide src={"/about/cover.jpg"} />
        <ImageSlide src={"/about/cover.jpg"} />
        <ImageSlide src={"/about/cover.jpg"} />
      </div>
    </motion.div>
  );
};

export default StickyGallery;
