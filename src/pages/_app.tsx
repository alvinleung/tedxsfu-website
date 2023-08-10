import Cursor from "@/component/Cursor";
import Script from "next/script";
import { MousePosContextProvider } from "@/hooks/useMousePosition";
import { WindowDimensionContextProvider } from "@/hooks/useWindowDimension";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import localFont from "next/font/local";
import { ScrollContainer } from "@/component/ScrollContainer/ScrollContainer";
import Nav from "@/component/Nav/Nav";
import { useRouter } from "next/router";
import TransitionEffect from "@/component/transition/TransitionEffect";
import Nav2 from "@/component/Nav/Nav2";
import Nav3 from "@/component/Nav/Nav3";

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
      path: "../fonts/helvetica/HelveticaNeue-Lt.woff",
      weight: "200",
      style: "normal"
    },
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
  // const router = useRouter();

  return (
    <WindowDimensionContextProvider>
      <MousePosContextProvider>
        <Nav3>
        <TransitionEffect>
          <ScrollContainer>
            <main className={`${helvetica.className}`}>
              <Script src="https://www.googletagmanager.com/gtag/js?id=G-4KYF3KQBR9" />
              <Script id="google-analytics">
                {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
    
              gtag('config', 'G-4KYF3KQBR9');
            `}
              </Script>
              <Component {...pageProps} />{" "}
            </main>
          </ScrollContainer>
        </TransitionEffect>
        </Nav3>
      </MousePosContextProvider>
    </WindowDimensionContextProvider>
  );
}
