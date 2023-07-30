import Image from "next/image";
import Logo from "@/EmergeTextEffect/Logo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Nav from "@/component/Nav";
import Head from "next/head";

export default function Home() {
  const viewport = useWindowDimension();
  // console.log(scrollY);
  return (
    <>
      <Head>
        <title>TEDxSFU</title>
        <meta
          name="description"
          content="Every year, TEDxSFU conferences provide a platform for industry professionals, advocates, educators, and storytellers to showcase their ideas worth spreading. TEDxSFU continues to engage over 2,500 members in the Metro Vancouver area annually through community members conferences, dialogue sessions, and after-party events. We're excited to gather a community of supporters who share similar desires to build community and spaces for storytelling, dialogue, and exploration of today's most intriguing and pressing topics."
        ></meta>
      </Head>
      <Nav />
      <main className="min-h-screen">
        <section className="min-h-screen flex flex-col lg:justify-center px-4">
          <div className="max-lg:fixed max-lg:pointer-events-none max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:bottom-0 flex flex-col lg:flex-row items-center justify-center lg:my-16 gap-8">
            <a
              className={`uppercase leading-tight text-center pointer-events-auto lg:translate-x-28`}
              href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
              target="_blank"
            >
              November 11 {viewport.width >= 1024 && <br />}2023
            </a>
            <Logo />
            <a
              className={`uppercase leading-tight text-center pointer-events-auto lg:-translate-x-28`}
              href="https://goo.gl/maps/yx7ytZ2okDUuF33q7"
              target="_blank"
            >
              The Centre for
              <br />
              Performing Arts
            </a>
          </div>
        </section>

        <section className="bg-gradient-to-t from-black to-transparent fixed bottom-0 left-0 right-0 p-4 flex flex-row">
          <a href="https://forms.gle/YbXZKmgtL8DaFUAC6" target="_blank">
            Join our newsletter
          </a>
          <div className="ml-auto flex flex-row gap-4">
            <a href="https://linkedin.com/in/tedxsfu" target="_blank">
              <Image
                alt="LinkedIn"
                width="24"
                height="24"
                src="./img/mdi_linkedin.svg"
              ></Image>
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
          </div>
        </section>
      </main>
    </>
  );
}
