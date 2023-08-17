import DirectorTeamDisplay from "@/component/DirectorTeamDisplay/DirectorTeamDisplay";
import PastActivitiesGallery from "@/component/layouts/PastActivitiesGallery";
import Sticky from "@/component/ScrollContainer/Sticky";
import StickyContainer from "@/component/ScrollContainer/StickyContainer";
import { TeamView, TeamMember } from "@/component/layouts/TeamView";
import { teams } from "@/data/teamData";
import { motion } from "framer-motion";
import React from "react";
import MainGrid from "@/component/layouts/MainGrid";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import ScrollVideo from "@/component/ScrollVideo/ScrollVideo";
import StickyGallery from "@/component/StickyGallery/StickyGallery";
import { AnimationConfig } from "@/component/AnimationConfig";
import Head from "next/head";

type Props = {};

type SectionLayoutProps = { children: React.ReactNode; padding?: boolean };

const SectionLayout = ({ children, padding }: SectionLayoutProps) => (
  <section className={`px-4 pb-8`}>
    <StickyContainer>
      <MainGrid className={`${padding ? "mt-24 md:mt-64" : ""}`}>
        {children}
      </MainGrid>
    </StickyContainer>
  </section>
);

type SectionCopyProps = {
  children: React.ReactNode;
  sticky?: boolean;
  left?: boolean;
};

const SectionInfo = ({ children, sticky, left }: SectionCopyProps) => {
  const shouldStick = useBreakpoint(breakpoints.lg) && sticky;

  return (
    <motion.div
      className={`${shouldStick ? "sticky" : ""} top-4 z-40 min-h-[50%] ${
        left
          ? "col-span-full col-start-1 lg:col-span-2 lg:col-start-2 2xl:col-span-2 2xl:col-start-3"
          : "z-10 col-span-full col-start-1 h-fit lg:col-span-2 lg:col-start-2 2xl:col-span-2 2xl:col-start-2"
      }`}
    >
      {shouldStick && (
        <Sticky top={16} fadeOut>
          {children}
        </Sticky>
      )}
      {!shouldStick && children}
    </motion.div>
  );
};

const SectionInfoHeader = (props: any) => (
  <h3 className="mb-1 text-lead">{props.children}</h3>
);
const SectionInfoDescription = (props: any) => (
  <h3 className="text-lead opacity-50">{props.children}</h3>
);

