import React, { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  isHighlighted: boolean;
  isAboutPage: boolean;
};

type Props2 = {
  isAboutPage: boolean;
  isHovered: boolean;
};

const TicketIcon = (props: Props2) => {
  const pathVariants = {
    bottomAnim:[
      "M6.94508 12.4266C7.21355 11.4246 8.24344 10.83 9.2454 11.0985L23.0284 14.7916C24.0304 15.0601 24.625 16.09 24.3565 17.092L22.5099 23.9835C22.2414 24.9854 21.2116 25.58 20.2096 25.3115L6.42659 21.6184C5.42463 21.3499 4.83003 20.32 5.0985 19.3181L6.94508 12.4266Z",
      "M6.05987 13.8657C6.15027 12.8324 7.06126 12.068 8.09462 12.1584L22.3095 13.402C23.3429 13.4924 24.1073 14.4034 24.0169 15.4368L23.3951 22.5442C23.3047 23.5776 22.3937 24.342 21.3603 24.2516L7.1454 23.0079C6.11205 22.9175 5.34764 22.0066 5.43804 20.9732L6.05987 13.8657Z",
      "M6.72341 11.4058C7.07819 10.431 8.15598 9.92846 9.13073 10.2832L22.5394 15.1636C23.5142 15.5184 24.0167 16.5962 23.662 17.5709L21.2218 24.2753C20.867 25.25 19.7892 25.7526 18.8145 25.3978L5.40578 20.5174C4.43103 20.1627 3.92845 19.0849 4.28323 18.1101L6.72341 11.4058Z",
      "M6.94508 12.4266C7.21355 11.4246 8.24344 10.83 9.2454 11.0985L23.0284 14.7916C24.0304 15.0601 24.625 16.09 24.3565 17.092L22.5099 23.9835C22.2414 24.9854 21.2116 25.58 20.2096 25.3115L6.42659 21.6184C5.42463 21.3499 4.83003 20.32 5.0985 19.3181L6.94508 12.4266Z",
    ],
    bottomStatic: "M6.94508 12.4266C7.21355 11.4246 8.24344 10.83 9.2454 11.0985L23.0284 14.7916C24.0304 15.0601 24.625 16.09 24.3565 17.092L22.5099 23.9835C22.2414 24.9854 21.2116 25.58 20.2096 25.3115L6.42659 21.6184C5.42463 21.3499 4.83003 20.32 5.0985 19.3181L6.94508 12.4266Z",
    topAnim: [
      "M2.5872 14.2032C1.85371 13.4697 1.85372 12.2805 2.5872 11.547L12.6771 1.45717C13.4105 0.723685 14.5998 0.723686 15.3332 1.45717L20.3782 6.5021C21.1117 7.23559 21.1117 8.4248 20.3782 9.15828L10.2883 19.2481C9.55483 19.9816 8.36561 19.9816 7.63213 19.2481L2.5872 14.2032Z",
      "M4.09849 11.092C3.83001 10.09 4.42462 9.06011 5.42658 8.79163L19.2096 5.09849C20.2115 4.83001 21.2414 5.42462 21.5099 6.42658L23.3565 13.3181C23.625 14.32 23.0303 15.3499 22.0284 15.6184L8.24538 19.3115C7.24342 19.58 6.21353 18.9854 5.94506 17.9835L4.09849 11.092Z",
      "M2.391 15.6894C1.54129 15.0944 1.33478 13.9233 1.92975 13.0735L10.1142 1.38488C10.7092 0.535171 11.8804 0.328667 12.7301 0.923639L18.5744 5.01588C19.4241 5.61086 19.6306 6.782 19.0356 7.63171L10.8512 19.3204C10.2562 20.1701 9.08504 20.3766 8.23533 19.7816L2.391 15.6894Z",
      "M2.5872 14.2032C1.85371 13.4697 1.85372 12.2805 2.5872 11.547L12.6771 1.45717C13.4105 0.723685 14.5998 0.723686 15.3332 1.45717L20.3782 6.5021C21.1117 7.23559 21.1117 8.4248 20.3782 9.15828L10.2883 19.2481C9.55483 19.9816 8.36561 19.9816 7.63213 19.2481L2.5872 14.2032Z"
    ],
    topStatic: "M2.5872 14.2032C1.85371 13.4697 1.85372 12.2805 2.5872 11.547L12.6771 1.45717C13.4105 0.723685 14.5998 0.723686 15.3332 1.45717L20.3782 6.5021C21.1117 7.23559 21.1117 8.4248 20.3782 9.15828L10.2883 19.2481C9.55483 19.9816 8.36561 19.9816 7.63213 19.2481L2.5872 14.2032Z"
    
  }

  return(<svg
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <motion.mask
    width="28"
    height="28"
    id="myMask"
    >
      <rect fill="white" x="0" y="0" width="100%" height="100%"/>
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        fill="black"
        animate={{
          stroke: props.isAboutPage ? "#999" : "#FFF",
          d: props.isHovered ? pathVariants.topAnim : pathVariants.topStatic
        }}
      />

    </motion.mask>
    
    <motion.path
      fillRule="evenodd"
      clipRule="evenodd"
      // className="mix-blend-exclusion"
      mask="url(#myMask)"
      animate={{ 
        stroke: props.isAboutPage ? "#999" : "#FFF",
        
        d: props.isHovered ? pathVariants.bottomAnim : pathVariants.bottomStatic
      }}
    />
    <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        animate={{
          stroke: props.isAboutPage ? "#999" : "#FFF",
          d: props.isHovered ? pathVariants.topAnim : pathVariants.topStatic
        }}
      />
  </svg>)
};


const TicketCTA = ({ isHighlighted, isAboutPage }: Props) => {
  const [hover, setHover] = useState(false);
  return (
    <motion.a
      href="https://www.ticketmaster.ca/event/11005F2D0FDD4B2A"
      target="_blank"
      className="flex h-[46px] flex-row items-center rounded-md px-[4px] text-body-tablet backdrop-blur-lg max-md:mx-auto max-md:w-fit"
      style={{
        backgroundColor: isHighlighted ? "#FFF" : "rgba(255,255,255,.05)",
        border: isHighlighted ? "1px solid rgba(0,0,0,0)" : "1px solid #383838",
      }}
      whileHover={{
        border: isHighlighted ? "1px solid rgba(0,0,0,0)" : "1px solid #585858",
      }}
      animate={{
        color: isHighlighted ? "#000" : isAboutPage ? "#999" : "#FFF",
      }}
      onHoverStart={e => {setHover(true)}}
      onHoverEnd={e => {setHover(false)}}
    >
      <div
        className="pl-[7px] pr-[6px]"
        style={{
          filter: isHighlighted ? "" : "mix-blend-exclusion",
        }}
      >
        <TicketIcon isAboutPage={isAboutPage} isHovered={hover}/>
      </div>

      <div
        className="h-[28px]"
        style={{
          borderLeft: isHighlighted ? "1px solid #333" : "1px solid #555555",
        }}
      />
      <div className="flex h-[28px] flex-col items-start whitespace-nowrap pl-[9px] pr-[9px] mix-blend-exclusion">
        <div className="mt-[-1px] text-nav uppercase leading-none">
          Get Tickets
        </div>
        <div
          className="mt-[3px] flex flex-col text-nav-s leading-none tracking-wide"
          style={{
            opacity: isHighlighted ? 1 : 0.7,
          }}
        >
          Ticketmaster
        </div>
      </div>
    </motion.a>
  );
};

export default TicketCTA;
