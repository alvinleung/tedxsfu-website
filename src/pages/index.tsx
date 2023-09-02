import Image from "next/image";
import Logo from "@/EmergeTextEffect/Logo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Nav from "@/component/Nav/Nav";
import Head from "next/head";
import { motion } from "framer-motion";
import { AnimationConfig } from "@/component/AnimationConfig";
import Footer from "@/component/Footer/Footer";
import StickyContainer from "@/component/ScrollContainer/StickyContainer";
import MainGrid from "@/component/layouts/MainGrid";
import { LandingHero } from "@/component/LandingHero";

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
  // console.log(scrollY);
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
      <div className="max-w-screen relative h-[100dvh] bg-black">
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
          className="
        col-span-4 col-start-1
        my-32 text-lead-mobile sm:col-span-2 sm:col-start-3 sm:my-48 md:col-start-4 md:my-64 lg:col-start-5 lg:text-lead xl:col-start-4 2xl:col-start-6"
        >
          <h2>A notice for Remembrance Day</h2>
          <p className="opacity-50">
            As our event will be held on November 11, we will be dedicating 20
            minutes of our program commemorating Canadian veterans&#8212;past
            and present.
          </p>
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
