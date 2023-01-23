import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { emotionCache } from "../emotionCache";
import { MantineProvider } from "@mantine/core";
import { getTheme } from "../styles/theme";
import CheckOutProvider from "../components/context/checkoutProvider";
import OpenedCartProvider from "../components/context/OpenCartProvider";
import HideProvider from "../components/context/HideProvider";
import Head from "next/head";
import InfoDrawer from "../components/InfoDrawer";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <SessionProvider session={session}>
        <MantineProvider
          emotionCache={emotionCache}
          withGlobalStyles
          withNormalizeCSS
          theme={getTheme("light")}
        >
          <CheckOutProvider>
            <OpenedCartProvider>
              <HideProvider>
                <Component {...pageProps} />
                <InfoDrawer />
              </HideProvider>
            </OpenedCartProvider>
          </CheckOutProvider>
        </MantineProvider>
      </SessionProvider>
    </>
  );
}
