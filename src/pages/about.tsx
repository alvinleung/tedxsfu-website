import DirectorTeamDisplay from "@/component/DirectorTeamDisplay/DirectorTeamDisplay";
import PastActivitiesGallery from "@/component/layouts/PastActivitiesGallery";
import Sticky from "@/component/ScrollContainer/Sticky";
import StickyContainer from "@/component/ScrollContainer/StickyContainer";
import { TeamView, TeamMember } from "@/component/layouts/TeamView";
import { teams } from "@/data/teamData";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import MainGrid from "@/component/layouts/MainGrid";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";

type Props = {};

type SectionLayoutProps = { children: React.ReactNode; padding?: boolean };

const SectionLayout = ({ children, padding }: SectionLayoutProps) => (
  <section className={`px-4 py-4`}>
    <StickyContainer>
      <MainGrid className={`${padding ? "mt-24 md:mt-64" : ""}`}>
        {children}
      </MainGrid>
      {/* <div className="block h-64"></div> */}
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
      className={`${shouldStick ? "sticky" : ""} top-4 min-h-[50%] ${
        left
          ? "col-start-1 col-span-full md:col-start-2 md:col-span-2 2xl:col-start-3 2xl:col-span-2"
          : "col-start-1 col-span-full md:col-start-5 md:col-span-2 2xl:col-start-6 2xl:col-span-2 h-fit z-10"
      }`}
    >
      {shouldStick && <Sticky top={16}>{children}</Sticky>}
      {!shouldStick && children}
    </motion.div>
  );
};

const SectionInfoHeader = (props: any) => (
  <h3 className="text-lead mb-2">{props.children}</h3>
);
const SectionInfoDescription = (props: any) => (
  <h3 className="text-lead opacity-50">{props.children}</h3>
);

const About = (props: Props) => {
  return (
    <>
      <main className="bg-white text-black font-normal min-h-screen w-full">
        <SectionLayout>
          <motion.div className="text-header h-64 col-start-3 col-span-4">
            13 years in the making
          </motion.div>
          <Image
            className="col-span-full w-full"
            src="/about/cover.jpg"
            width={1920}
            height={1080}
            alt="Picture of the author"
          />
        </SectionLayout>

        <SectionLayout>
          <SectionInfo sticky>
            <SectionInfoHeader>
              It&apos;s about &ldquo;ideas worth spreading&rdquo;
            </SectionInfoHeader>
            <SectionInfoDescription>
              TED stands for Technology, Entertainment and Design, known
              worldwide for their TED and TEDx Talks we watch online.
            </SectionInfoDescription>
            <SectionInfoDescription>
              The X in TEDx stands for an independent organization, marking
              TEDxSFU as an initiative driven by passionate people from SFU.
            </SectionInfoDescription>
          </SectionInfo>

          <div className="min-h-screen">
            {/* some media content goes on here */}
          </div>
        </SectionLayout>

        <SectionLayout padding>
          <SectionInfo sticky>
            <SectionInfoHeader>
              Student team, industry experience
            </SectionInfoHeader>
            <SectionInfoDescription>
              Punching above our weight, we research, analyze, and explore what
              it takes to produce a professional and impactful conference.
            </SectionInfoDescription>
          </SectionInfo>
          <div className="col-start-1 col-span-full mt-16 mb-32">
            <DirectorTeamDisplay />
          </div>
        </SectionLayout>
        <SectionLayout>
          <h3 className="col-start-1 col-span-4 md:col-start-3 xl:col-start-2 md:col-span-2 text-lead mb-24">
            And our larger, proud and hungry team of 21
          </h3>
          <div className="col-start-1 md:col-start-2 xl:col-start-2 col-span-4 grid md:grid-cols-2 gap-4">
            {teams.map((team, i) => (
              <TeamView name={team.name} key={i}>
                {team.members.map((member, i) => (
                  <TeamMember
                    name={member.name}
                    position={member.position}
                    linkedin={member.linkedin}
                    key={i}
                  />
                ))}
              </TeamView>
            ))}
          </div>
        </SectionLayout>
        <SectionLayout padding>
          <SectionInfo left>
            <SectionInfoHeader>
              Stuff we&apos;ve done this year
            </SectionInfoHeader>
            <SectionInfoDescription>
              We&apos;re opening up new personal and professional connections,
              one step at a time.
            </SectionInfoDescription>
          </SectionInfo>
          <div className="col-start-1 col-span-full mt-32 mb-32">
            <PastActivitiesGallery />
          </div>
        </SectionLayout>
      </main>
    </>
  );
};

export default About;
