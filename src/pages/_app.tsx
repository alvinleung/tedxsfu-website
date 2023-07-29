import Cursor from "@/component/Cursor";
import { ScrollContainer } from "@/component/ScrollContainer";
import { MousePosContextProvider } from "@/hooks/useMousePosition";
import { WindowDimensionContextProvider } from "@/hooks/useWindowDimension";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";

const chiaroscuro = localFont({
  src: [
    {
      path: "../fonts/chiaroscuro/ChiaroscuroSlant-Slant.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/chiaroscuro/ChiaroscuroSlant-Slant.woff2",
      weight: "400",
      style: "normal",
    },
  ],
});

const helvetica = localFont({
  src: [
    {
      path: "../fonts/helvetica/HelveticaNeue-Roman.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/helvetica/HelveticaNeue-Bd.woff",
      weight: "600",
      style: "normal",
    },
  ],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WindowDimensionContextProvider>
      <MousePosContextProvider>
        {/* <Cursor /> */}
        <ScrollContainer>
          <main className={`${helvetica.className}`}>
            <Component {...pageProps} />{" "}
          </main>
        </ScrollContainer>
      </MousePosContextProvider>
    </WindowDimensionContextProvider>
  );
}
