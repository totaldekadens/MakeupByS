import { AppShell, Title } from "@mantine/core";
import { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";

const MyPage: NextPage = () => {
  return (
    <>
      <AppShell fixed={false} header={<Header />} footer={<Footer />}>
        <main style={{ marginTop: 60, minHeight: "100vh" }}>
          <Title order={1}>Du är på mina sidor</Title>
        </main>
      </AppShell>
    </>
  );
};

export default MyPage;
