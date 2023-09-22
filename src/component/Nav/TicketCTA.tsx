import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import { useEventListener } from "usehooks-ts";

type Props = {
  isHighlighted: boolean;
  isAboutPage: boolean;
};

type Props2 = {
  isAboutPage: boolean;
  isHovered: boolean;
  isPressed: boolean;
};

const TicketIcon = (props: Props2) => {
  const pathVariants = {
    bottomInit: [
      "M5.05987 11.8659C5.15027 10.8325 6.06126 10.0681 7.09462 10.1585L21.3095 11.4021C22.3429 11.4925 23.1073 12.4035 23.0169 13.4369L22.3951 20.5444C22.3047 21.5777 21.3937 22.3421 20.3603 22.2517L6.1454 21.0081C5.11205 20.9177 4.34764 20.0067 4.43804 18.9733L5.05987 11.8659Z",
    ],
    bottomOpen: [
      "M8.94504 14.4266C9.21351 13.4247 10.2434 12.8301 11.2454 13.0985L25.0284 16.7917C26.0303 17.0601 26.6249 18.09 26.3565 19.092L24.5099 25.9835C24.2414 26.9855 23.2115 27.5801 22.2096 27.3116L8.42655 23.6184C7.4246 23.35 6.82999 22.3201 7.09846 21.3181L8.94504 14.4266Z",
      "M10.951 13.2448C11.4696 12.3465 12.6183 12.0387 13.5167 12.5573L25.8742 19.692C26.7725 20.2106 27.0803 21.3593 26.5616 22.2576L22.9943 28.4364C22.4757 29.3347 21.327 29.6425 20.4286 29.1239L8.07114 21.9892C7.17281 21.4706 6.86502 20.3219 7.38367 19.4236L10.951 13.2448Z",
      "M9.82497 13.8998C10.2303 12.9449 11.3329 12.4994 12.2877 12.9047L25.4226 18.4802C26.3775 18.8855 26.823 19.9881 26.4176 20.9429L23.6299 27.5104C23.2246 28.4652 22.122 28.9107 21.1672 28.5054L8.03228 22.93C7.07744 22.5247 6.63195 21.4221 7.03726 20.4672L9.82497 13.8998Z",
    ],
    bottomClose: [
      "M9.82497 13.8998C10.2303 12.9449 11.3329 12.4994 12.2877 12.9047L25.4226 18.4802C26.3775 18.8855 26.823 19.9881 26.4176 20.9429L23.6299 27.5104C23.2246 28.4652 22.122 28.9107 21.1672 28.5054L8.03228 22.93C7.07744 22.5247 6.63195 21.4221 7.03726 20.4672L9.82497 13.8998Z",
      // "M4.5 12.3782C4.5 11.3409 5.3409 10.5 6.3782 10.5H20.6474C21.6847 10.5 22.5256 11.3409 22.5256 12.3782V19.5128C22.5256 20.5501 21.6847 21.391 20.6474 21.391H6.3782C5.3409 21.391 4.5 20.5501 4.5 19.5128V12.3782Z",
      "M8.47103 15.127C8.65115 14.1054 9.6253 13.4233 10.6468 13.6035L24.6993 16.0813C25.7208 16.2614 26.4029 17.2356 26.2228 18.2571L24.9839 25.2833C24.8038 26.3049 23.8296 26.987 22.8081 26.8069L8.75564 24.329C7.73409 24.1489 7.05199 23.1748 7.23212 22.1532L8.47103 15.127Z",
      "M8.94504 14.4266C9.21351 13.4247 10.2434 12.8301 11.2454 13.0985L25.0284 16.7917C26.0303 17.0601 26.6249 18.09 26.3565 19.092L24.5099 25.9835C24.2414 26.9855 23.2115 27.5801 22.2096 27.3116L8.42655 23.6184C7.4246 23.35 6.82999 22.3201 7.09846 21.3181L8.94504 14.4266Z",
    ],
    topOpen: [
      "M4.5872 16.2033C3.85371 15.4699 3.85372 14.2806 4.5872 13.5472L14.6771 3.45729C15.4105 2.72381 16.5998 2.72381 17.3332 3.45729L22.3782 8.50222C23.1117 9.23571 23.1117 10.4249 22.3782 11.1584L12.2883 21.2483C11.5548 21.9818 10.3656 21.9818 9.63213 21.2483L4.5872 16.2033Z",
      "M5.94335 18.5136C5.00324 18.0752 4.5965 16.9577 5.03489 16.0176L11.0653 3.08529C11.5037 2.14517 12.6212 1.73844 13.5613 2.17682L20.0275 5.19204C20.9676 5.63042 21.3743 6.74792 20.9359 7.68803L14.9055 20.6203C14.4671 21.5605 13.3496 21.9672 12.4095 21.5288L5.94335 18.5136Z",
      "M5.3896 17.8745C4.49127 17.3558 4.18348 16.2072 4.70213 15.3088L11.8367 2.95132C12.3554 2.05299 13.5041 1.7452 14.4024 2.26385L20.5812 5.83115C21.4795 6.3498 21.7873 7.49849 21.2686 8.39683L14.134 20.7543C13.6154 21.6527 12.4667 21.9605 11.5684 21.4418L5.3896 17.8745Z",
    ],
    topClose: [
      "M5.3896 17.8745C4.49127 17.3558 4.18348 16.2072 4.70213 15.3088L11.8367 2.95132C12.3554 2.05299 13.5041 1.7452 14.4024 2.26385L20.5812 5.83115C21.4795 6.3498 21.7873 7.49849 21.2686 8.39683L14.134 20.7543C13.6154 21.6527 12.4667 21.9605 11.5684 21.4418L5.3896 17.8745Z",
      "M4.28545 15.4135C3.61868 14.6189 3.72233 13.4342 4.51695 12.7674L15.4478 3.59535C16.2424 2.92859 17.4271 3.03223 18.0939 3.82685L22.6799 9.29228C23.3467 10.0869 23.243 11.2716 22.4484 11.9384L11.5176 21.1104C10.7229 21.7772 9.53826 21.6736 8.87149 20.8789L4.28545 15.4135Z",
      "M4.5872 16.2033C3.85371 15.4699 3.85372 14.2806 4.5872 13.5472L14.6771 3.45729C15.4105 2.72381 16.5998 2.72381 17.3332 3.45729L22.3782 8.50222C23.1117 9.23571 23.1117 10.4249 22.3782 11.1584L12.2883 21.2483C11.5548 21.9818 10.3656 21.9818 9.63213 21.2483L4.5872 16.2033Z",
    ],
    bottomPress: [
      "M9.82497 13.8998C10.2303 12.9449 11.3329 12.4994 12.2877 12.9047L25.4226 18.4802C26.3775 18.8855 26.823 19.9881 26.4176 20.9429L23.6299 27.5104C23.2246 28.4652 22.122 28.9107 21.1672 28.5054L8.03228 22.93C7.07744 22.5247 6.63195 21.4221 7.03726 20.4672L9.82497 13.8998Z",
      "M7.60726 15.8006C7.6525 14.7642 8.52928 13.9608 9.5656 14.0061L23.8212 14.6285C24.8576 14.6737 25.661 15.5505 25.6157 16.5868L25.3045 23.7146C25.2593 24.751 24.3825 25.5544 23.3462 25.5091L9.09054 24.8867C8.05422 24.8415 7.2508 23.9647 7.29605 22.9284L7.60726 15.8006Z",
      "M8.47103 15.127C8.65115 14.1054 9.6253 13.4233 10.6468 13.6035L24.6993 16.0813C25.7208 16.2614 26.4029 17.2356 26.2228 18.2571L24.9839 25.2833C24.8038 26.3049 23.8296 26.987 22.8081 26.8069L8.75564 24.329C7.73409 24.1489 7.05199 23.1748 7.23212 22.1532L8.47103 15.127Z",
    ],
    bottomLift: [
      "M8.47103 15.127C8.65115 14.1054 9.6253 13.4233 10.6468 13.6035L24.6993 16.0813C25.7208 16.2614 26.4029 17.2356 26.2228 18.2571L24.9839 25.2833C24.8038 26.3049 23.8296 26.987 22.8081 26.8069L8.75564 24.329C7.73409 24.1489 7.05199 23.1748 7.23212 22.1532L8.47103 15.127Z",
      "M9.82497 13.8998C10.2303 12.9449 11.3329 12.4994 12.2877 12.9047L25.4226 18.4802C26.3775 18.8855 26.823 19.9881 26.4176 20.9429L23.6299 27.5104C23.2246 28.4652 22.122 28.9107 21.1672 28.5054L8.03228 22.93C7.07744 22.5247 6.63195 21.4221 7.03726 20.4672L9.82497 13.8998Z",
    ],
    topPress: [
      "M5.3896 17.8745C4.49127 17.3558 4.18348 16.2072 4.70213 15.3088L11.8367 2.95132C12.3554 2.05299 13.5041 1.7452 14.4024 2.26385L20.5812 5.83115C21.4795 6.3498 21.7873 7.49849 21.2686 8.39683L14.134 20.7543C13.6154 21.6527 12.4667 21.9605 11.5684 21.4418L5.3896 17.8745Z",
      "M3.62211 13.3223C3.10346 12.4239 3.41125 11.2753 4.30958 10.7566L16.6671 3.622C17.5654 3.10334 18.7141 3.41114 19.2328 4.30947L22.8001 10.4882C23.3187 11.3866 23.0109 12.5352 22.1126 13.0539L9.75509 20.1885C8.85676 20.7072 7.70807 20.3994 7.18942 19.501L3.62211 13.3223Z",
      "M4.28545 15.4135C3.61868 14.6189 3.72233 13.4342 4.51695 12.7674L15.4478 3.59535C16.2424 2.92859 17.4271 3.03223 18.0939 3.82685L22.6799 9.29228C23.3467 10.0869 23.243 11.2716 22.4484 11.9384L11.5176 21.1104C10.7229 21.7772 9.53826 21.6736 8.87149 20.8789L4.28545 15.4135Z",
    ],
    topLift: [
      "M4.28545 15.4135C3.61868 14.6189 3.72233 13.4342 4.51695 12.7674L15.4478 3.59535C16.2424 2.92859 17.4271 3.03223 18.0939 3.82685L22.6799 9.29228C23.3467 10.0869 23.243 11.2716 22.4484 11.9384L11.5176 21.1104C10.7229 21.7772 9.53826 21.6736 8.87149 20.8789L4.28545 15.4135Z",
      "M5.3896 17.8745C4.49127 17.3558 4.18348 16.2072 4.70213 15.3088L11.8367 2.95132C12.3554 2.05299 13.5041 1.7452 14.4024 2.26385L20.5812 5.83115C21.4795 6.3498 21.7873 7.49849 21.2686 8.39683L14.134 20.7543C13.6154 21.6527 12.4667 21.9605 11.5684 21.4418L5.3896 17.8745Z",
    ],
  };
  const [openAnim, setOpenAnim] = useState({
    top: pathVariants.topOpen,
    bottom: pathVariants.bottomOpen,
  });
  const [wasPressed, setWasPressed] = useState(false);
  useEffect(() => {
    setOpenAnim(
      props.isPressed
        ? { top: pathVariants.topLift, bottom: pathVariants.bottomLift }
        : { top: pathVariants.topOpen, bottom: pathVariants.bottomOpen },
    );
    setWasPressed(props.isPressed);
  }, [props.isPressed]);

  return (
    <svg
      // width="30"
      // height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
    >
      <motion.mask width="30" height="30" id="myMask">
        <rect fill="white" x="0" y="0" width="100%" height="100%" />
        <motion.path
          fillRule="evenodd"
          clipRule="evenodd"
          fill="black"
          initial={false}
          animate={{
            stroke: props.isAboutPage ? "#999" : "#FFF",
            d: props.isPressed
              ? pathVariants.topPress
              : props.isHovered
              ? openAnim.top
              : pathVariants.topClose,
          }}
          transition={{
            ease: AnimationConfig.EASING_INVERTED,
            duration: AnimationConfig.NORMAL,
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
          d: props.isPressed
            ? pathVariants.bottomPress
            : props.isHovered
            ? openAnim.bottom
            : pathVariants.bottomClose,
        }}
        transition={{
          ease: AnimationConfig.EASING_INVERTED,
          duration: AnimationConfig.NORMAL,
        }}
      />
      <motion.path
        fillRule="evenodd"
        clipRule="evenodd"
        animate={{
          stroke: props.isAboutPage ? "#999" : "#FFF",
          d: props.isPressed
            ? pathVariants.topPress
            : props.isHovered
            ? openAnim.top
            : pathVariants.topClose,
        }}
        transition={{
          ease: AnimationConfig.EASING_INVERTED,
          duration: AnimationConfig.NORMAL,
        }}
      />
    </svg>
  );
};

