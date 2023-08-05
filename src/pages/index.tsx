import Image from "next/image";
import Logo from "@/EmergeTextEffect/Logo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Nav from "@/component/Nav/Nav";
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
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <div className="max-w-screen min-h-screen bg-black">
        <section className="max-w-screen flex min-h-screen flex-col px-4 lg:justify-center">
          <div className="flex max-w-[100vw] flex-col items-center justify-center gap-8 max-lg:pointer-events-none max-lg:fixed max-lg:bottom-0 max-lg:left-0 max-lg:right-0 max-lg:top-0 lg:my-16 lg:flex-row">
            <a
              className={`pointer-events-auto text-center uppercase leading-tight lg:translate-x-28`}
              href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
              target="_blank"
            >
              November 11 {viewport.width >= 1024 && <br />}2023
            </a>
            <Logo />
            <a
              className={`pointer-events-auto text-center uppercase leading-tight lg:-translate-x-28`}
              href="https://goo.gl/maps/yx7ytZ2okDUuF33q7"
              target="_blank"
            >
              The Centre for
              <br />
              Performing Arts
            </a>
          </div>
        </section>

        <section className="fixed bottom-0 left-0 right-0 flex flex-row bg-gradient-to-t from-black to-transparent p-4">
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
        </section>
      </div>
    </>
  );
}
