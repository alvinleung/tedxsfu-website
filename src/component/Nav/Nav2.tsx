import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import { useCopyToClipboard } from "usehooks-ts";
import { useWindowDimension } from "../../hooks/useWindowDimension";
import Copiable from "./Copiable";
import { AnimatePresence, motion } from "framer-motion";
import { AnimationConfig } from "../AnimationConfig";
import MainGrid from "../layouts/MainGrid";
import EmailForm from "../Footer/EmailForm";
import { NavButton } from "./NavButton";
import { EventInfoModule } from "./EventInfoModule";
import BackgroundPreview from "./BackgroundPreview";
import StaggerTransition from "./StaggerTransition";
import SocialModule from "./SocialModule";
import Hamburger from "./Hamburger";
import { TEDxSFULogo } from "./TEDxSFULogo";
import Scrim from "./Scrim";
import EventInfo, { EventInfoLink } from "./EventInfoLink";
import TicketCTA from "./TicketCTA";

type Props = { children: React.ReactNode };

interface NavContextInterface {
  setScrollState: (scrolledState: NavScrollState) => void;
  isOpened: boolean;
}

export const NavContext = createContext<NavContextInterface>({
  setScrollState: (scrolledState: NavScrollState) => {},
  isOpened: false,
});
export enum NavScrollState {
  SCROLLED,
  DEFAULT,
}

