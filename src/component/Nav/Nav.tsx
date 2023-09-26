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
import { useLogoContext } from "../../EmergeTextEffect/Logo";
import NavScreen from "./NavScreen";
import {
  ScrollDirection,
  useContainerScroll,
} from "../ScrollContainer/ScrollContainer";
import { breakpoints, useBreakpoint } from "@/hooks/useBreakpoints";

type Props = { children: React.ReactNode };

interface NavContextInterface {
  setScrollState: (scrolledState: NavScrollState) => void;
  setScrollDirection: (scrollDirection: ScrollDirection) => void;
  isOpened: boolean;
  // eventModuleIsOpened: boolean;
  exitDuration: number;
  setIsLandingLogoVisible: (isOpen: boolean) => void;
}

export const NavContext = createContext<NavContextInterface>({
  setScrollState: (scrolledState: NavScrollState) => {},
  setScrollDirection: (scrollDirection: ScrollDirection) => {},
  isOpened: false,
  // eventModuleIsOpened: false,
  setIsLandingLogoVisible: (isOpen: boolean) => {},
  exitDuration: 1000,
});
export enum NavScrollState {
  SCROLLED,
  DEFAULT,
}

const Nav = ({ children }: Props) => {
  const router = useRouter();
  const isAboutPage = router.pathname != "/";
  const [scrollState, setScrollState] = useState(NavScrollState.DEFAULT);
  const [scrollDirection, setScrollDirection] = useState(
    ScrollDirection.UNKNOWN,
  );
  const [isLandingLogoVisible, setIsLandingLogoVisible] = useState(true);

  useEffect(() => {
    if (router.pathname === "/") {
      setIsLandingLogoVisible(true);
    }
  }, [router.pathname]);

  const [isOpened, setIsOpened] = useState(false);
  const [hasTransitionBegan, setHasTransitionBegan] = useState(false);

  const EXIT_DURATION = AnimationConfig.VERY_SLOW * 1000;
  const prevPath = useRef(router.pathname);

  useEffect(() => {
    // toggle the path name
    if (prevPath.current === router.pathname) return;
    prevPath.current = router.pathname;

    if (!isOpened) return;

    setHasTransitionBegan(true);
    const timeout = setTimeout(() => {
      setIsOpened(false);
      // setTimeout(() => setSelectedPath(""), 500);
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
    setHasTransitionBegan(false);
  };

  const [isContentOverflowing, setIsContentOverflowing] = useState(false);

  const atBreakpointSM = useBreakpoint(breakpoints.sm);

  const handleLinkButtonClick = (href: string) => {
    if (router.pathname !== href) {
      router.push(href);
      return;
    }
    setIsOpened(false);
  };

  return (
    <NavContext.Provider
      value={{
        setScrollState,
        setScrollDirection,
        isOpened,
        setIsLandingLogoVisible,
        exitDuration: EXIT_DURATION,
      }}
    >
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
          isLandingLogoVisible={isLandingLogoVisible}
          isMenuOpened={isOpened}
          scrollDirection={scrollDirection}
        />
        <div
          className="fixed z-50 mt-nav-button-offset-y max-sm:bottom-grid-margin-y max-sm:left-0 max-sm:right-0 max-sm:mx-auto sm:right-[64px] sm:top-grid-margin-y
        sm:pr-grid-margin-x
        "
        >
          <TicketCTA
            isHighlighted={
              scrollState === NavScrollState.SCROLLED ||
              isOpened ||
              !atBreakpointSM
            }
            isAboutPage={isAboutPage}
          />
        </div>

        <Scrim isShowing={isContentOverflowing} />
        <motion.button
          className="fixed right-2 top-grid-margin-y z-50 mt-nav-button-offset-y flex h-nav-button-height w-nav-button-height items-center justify-center mix-blend-exclusion sm:right-grid-margin-x"
          // style={{width: "max(auto, 4rem)"}}
          aria-label="Menu"
          onClick={toggleOpen}
        >
          <Hamburger />
        </motion.button>
      </motion.nav>

      <NavScreen
        isOpened={isOpened}
        hasTransitionBegan={hasTransitionBegan}
        onNavButtonClick={handleLinkButtonClick}
      />

      {children}
    </NavContext.Provider>
  );
};

export const useNavContext = () => {
  return useContext(NavContext);
};

export default Nav;
