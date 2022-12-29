import { AppShell, Title, Box } from "@mantine/core";
import { NextPage } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Admin: NextPage = () => {
  return (
    <>
      <AppShell fixed={false} header={<Header />} footer={<Footer />}>
        <Box style={{ marginTop: 60, minHeight: "100vh" }}>
          <Title order={1}>Du är på adminsidan</Title>
        </Box>
      </AppShell>
      <Header />
    </>
  );
};

export default Admin;