const Nav = ({ children }: Props) => {
  const router = useRouter();
  const isAboutPage = router.pathname != "/";
  const [scrollState, setScrollState] = useState(NavScrollState.DEFAULT);

  const [selectedPath, setSelectedPath] = useState("");

  const [isOpened, setIsOpened] = useState(false);
  const [hasTransitionBegan, setHasTransitionBegan] = useState(false);

  const EXIT_DURATION = 1000;
  const prevPath = useRef(router.pathname);

  useEffect(() => {
    // toggle the path name
    if (prevPath.current === router.pathname) return;
    prevPath.current = router.pathname;

    if (!isOpened) return;

    console.log("transitioning to new page");

    setHasTransitionBegan(true);
    const timeout = setTimeout(() => {
      setIsOpened(false);
      setTimeout(() => setSelectedPath(""), 500);
      requestAnimationFrame(() => {
        setHasTransitionBegan(false);
      });
    }, EXIT_DURATION);

    return () => {
      clearTimeout(timeout);
    };
    // when new page load
  }, [router.pathname, isOpened]);

  const toggleOpen = () => {
    setIsOpened(!isOpened);
    setSelectedPath("");
    setHasTransitionBegan(false);
  };

  const handlePreviewExit = () => {
    if (hasTransitionBegan) return;
    setSelectedPath("");
  };

  const [isContentOverflowing, setIsContentOverflowing] = useState(false);

  const handleLinkButtonClick = (href: string) => {
    if (router.pathname !== href) {
      router.push(href);
      return;
    }
    setIsOpened(false);
  };

  return (
    <NavContext.Provider value={{ setScrollState, isOpened }}>
      <motion.nav>
        <TEDxSFULogo
          onClick={() => {
            setIsOpened(false);
            if (isAboutPage) router.push("/");
          }}
        />

        <EventInfoModule
          isActive={
            router.pathname === "/" || (isOpened && !hasTransitionBegan)
          }
        />
        <div className="fixed right-[64px] top-grid-margin-y z-50 mt-nav-button-offset-y pr-grid-margin-x">
          <TicketCTA isHighlighted={false} />
        </div>

        <Scrim isShowing={isContentOverflowing} />
        <motion.button
          className="fixed right-grid-margin-y top-grid-margin-y z-50 mt-nav-button-offset-y flex h-nav-button-height w-nav-button-height items-center justify-center"
          // style={{width: "max(auto, 4rem)"}}
          aria-label="Menu"
          onClick={toggleOpen}
        >
          <Hamburger />
        </motion.button>
      </motion.nav>

      <motion.div
        className="fixed bottom-0 top-0 z-40 w-full overflow-hidden"
        style={{
          pointerEvents: isOpened && !hasTransitionBegan ? "all" : "none",
        }}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isOpened ? 1 : 0,
          transition: {
            duration: AnimationConfig.NORMAL,
            ease: "linear",
            delay: isOpened ? 0 : 0.2,
          },
        }}
        exit={{
          opacity: 0,
        }}
      >
        <div className="absolute bottom-0 z-50 h-fit w-full md:bottom-auto md:top-0">
          <StaggerTransition
            staggerIndex={4}
            isActive={isOpened && !hasTransitionBegan}
            secondary
          >
            {/* <EventInfoModule /> */}
          </StaggerTransition>
        </div>
        <BackgroundPreview
          selected={selectedPath}
          hasTransitionBegan={hasTransitionBegan}
        />
        <MainGrid className="absolute left-0 top-0 h-[100dvh] overflow-auto px-grid-margin-x max-md:right-0">
          <div
            className={`col-span-full flex flex-col pt-[18vh] md:col-span-3 md:col-start-2 2xl:col-start-2`}
          >
            <StaggerTransition
              staggerIndex={1}
              isActive={isOpened && !hasTransitionBegan}
            >
              <NavButton
                onClick={handleLinkButtonClick}
                onEnterPreview={() => {
                  !hasTransitionBegan && setSelectedPath("/");
                }}
                onExitPreview={handlePreviewExit}
                href={"/"}
                isHighlighted={
                  selectedPath === "/" ||
                  (router.pathname === "/" && selectedPath === "")
                }
                index={"1"}
                title={"Event Info"}
                description={"TEDxSFU 2023 at a glance"}
              />
            </StaggerTransition>

            <StaggerTransition
              staggerIndex={2}
              isActive={isOpened && !hasTransitionBegan}
            >
              <NavButton
                onClick={handleLinkButtonClick}
                onEnterPreview={() => {
                  !hasTransitionBegan && setSelectedPath("/about");
                }}
                onExitPreview={handlePreviewExit}
                href={"/about"}
                isHighlighted={
                  selectedPath === "/about" ||
                  (router.pathname === "/about" && selectedPath === "")
                }
                index={"2"}
                title={"About Us"}
                description={"13 years in the making"}
              />
            </StaggerTransition>

            <StaggerTransition
              staggerIndex={3}
              isActive={isOpened && !hasTransitionBegan}
            >
              <motion.div
                className="col-span-4 grid grid-cols-4 gap-4 pt-4 md:col-span-3 md:col-start-2 md:grid-cols-3"
                style={{ borderTop: "1px solid rgba(255,255,255,0.3)" }}
              >
                <h2 className="leading-tight">Let&apos;s keep in touch</h2>
                <div className="col-span-3 md:col-span-2">
                  <Copiable
                    desc="General inquiries &amp; ticketing"
                    email="info@tedxsfu.com"
                    isDarkMode={true}
                  />
                  <Copiable
                    desc="Partnership inquiries"
                    email="partner@tedxsfu.com"
                    isDarkMode={true}
                  />
                  <SocialModule />
                </div>
              </motion.div>
            </StaggerTransition>
          </div>

          <div className="col-span-full mt-auto pb-32 sm:col-span-3 sm:col-start-2 md:col-span-3 md:col-start-3 md:pb-12 lg:col-span-2 lg:col-start-3">
            <StaggerTransition
              staggerIndex={4}
              isActive={isOpened && !hasTransitionBegan}
              secondary
            >
              <div className="mb-6 mt-auto text-body ">
                Early bird ticket sale and exclusive content — right to your
                inbox.
              </div>
              <EmailForm isDarkMode={true} />
            </StaggerTransition>
          </div>
        </MainGrid>
      </motion.div>
      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  return useContext(NavContext);
};

export default Nav;
