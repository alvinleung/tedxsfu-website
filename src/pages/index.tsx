import Image from "next/image"
import Link from "next/link"
import Logo from "@/EmergeTextEffect/Logo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import { useContainerScroll } from "@/component/ScrollContainer";
import Nav from "@/component/Nav";

export default function Home() {
  const viewport = useWindowDimension();
  // console.log(scrollY);
  return (
    <>
      <Nav />
      <main className="min-h-screen">
        <section className="min-h-screen flex flex-col lg:justify-center px-4">
          <div className="max-lg:fixed max-lg:pointer-events-none max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:bottom-0 flex flex-col lg:flex-row items-center justify-center lg:my-16 gap-8">
            <Link 
              className={`uppercase text-center pointer-events-auto lg:translate-x-28`}
              href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
              target="_blank">November 11 {viewport.width >= 1024 && <br/>}2023</Link>
            <Logo />
            <Link className={`uppercase text-center pointer-events-auto lg:-translate-x-28`} href="https://goo.gl/maps/yx7ytZ2okDUuF33q7" target="_blank">The Centre for<br/>Performing Arts</Link>
          </div>
        </section>

        <section className="bg-gradient-to-t from-black to-transparent fixed bottom-0 left-0 right-0 p-4 flex flex-row">
            <Link href="https://forms.gle/YbXZKmgtL8DaFUAC6" target="_blank">
                Join our newsletter
            </Link>
            <div className="ml-auto flex flex-row gap-4">
              <Link href="https://linkedin.com/in/tedxsfu" target="_blank">
                <Image alt="LinkedIn" width="24" height="24" src="./img/mdi_linkedin.svg"></Image>
              </Link>
              <Link href="https://twitter.com/tedxsfu" target="_blank">
                <Image alt="Twitter" width="24" height="24" src="./img/mdi_twitter.svg"></Image>
              </Link>
              <Link href="https://instagram.com/tedxsfu" target="_blank">
                <Image alt="Instagram" width="24" height="24" src="./img/mdi_instagram.svg"></Image>
              </Link>
            </div>
        </section>
      </main>
    </>
  );
}

