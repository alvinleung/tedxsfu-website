import DirectorTeamDisplay from "@/component/DirectorTeamDisplay";
import Nav from "@/component/Nav";
import Image from "next/image";
import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <>
      <Nav />
      <main className="bg-white text-black font-normal min-h-screen w-full">
        <section className="px-4 py-4 grid grid-cols-8">
          <div className="text-header h-64 col-start-3 col-span-4">
            13 years in the making
          </div>
          <Image
            className="col-span-full"
            src="/about/cover.jpg"
            width={1920}
            height={1080}
            alt="Picture of the author"
          />
        </section>

        <section className="px-4 py-4 grid grid-cols-8 min-h-screen">
          <div className="sticky top-4 h-[50%] col-start-6 col-end-8">
            <h3 className="text-lead mb-2">It’s about ideas worth spreading</h3>
            <p className="text-lead opacity-50">
              TED stands for Technology, Entertainment and Design, known
              worldwide for their TED and TEDx Talks we watch online. The X in
              TEDx stands for an independent organization, marking TEDxSFU as an
              initiative driven by passionate people from SFU.
            </p>
          </div>
        </section>

        <section className="px-4 py-4 grid grid-cols-8">
          <div className="sticky top-4 h-fit col-start-6 col-end-8">
            <h3 className="text-lead mb-2">We punch above our weight</h3>
            <p className="text-lead opacity-50">
              We research, analyze, and explore what it takes to produce a
              professional and impactful conference.
            </p>
          </div>
          <div className="col-start-1 col-end-9">
            <DirectorTeamDisplay />
          </div>
        </section>
      </main>
    </>
  );
};

export default About;
