import { AppShell, Box, Flex, Title } from "@mantine/core";
import { NextPage } from "next";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import HeaderCheckout from "../../components/HeaderCheckout";

const Kassa: NextPage = () => {
  return (
    <AppShell
      fixed={false}
      header={<HeaderCheckout />}
      styles={{
        main: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <Flex
        style={{
          marginTop: 60,
          minHeight: "100vh",
          maxWidth: "1320px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title>KASSA</Title>
        <Flex
          mt="xl"
          sx={(theme) => ({
            border: "1px solid" + theme.colors.gray[3],
            borderRadius: "10px",
          })}
        ></Flex>
      </Flex>
    </AppShell>
  );
};

export default Kassa;
