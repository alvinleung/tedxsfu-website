import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import StickyContainer from "../ScrollContainer/StickyContainer";
import MainGrid from "./MainGrid";
import { motion } from "framer-motion";
import Sticky from "../ScrollContainer/Sticky";

type SectionLayoutProps = {
  children: React.ReactNode;
  padding?: boolean;
  fullScreen?: boolean;
};

export const SectionLayout = ({
  children,
  padding,
  fullScreen,
}: SectionLayoutProps) => {
  //TODO: Implement lazy loading states for the page content for optimisation
  return (
    <section className={`${fullScreen ? "" : "px-4"} pb-8`}>
      <StickyContainer>
        {!fullScreen && (
          <MainGrid className={`${padding ? "mt-24 md:mt-64" : ""}`}>
            {children}
          </MainGrid>
        )}
        {fullScreen && children}
      </StickyContainer>
    </section>
  );
};

type SectionCopyProps = {
  children: React.ReactNode;
  sticky?: boolean;
  stickyOnMobile?: boolean;
  left?: boolean;
};

export const SectionInfo = ({
  children,
  sticky,
  stickyOnMobile,
  left,
}: SectionCopyProps) => {
  // const shouldStick = useBreakpoint(breakpoints.lg) && sticky;
  const isDesktop = useBreakpoint(breakpoints.lg);
  const shouldStick = isDesktop || stickyOnMobile;

  return (
    <motion.div
      className={`${
        left
          ? "col-span-full col-start-1 h-fit md:top-20 md:col-span-2 md:col-start-1 lg:top-4 lg:col-span-2 lg:col-start-2 2xl:col-span-2 2xl:col-start-3"
          : "z-10 col-span-full col-start-1 h-fit md:top-20 md:col-span-2 md:col-start-1 lg:top-4 lg:col-span-2 lg:col-start-2 2xl:col-span-2 2xl:col-start-2"
      } ${shouldStick ? "sticky top-4" : ""} ${
        stickyOnMobile ? "top-[64px]" : ""
      }`}
    >
      {shouldStick && (
        <Sticky top={!isDesktop && stickyOnMobile ? 64 : 16} fadeOut>
          {children}
        </Sticky>
      )}
      {!shouldStick && children}
    </motion.div>
  );
};

export const SectionInfoHeader = (props: any) => (
  <h3 className="mb-1 text-lead-mobile sm:text-lead-tablet lg:text-lead">
    {props.children}
  </h3>
);
export const SectionInfoDescription = (props: any) => (
  <h3 className="text-lead-mobile opacity-50 sm:text-lead-tablet lg:text-lead">
    {props.children}
  </h3>
);
