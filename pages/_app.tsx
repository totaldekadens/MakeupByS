import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { emotionCache } from "../emotionCache";
import { MantineProvider } from "@mantine/core";
import { getTheme } from "../styles/theme";
import CheckOutProvider from "../components/context/CheckoutProvider";

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
          <Component {...pageProps} />
        </CheckOutProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
