import React from "react";
import { useRouter } from "next/router";

type Props = {};

const Nav = (props: Props) => {
  const path = useRouter();
  return (
    <nav className="block fixed left-0 right-0 top-0 h-8 z-50">
      {path.pathname == "/" ? (
        <img className="block h-16 w-fit" src="./TEDxSFU_logo_white.svg" width="1168" height="438" alt="TEDxSFU"/>
      ) : (
        <img className="block h-16 w-fit" src="./TEDxSFU_logo_black.svg" width="1168" height="438" alt="TEDxSFU"/>
      )}
    </nav>
  );
};

export default Nav;
