import { createStylesServer, ServerStyles } from "@mantine/next";
import Document, {
  DocumentContext,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { emotionCache } from "../emotionCache";

const stylesServer = createStylesServer(emotionCache);

export default class _Document extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        initialProps.styles,
        <ServerStyles
          html={initialProps.html}
          server={stylesServer}
          key="styles"
        />,
      ],
    };
  }

  render() {
    return (
      <Html style={{ scrollBehavior: "smooth" }}>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            name="description"
            content="Ett innovativt bokningssystem för dig som aktör i upplevelse-branschen som tillåter dig att ta emot bokningar direkt från din egen hemsida."
          />
          <title>
            Bokningssystem för upplevelse-branschen - Adventure Hero
          </title>

          <meta
            property="og:title"
            content="Bokningssystemet för upplevelse-branschen - Adventure Hero"
          />
          <meta
            property="og:description"
            content="Ett innovativt bokningssystem för dig som aktör i upplevelse-branschen som tillåter dig att ta emot bokningar direkt från din egen hemsida."
          />
          <meta
            property="og:url"
            content="https://business.adventurehero.se/"
          />
          <meta property="og:image" content="/logo.png" />
          <meta name="theme-color" content="#E5B4AD"></meta>
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Mada:wght@200;300;400;500;600;700;900&display=swap"
            rel="stylesheet"
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
