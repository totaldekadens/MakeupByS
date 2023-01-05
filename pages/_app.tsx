import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { emotionCache } from "../emotionCache";
import { MantineProvider } from "@mantine/core";
import { getTheme } from "../styles/theme";
import CheckOutProvider from "../components/context/checkoutProvider";
import OpenedCartProvider from "../components/context/OpenCartProvider";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <MantineProvider
        emotionCache={emotionCache}
        withGlobalStyles
        withNormalizeCSS
        theme={getTheme("light")}
      >
        <CheckOutProvider>
          <OpenedCartProvider>
            <Component {...pageProps} />
          </OpenedCartProvider>
        </CheckOutProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
