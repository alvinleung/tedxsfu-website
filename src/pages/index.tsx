import Image from "next/image";

import { useWindowDimension } from "@/hooks/useWindowDimension";
import Nav from "@/component/Nav/NavOld";
import Head from "next/head";
import { motion } from "framer-motion";
import { AnimationConfig } from "@/component/AnimationConfig";
import Footer from "@/component/Footer/Footer";
import StickyContainer from "@/component/ScrollContainer/StickyContainer";
import MainGrid from "@/component/layouts/MainGrid";
import { LandingHero } from "@/component/LandingHero";
import { useContainerScroll } from "@/component/ScrollContainer/ScrollContainer";
import { useEffect } from "react";
import EmailForm from "@/component/Footer/EmailForm";
import { EventInfoModuleCond } from "@/component/Nav/EventInfoModule";
import {
  SectionInfo,
  SectionInfoDescription,
  SectionInfoHeader,
  SectionLayout,
} from "@/component/layouts/SectionLayouts";
import SpeakerSection from "@/component/SpeakerSection/SpeakerSection";
import FigureLayout from "@/component/layouts/FigureLayout";

export default function Home() {
  return (
    <>
      <Head>
        <title>TEDxSFU</title>
        <meta
          name="description"
          content="Every year, TEDxSFU conferences provide a platform for industry professionals, advocates, educators, and storytellers to showcase their ideas worth spreading. TEDxSFU continues to engage over 2,500 members in the Metro Vancouver area annually through community members conferences, dialogue sessions, and after-party events. We're excited to gather a community of supporters who share similar desires to build community and spaces for storytelling, dialogue, and exploration of today's most intriguing and pressing topics."
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta property="og:title" content="TEDxSFU" key="ogtitle" />
        <meta
          property="og:description"
          content="Every year, TEDxSFU conferences provide a platform for industry professionals, advocates, educators, and storytellers to showcase their ideas worth spreading. TEDxSFU continues to engage over 2,500 members in the Metro Vancouver area annually through community members conferences, dialogue sessions, and after-party events. We're excited to gather a community of supporters who share similar desires to build community and spaces for storytelling, dialogue, and exploration of today's most intriguing and pressing topics."
          key="ogdesc"
        />
        <meta property="og:image" content="<generated>" />
        <meta property="og:image:type" content="<generated>" />
        <meta property="og:image:width" content="<generated>" />
        <meta property="og:image:height" content="<generated>" />
      </Head>
      <div className="max-w-screen relative bg-black">
        <LandingHero />
      </div>

      <SectionLayout fullScreen>
        <SpeakerSection />
      </SectionLayout>

      <SectionLayout padding>
        <SectionInfo>
          <SectionInfoHeader>
            1,800 seats in Downtown Vancouver
          </SectionInfoHeader>
          <SectionInfoDescription>
            Designed by the archtect of Library Square, Moshe Safdie, bask in a
            grand theatre with history rooted in creativity, storytelling and
            discussion.
          </SectionInfoDescription>
        </SectionInfo>
        <FigureLayout
          width={1920}
          height={1200}
          caption={{
            header: "The Centre for Performing Arts",
            description:
              "Designed by the archtect of Library Square, Moshe Safdie, bask in a grand theatre with history rooted in creativity, storytelling and discussion.",
          }}
        >
          <Image
            src="/venue/venue.jpg"
            width={1920}
            height={1200}
            alt="Image of the centre for performing arts"
          />
        </FigureLayout>
      </SectionLayout>

      <SectionLayout padding>
        <SectionInfo>
          <SectionInfoHeader>
            1,800 seats in Downtown Vancouver
          </SectionInfoHeader>
          <SectionInfoDescription>
            Designed by the archtect of Library Square, Moshe Safdie, bask in a
            grand theatre with history rooted in creativity, storytelling and
            discussion.
          </SectionInfoDescription>
        </SectionInfo>
      </SectionLayout>

      <Footer
        pageNumber="2"
        targetPageHref={"/about"}
        bgSrc={"/about/about-2.jpg"}
        targetPageName={"Our Story"}
        bgType={"image"}
      />
    </>
  );
}
