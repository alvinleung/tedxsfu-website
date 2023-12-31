import DirectorTeamDisplay from "@/component/DirectorTeamDisplay/DirectorTeamDisplay";
import PastActivitiesGallery from "@/component/layouts/PastActivitiesGallery";
import Sticky from "@/component/ScrollContainer/Sticky";
import StickyContainer from "@/component/ScrollContainer/StickyContainer";
import { TeamView, TeamMember } from "@/component/layouts/TeamView";
import { teams } from "@/data/teamData";
import { motion, usePresence } from "framer-motion";
import React from "react";
import MainGrid from "@/component/layouts/MainGrid";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";
import ScrollVideo from "@/component/ScrollVideo/ScrollVideo";
import StickyGallery from "@/component/StickyGallery/StickyGallery";
import Head from "next/head";
import Footer from "@/component/Footer/Footer";
import ActivityGallery from "@/component/ActivityGallery/ActivityGallery";
import { AnimationConfig } from "@/component/AnimationConfig";
import {
  SectionInfo,
  SectionInfoDescription,
  SectionInfoHeader,
  SectionLayout,
} from "@/component/layouts/SectionLayouts";
import ActivityGallerySection from "@/component/ActivityGallerySection";

type Props = {};

const About = (props: Props) => {
  return (
    <>
      <Head>
        <title>
          About TEDxSFU | Canada&apos;s largest TEDx event | Vancouver, BC
        </title>
        <meta
          name="description"
          content="Every year, TEDxSFU conferences provide a platform for industry professionals, advocates, educators, and storytellers to showcase their ideas worth spreading. TEDxSFU continues to engage over 2,500 members in the Metro Vancouver area annually through community members conferences, dialogue sessions, and after-party events. We're excited to gather a community of supporters who share similar desires to build community and spaces for storytelling, dialogue, and exploration of today's most intriguing and pressing topics."
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta
          property="og:title"
          content="About TEDxSFU | Canada's largest TEDx event | Vancouver, BC"
          key="ogtitle"
        />
        <meta
          property="og:description"
          content="Every year, TEDxSFU conferences provide a platform for industry professionals, advocates, educators, and storytellers to showcase their ideas worth spreading. TEDxSFU continues to engage over 2,500 members in the Metro Vancouver area annually through community members conferences, dialogue sessions, and after-party events. We're excited to gather a community of supporters who share similar desires to build community and spaces for storytelling, dialogue, and exploration of today's most intriguing and pressing topics."
          key="ogdesc"
        />
        <meta property="og:image" content="/opengraph-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://tedxsfu.com/opengraph-image.png"
        />
        <meta
          name="twitter:title"
          content="About TEDxSFU | Canada's largest TEDx event | Vancouver, BC"
        />
        <meta
          name="twitter:description"
          content="Every year, TEDxSFU conferences provide a platform for industry professionals, advocates, educators, and storytellers to showcase their ideas worth spreading. TEDxSFU continues to engage over 2,500 members in the Metro Vancouver area annually through community members conferences, dialogue sessions, and after-party events. We're excited to gather a community of supporters who share similar desires to build community and spaces for storytelling, dialogue, and exploration of today's most intriguing and pressing topics."
        />
        <meta name="twitter:image" content="/opengraph-image.png" />
      </Head>
      <div className="min-h-screen w-full bg-white font-normal text-black">
        <SectionLayout fullScreen>
          <motion.div
            className="absolute left-0 right-0 top-[24vh] z-20 flex w-full flex-col items-end justify-start p-4 text-6xl font-light text-white"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: {
                duration: AnimationConfig.SLOW,
              },
            }}
          >
            13 years in the making
          </motion.div>
          <StickyGallery />
        </SectionLayout>

        <SectionLayout>
          <SectionInfo sticky stickyOnMobile>
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

          <div className="col-span-full col-start-1">
            {/* some media content goes on here */}
            <ScrollVideo
              src={{
                webm: "./about/about-intro-video.webm",
                mp4: "./about/about-intro-video.mp4",
                webmVp9: "./about/about-intro-video-vp9.webm",
              }}
            />
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
          <div className="col-span-full col-start-1 mb-32 mt-16">
            <DirectorTeamDisplay />
          </div>
        </SectionLayout>
        <SectionLayout>
          <h3 className="col-span-3 col-start-1 mb-24 text-lead md:col-span-2 md:col-start-2 xl:col-span-4 xl:col-start-4 2xl:col-start-4">
            And our larger, proud and hungry team of 21
          </h3>
          <div className="col-span-4 col-start-1 grid gap-4 md:col-start-2 md:grid-cols-2 xl:col-span-4 xl:col-start-4 2xl:col-start-4">
            {teams.map((team, i) => (
              <TeamView name={team.name} key={i}>
                {team.members.map((member, i) => (
                  <React.Fragment key={i}>
                    <TeamMember
                      name={member.name}
                      position={member.position}
                      linkedin={member.linkedin}
                      image={member.image}
                      // key={i}
                    />
                  </React.Fragment>
                ))}
              </TeamView>
            ))}
          </div>
        </SectionLayout>
        {/* <SectionLayout padding>
          <SectionInfo>
            <SectionInfoHeader>
              Stuff we&apos;ve done this year
            </SectionInfoHeader>
            <SectionInfoDescription>
              We&apos;re opening up new personal and professional connections,
              one step at a time.
            </SectionInfoDescription>
          </SectionInfo>
          <div className="col-span-full col-start-1 mb-32 mt-32">
            <PastActivitiesGallery />
          </div>
        </SectionLayout> */}

        <ActivityGallerySection />

        <Footer
          pageNumber="1"
          targetPageHref={"/"}
          bgSrc={"./website-transition-graphic.webm"}
          mode="light"
          targetPageName={"Event Info"}
          bgType={"video"}
          showEmailCTA
        />
      </div>
    </>
  );
};

export default About;
