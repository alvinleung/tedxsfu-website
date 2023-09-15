import React, { useEffect, useState } from "react";
import { AnimationConfig } from "../AnimationConfig";
import BackgroundPreview from "./BackgroundPreview";
import { motion } from "framer-motion";
import StaggerTransition from "./StaggerTransition";
import Copiable from "./Copiable";
import SocialModule from "./SocialModule";
import EmailForm from "../Footer/EmailForm";
import MainGrid from "../layouts/MainGrid";
import { NavButton } from "./NavButton";
import { useRouter } from "next/router";
import { useNavContext } from "./Nav";

type Props = {
  isOpened: boolean;
  hasTransitionBegan: boolean;
  onNavButtonClick: (href: string) => void;
};

const NavScreen = ({
  isOpened,
  hasTransitionBegan,
  onNavButtonClick,
}: Props) => {
  const router = useRouter();
  const [selectedPath, setSelectedPath] = useState("");
  const { exitDuration } = useNavContext();

  const handlePreviewExit = () => {
    if (hasTransitionBegan) return;
    setSelectedPath("");
  };

  useEffect(() => {
    if (hasTransitionBegan) {
      setTimeout(() => {
        setSelectedPath("");
      }, exitDuration + 500);
    }
  }, [hasTransitionBegan, exitDuration]);

  useEffect(() => {
    if (isOpened) {
      setSelectedPath("");
    }
  }, [isOpened]);

  return (
    <motion.div
      className="fixed bottom-0 top-0 z-40 w-full overflow-hidden"
      style={{
        pointerEvents: isOpened && !hasTransitionBegan ? "all" : "none",
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: isOpened ? 1 : 0,
        transition: {
          duration: AnimationConfig.NORMAL,
          ease: "linear",
          delay: isOpened ? 0 : 0.2,
        },
      }}
      exit={{
        opacity: 0,
      }}
    >
      <BackgroundPreview
        selected={selectedPath}
        hasTransitionBegan={hasTransitionBegan}
      />
      <MainGrid className="absolute left-0 right-0 top-0 h-[100dvh] overflow-auto px-grid-margin-x max-md:right-0">
        <div
          className={`col-span-full flex flex-col pt-[18vh] md:col-span-3 md:col-start-2 2xl:col-start-2`}
        >
          <StaggerTransition
            staggerIndex={1}
            isActive={isOpened && !hasTransitionBegan}
          >
            <NavButton
              onClick={onNavButtonClick}
              onEnterPreview={() => {
                !hasTransitionBegan && setSelectedPath("/");
              }}
              onExitPreview={handlePreviewExit}
              href={"/"}
              isHighlighted={
                selectedPath === "/" ||
                (router.pathname === "/" && selectedPath === "")
              }
              index={"1"}
              title={"Event Info"}
              description={"TEDxSFU 2023 at a glance"}
            />
          </StaggerTransition>

          <StaggerTransition
            staggerIndex={2}
            isActive={isOpened && !hasTransitionBegan}
          >
            <NavButton
              onClick={onNavButtonClick}
              onEnterPreview={() => {
                !hasTransitionBegan && setSelectedPath("/about");
              }}
              onExitPreview={handlePreviewExit}
              href={"/about"}
              isHighlighted={
                selectedPath === "/about" ||
                (router.pathname === "/about" && selectedPath === "")
              }
              index={"2"}
              title={"About Us"}
              description={"13 years in the making"}
            />
          </StaggerTransition>

          <StaggerTransition
            staggerIndex={3}
            isActive={isOpened && !hasTransitionBegan}
          >
            <motion.div
              className="col-span-4 grid grid-cols-4 gap-4 pt-4 md:col-span-3 md:col-start-2 md:grid-cols-3"
              style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }}
            >
              <h2 className="leading-tight">Let&apos;s keep in touch</h2>
              <div className="col-span-3 md:col-span-2">
                <Copiable
                  desc="General inquiries &amp; ticketing"
                  email="info@tedxsfu.com"
                  isDarkMode={true}
                />
                <Copiable
                  desc="Partnership inquiries"
                  email="partner@tedxsfu.com"
                  isDarkMode={true}
                />
                <SocialModule />
              </div>
            </motion.div>
          </StaggerTransition>
        </div>

        <div className="col-span-full mt-auto pb-32 sm:col-span-3 sm:col-start-2 md:col-span-3 md:col-start-3 md:pb-12 lg:col-span-2 lg:col-start-3">
          <StaggerTransition
            staggerIndex={4}
            isActive={isOpened && !hasTransitionBegan}
            secondary
          >
            <div className="mb-6 mt-auto text-body ">
              Exclusive ticket discounts and content — right to your inbox.
            </div>
            <EmailForm secondary isDarkMode={true} />
          </StaggerTransition>
        </div>
      </MainGrid>
    </motion.div>
  );
};

export default NavScreen;