const TicketCTA = ({ isHighlighted, isAboutPage }: Props) => {
  const [hover, setHover] = useState(false);
  const [pressed, setPressed] = useState(false);

  useEventListener("pointerup", (e) => {
    setPressed(false);
  });

  return (
    <motion.a
      href="https://www.ticketmaster.ca/event/11005F2D0FDD4B2A"
      target="_blank"
      className="flex h-[46px] flex-row items-center rounded-md px-[4px] text-body-tablet backdrop-blur-lg max-md:mx-auto max-md:w-fit"
      whileHover={{
        border: isHighlighted
          ? "1px solid rgba(255,255,255,1)"
          : "1px solid rgba(88, 88, 88,1)",
      }}
      animate={{
        color: isHighlighted ? "#000" : isAboutPage ? "#999" : "#FFF",
        border: isHighlighted ? "1px solid rgba(0,0,0,0)" : "1px solid #383838",
        backgroundColor: isHighlighted
          ? "rgba(255,255,255,1)"
          : "rgba(255,255,255,.05)",
      }}
      whileTap={{
        scale: 0.98,
      }}
      onHoverStart={(e) => {
        setHover(true);
      }}
      onHoverEnd={(e) => {
        setHover(false);
      }}
      onPointerDown={(e) => {
        setPressed(true);
      }}
      transition={{
        duration: AnimationConfig.FAST,
        ease: "linear",
      }}
      // onMouseUp={e => {setPressed(false)}}
    >
      <div
        className="pl-[7px] pr-[6px]"
        style={{
          filter: isHighlighted ? "invert(1)" : "none",
        }}
      >
        <TicketIcon
          isAboutPage={isAboutPage}
          isHovered={hover}
          isPressed={pressed}
        />
      </div>

      <motion.div
        className="h-[28px]"
        animate={{
          borderLeft: isHighlighted ? "1px solid #333" : "1px solid #555555",
        }}
      />
      <div
        className={`flex h-[28px] flex-col items-start whitespace-nowrap pl-[9px] pr-[9px] ${
          isHighlighted ? "" : "mix-blend-exclusion"
        }`}
      >
        <div className="pointer-events-none mt-[-1px] text-nav uppercase leading-none">
          Get Tickets
        </div>
        <motion.div
          className="pointer-events-none mt-[3px] flex flex-col text-nav-s leading-none tracking-wide"
          style={{
            opacity: isHighlighted ? 1 : 0.7,
          }}
        >
          $5 off presale
        </motion.div>
      </div>
    </motion.a>
  );
};

export default TicketCTA;
