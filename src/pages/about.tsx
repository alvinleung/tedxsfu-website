import DirectorTeamDisplay from "@/component/DirectorTeamDisplay";
import Nav from "@/component/Nav";
import PastActivitiesGallery from "@/component/PastActivitiesGallery";
import { TeamView, TeamMember } from "@/component/TeamView";
import { teams } from "@/data/teamData";
import Image from "next/image";
import React from "react";

type Props = {};

type SectionLayoutProps = { children: React.ReactNode; padding?: boolean };

const SectionLayout = ({ children, padding }: SectionLayoutProps) => (
  <section
    className={`px-4 py-4 grid grid-cols-8 gap-4 ${padding ? "mt-64" : ""}`}
  >
    {children}
    {/* <div className="block h-64"></div> */}
  </section>
);

type SectionCopyProps = {
  children: React.ReactNode;
  sticky?: boolean;
  left?: boolean;
};

const SectionInfo = ({ children, sticky, left }: SectionCopyProps) => {
  return (
    <div
      className={`${sticky ? "sticky" : ""} top-4 min-h-[50%] ${
        left ? "col-start-3 col-span-2" : "col-start-6 col-span-2 h-fit z-10"
      }`}
    >
      {children}
    </div>
  );
};

const About = (props: Props) => {
  return (
    <>
      <Nav />
      <main className="bg-white text-black font-normal min-h-screen w-full">
        <SectionLayout>
          <div className="text-header h-64 col-start-3 col-span-4">
            13 years in the making
          </div>
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
            <h3 className="text-lead mb-2">It’s about ideas worth spreading</h3>
            <p className="text-lead opacity-50">
              TED stands for Technology, Entertainment and Design, known
              worldwide for their TED and TEDx Talks we watch online.
            </p>
            <p className="text-lead opacity-50">
              The X in TEDx stands for an independent organization, marking
              TEDxSFU as an initiative driven by passionate people from SFU.
            </p>
          </SectionInfo>

          <div className="min-h-screen">
            {/* some media content goes on here */}
          </div>
        </SectionLayout>

        <SectionLayout padding>
          <SectionInfo sticky>
            <h3 className="text-lead mb-2">
              Student team, industry experience
            </h3>
            <p className="text-lead opacity-50">
              Punching above our weight, we research, analyze, and explore what
              it takes to produce a professional and impactful conference.
            </p>
          </SectionInfo>
          <div className="col-start-1 col-end-9 mt-32 mb-32">
            <DirectorTeamDisplay />
          </div>
          <h3 className="col-start-2 col-span-2 text-lead mb-24">
            And our larger, proud and hungry team of 21
          </h3>
          <div className="col-start-2 col-span-4 grid grid-cols-2 gap-4">
            {teams.map((team) => (
              <TeamView name={team.name}>
                {team.members.map((member) => (
                  <TeamMember name={member.name} position={member.position} />
                ))}
              </TeamView>
            ))}
          </div>
        </SectionLayout>
        <SectionLayout padding>
          <SectionInfo left>
            <h3 className="text-lead mb-2">Stuff we've done this year</h3>
            <p className="text-lead opacity-50">
              We’re opening up new personal and professional connections, one
              step at a time.
            </p>
          </SectionInfo>
          <div className="col-start-1 col-end-9 mt-32 mb-32">
            <PastActivitiesGallery />
          </div>
        </SectionLayout>
      </main>
    </>
  );
};

export default About;
