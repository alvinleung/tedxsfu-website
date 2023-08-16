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
