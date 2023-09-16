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

export default function Home() {
  type SectionLayoutProps = {
    children: React.ReactNode;
    padding?: boolean;
    hero?: boolean;
  };

  const SectionLayout = ({ children, padding, hero }: SectionLayoutProps) => {
    //TODO: Implement lazy loading states for the page content for optimisation
    return (
      <section className={`px-grid-margin-x pb-8`}>
        <StickyContainer>
          <MainGrid className={`${padding ? "mt-24 md:mt-64" : ""}`}>
            {children}
          </MainGrid>
        </StickyContainer>
      </section>
    );
  };
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
      </Head>
      <div className="max-w-screen relative bg-black">
        <LandingHero />
      </div>

      <SectionLayout>
        <div
          className="
        col-span-4 col-start-1
        h-[100dvh] flex flex-col justify-center
        mt-24
        mb-16 text-lead-mobile sm:col-span-2 sm:col-start-2 sm:mb-24 md:col-start-2 md:mb-32 lg:col-start-2 lg:mb-48 lg:text-lead xl:col-start-2 2xl:col-start-3"
        >
          <h2>More magic, coming soon</h2>
          <p className="opacity-50">
            We&apos;ll soon be announcing our all star speaker cast, flying in from Vancouver, San Francisco, Toronto—unmask the world of Olympians, pioneers in tech, and thought leaders along the West Coast.
          </p>
          <hr className="col-span-full my-2 opacity-50" />
              <motion.div className="col-span-full grid grid-cols-2 gap-4">
                <h2 className="text-micro-mobile uppercase opacity-50 md:text-micro">
                  Note for 11/11
                </h2>
                <p className="text-micro-mobile opacity-50 md:text-micro">
                  In partnership with Honour House, 20 minutes of our program will be dedicated to Remembrance Day.
                </p>
              </motion.div>
        </div>
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
