import Link from "next/link"
import Logo from "@/EmergeTextEffect/Logo";
import { useWindowDimension } from "@/hooks/useWindowDimension";
import Nav from "@/component/Nav";

export default function Home() {
  const viewport = useWindowDimension();
  
  return (
    <>
      <Nav />
      <main className="min-h-screen flex flex-col justify-center px-4">
        <section className="flex flex-col lg:flex-row items-center lg: justify-center my-16 gap-8">
          <Link 
            className={`uppercase text-center lg:translate-x-full`}
            href="http://www.google.com/calendar/event?action=TEMPLATE&text=TEDxSFU%202023:%20Unmask%20the%20Magic&dates=20231111T160000Z/20231112T020000Z&details=Event%20Details%20Here&location=777%20Homer%20St%2C%20Vancouver%2C%20BC"
            target="_blank">November 11 {viewport.width >= 1024 && <br/>}2023</Link>
          <Logo />
          <Link className={`uppercase text-center lg:-translate-x-full`} href="https://goo.gl/maps/yx7ytZ2okDUuF33q7" target="_blank">The Centre for<br/>Performing Arts</Link>
        </section>
      </main>
    </>
  );
}

