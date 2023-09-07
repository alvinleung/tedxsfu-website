import Image from "next/image";
import Logo from "../EmergeTextEffect/Logo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Nav from "@/component/Nav/Nav";
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
import { EventInfoModuleCond }  from "@/component/Nav/EventInfoModule";

export default function Home() {
  type SectionLayoutProps = {
    children: React.ReactNode;
    padding?: boolean;
    hero?: boolean;
  };

  const SectionLayout = ({ children, padding, hero }: SectionLayoutProps) => {
    //TODO: Implement lazy loading states for the page content for optimisation
    return (
      <section className={`px-4 pb-8`}>
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
        {/* <section className="absolute bottom-0 left-0 right-0 flex flex-row bg-gradient-to-t from-black to-transparent p-4">
          <a href="https://forms.gle/YbXZKmgtL8DaFUAC6" target="_blank">
            Join our newsletter
          </a>
          <div className="ml-auto flex flex-row gap-4">
            <a href="https://linkedin.com/company/tedxsfu" target="_blank">
              <Image
                alt="LinkedIn"
                width="24"
                height="24"
                src="./img/mdi_linkedin.svg"
              ></Image>
            </a>
            <a href="https://twitter.com/tedxsfu" target="_blank">
              <Image
                alt="Twitter"
                width="24"
                height="24"
                src="./img/mdi_twitter.svg"
              ></Image>
            </a>
            <a href="https://instagram.com/tedxsfu" target="_blank">
              <Image
                alt="Instagram"
                width="24"
                height="24"
                src="./img/mdi_instagram.svg"
              ></Image>
            </a>
          </div>
        </section> */}
      </div>

      <SectionLayout>
        <div
          className="my-16 col-span-full lg:col-span-4 lg:col-start-2 2xl:col-start-3 grid grid-cols-4 gap-x-4 gap-y-8"
        >
          
          <div className="col-span-full sm:col-span-2 grid grid-cols-2 gap-x-4">
            <EventInfoModuleCond className="col-span-full mb-8"/>
            <hr className="col-span-full opacity-50 my-2"/>
            <h2 className="uppercase opacity-50 text-micro-mobile md:text-micro">Note for 11/11</h2>
            <p className="opacity-50 text-micro-mobile md:text-micro">
              In honour of Remembrance Day, 20 minutes of our program will be dedicated to Canadian veterans.
            </p>
          </div>
          <div className="col-span-full sm:col-span-2">
            <h2 className="text-body mb-4">Be the first in line for tickets: subscribe for $5 off and bite-sized event details</h2>
            <hr className="col-span-full opacity-50 my-2"/>
            <EmailForm isDarkMode={true}/>
          </div>
        </div>
      </SectionLayout>
      <SectionLayout>
        <div className="
        text-lead-mobile lg:text-lead
        my-16 sm:my-24 md:my-32 lg:my-48 col-span-4 col-start-1 sm:col-span-2 sm:col-start-2 md:col-start-2 lg:col-start-2 xl:col-start-2 2xl:col-start-3">
        <h2
        >More magic, coming soon</h2>
        <p className="opacity-50"
        >There's more to come in the near future. Be sure to stay in touch for future ticketing and more event details.</p>
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
