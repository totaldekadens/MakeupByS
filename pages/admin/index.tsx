import { AppShell, Title, Box, Button } from "@mantine/core";
import { NextPage } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useSession, signIn, signOut } from "next-auth/react";
import MarginTopContainer from "../../components/layout/MarginTopContainer";

const Admin: NextPage = () => {
  const { data: session } = useSession();
  return (
    <>
      <AppShell fixed={false} header={<Header />} footer={<Footer />}>
        <MarginTopContainer>
          <Box style={{ marginTop: 60, minHeight: "100vh" }}>
            <Title order={1}>Du är på adminsidan</Title>
            <Button mx={10} color="white" onClick={() => signOut()}>
              Logga ut
            </Button>
          </Box>
        </MarginTopContainer>
      </AppShell>
    </>
  );
};

export default Admin;