const About = (props: Props) => {
  return (
    <>
      <Head>
        <title>About TEDxSFU</title>
        <meta
          name="description"
          content="Every year, TEDxSFU conferences provide a platform for industry professionals, advocates, educators, and storytellers to showcase their ideas worth spreading. TEDxSFU continues to engage over 2,500 members in the Metro Vancouver area annually through community members conferences, dialogue sessions, and after-party events. We're excited to gather a community of supporters who share similar desires to build community and spaces for storytelling, dialogue, and exploration of today's most intriguing and pressing topics."
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <main className="min-h-screen w-full bg-white font-normal text-black h-[400vh]">
      <motion.a
              key="logo"
              href={"/"}
              className="block w-32 h-12"
              >
                <motion.svg
            className="max-w-none block w-32 h-12 max-md:px-4 md:fixed md:top-4 md:left-4 md:z-50"
            aria-label="TEDxSFU"
            key="logo"
            viewBox="0 0 876 152"
            transition={{
              duration: AnimationConfig.VERY_SLOW,
              ease: AnimationConfig.EASING_INVERTED,
            }}
          >
              <motion.path 
                d="M617.299 39.3001c-.8-8.1-4.4-14.6-10.8-19.4-6.4-4.8-14.4-7.2-24-7.2-6.8 0-12.8 1.2-17.9 3.5-5.2 2.3-9.2 5.6-12.1 9.7-2.9 4.1-4.4 
                8.8-4.4 14 0 3.9.8 7.2 2.5 10.1 1.7 2.9 3.9 5.4 6.7 7.5 2.8 2.1 6 3.8 9.4 5.3 3.4 1.5 6.9 2.7 10.5 3.7l15.4 4.4c4.7 
                1.3 9.3 2.9 14 4.9 4.7 2 8.9 4.5 12.8 7.5 3.9 3 7 6.7 9.3 11.1 2.4 4.4 3.5 9.5999 3.5 15.6999 0 7.8-2 14.8-6.1 21-4.1 6.2-9.8 
                11.2-17.4 14.8-7.6 3.6-16.6 5.5-27.2 5.5-9.9 0-18.6-1.7-25.9-5-7.3-3.3-13.1-7.9-17.3-13.7-4.2-5.8-6.5-12.6-7.1-20.3h13.8c.5 5.8 
                2.4 10.6 5.7 14.6 3.3 4 7.7 7 13 9.1 5.3 2.1 11.3 3.1 17.8 3.1 7.3 0 13.8-1.2 19.4-3.7 5.7-2.4 10.2-5.9 13.4-10.3 3.3-4.4 4.9-9.5 
                4.9-15.4 0-4.9-1.3-9.1-3.9-12.4999-2.6-3.4-6.1-6.2-10.7-8.5s-9.9-4.3-15.9-6.1l-17.5-5.1c-11.5-3.4-20.4-8.2-26.7-14.2-6.3-6-9.5-13.7-9.5-23.1 0-7.8 
                2.1-14.8 6.3-20.7 4.2-6 9.9-10.6 17.1-14 7.2-3.4 15.3-5.000002 24.3-5.000002 9.1 0 17.1 1.700002 24.1 5.000002 7 3.3 12.5 7.9 16.7 13.7 4.1 5.8 6.3 
                12.5 6.6 19.9h-12.8v.1ZM658.1 148.9V2.7002h84.5v12h-71.2v55H736v12h-64.6V148.8h-13.3v.1ZM862.5 2.70009h13.3V99.5001c0 9.8999-2.3 18.7999-7 26.5999-4.7 7.8-11.1 
                14-19.4 18.5-8.3 4.5-17.9 6.7-28.9 6.7-10.9 0-20.6-2.3-28.9-6.8-8.3-4.5-14.8-10.7-19.5-18.5-4.7-7.8-7-16.7-7-26.5999v-96.8h13.3v95.8c0 7.7999 1.7 14.6999 5.2 20.6999 
                3.5 6.1 8.4 10.8 14.7 14.3 6.3 3.5 13.7 5.2 22.2 5.2s15.9-1.7 22.2-5.2c6.3-3.5 11.2-8.2 14.7-14.3 3.4-6.1 5.2-13 5.2-20.6999l-.1-95.70001Z"/>
                <motion.path 
                fill="#EB0028" 
                d="M40.8 40.1998H0v-37.4h126.6v37.4H85.7V148.8H40.8V40.1998Zm92.7-37.4h122.9v37.4h-78v18.2h78v34.8h-78V111.4h78v37.4H133.5V2.7998Zm130.5 
                0h73.7c48.6 0 65.8 36 65.8 72.8C403.5 120.4 379.8 148.8 329 148.8h-65V2.7998ZM308.9 111.3h17.6c28 0 32.1-22.7002 32.1-36.4002 
                0-9.2-2.9-34.7-35.3-34.7H309V111.3h-.1ZM468 92.7998l-13.7-22.8-13.4 22.8H408l31.2-46-30.1-44H442l12.2 21.8 12.5-21.8h32.9l-30.1 44 31.2 46H468Z"/>
              </motion.svg>
              </motion.a>
          <SectionLayout>
          <motion.div className="absolute left-0 right-0 top-[24vh] z-20 flex w-full flex-col items-end justify-start p-4 text-6xl text-white">
            13 years in the making
          </motion.div>
          <StickyGallery />
        </SectionLayout>
      </main>
    </>
  );
};

export default About;
