import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useContainerScroll } from "../ScrollContainer/ScrollContainer";
import NavToggle from "./NavToggle";
import NavToggle2 from "./NavToggle2";

type Props = {};

const Nav = (props: Props) => {
  const path = useRouter();
  const isAboutPage = path.pathname != "/";

  const { refreshDocumentMeasurement } = useContainerScroll();

  useEffect(() => {
    setTimeout(() => refreshDocumentMeasurement(), 1000);
  }, [path.pathname]);

  return (
    <nav
      className="block fixed left-0 right-0 top-0 h-8 z-50"
      style={{
        color: isAboutPage ? "#000" : "#FFF",
      }}
    >
      <Link href={"/"} className="block h-16 w-fit">
        {!isAboutPage ? (
          <img
            className="block h-16 w-fit"
            src="./TEDxSFU_logo_white.svg"
            width="1168"
            height="438"
            alt="TEDxSFU"
          />
        ) : (
          <img
            className="block h-16 w-fit"
            src="./TEDxSFU_logo_black.svg"
            width="1168"
            height="438"
            alt="TEDxSFU"
          />
        )}
      </Link>
      <div className="fixed right-0 top-0 bottom-0 uppercase">
        {/* <NavToggle path={path.pathname} /> */}
        <NavToggle2 path={path.pathname} />
      </div>
    </nav>
  );
};

export default Nav;
