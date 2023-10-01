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
        <meta property="og:image" content="/opengraph-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:domain"
          content="https://tedxsfu.com/opengraph-image.png"
        />
        <meta
          property="twitter:url"
          content="https://tedxsfu.com/opengraph-image.png"
        />
        <meta name="twitter:title" content="TEDxSFU" />
        <meta
          name="twitter:description"
          content="Every year, TEDxSFU conferences provide a platform for industry professionals, advocates, educators, and storytellers to showcase their ideas worth spreading. TEDxSFU continues to engage over 2,500 members in the Metro Vancouver area annually through community members conferences, dialogue sessions, and after-party events. We're excited to gather a community of supporters who share similar desires to build community and spaces for storytelling, dialogue, and exploration of today's most intriguing and pressing topics."
        />
        <meta name="twitter:image" content="/opengraph-image.png" />
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
            {/* Frame it as the experience highlight rather than just venue */}A
            day of discovery with 1,800 others
          </SectionInfoHeader>
          <SectionInfoDescription>
            With conversation spaces in the lobby or a brisk walk into Library
            Square, connect with curious personalities&mdash;all in the heart of
            Downtown Vancouver.
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

      {/* <SectionLayout padding>
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
      </SectionLayout> */}

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
