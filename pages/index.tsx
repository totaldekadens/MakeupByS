import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { AppShell } from "@mantine/core";
import Cart from "../components/cart/Cart";

export default function Home() {
  return (
    <>
      <Head>
        <title>MakeupByS</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell fixed={false} header={<Header />} footer={<Footer />}>
        <>
          <main style={{ marginTop: 60, minHeight: "100vh" }}>
            <h1>Startsida</h1>
          </main>
          <Cart />
        </>
      </AppShell>
    </>
  );
}
