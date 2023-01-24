import { AppShell, Flex, Text } from "@mantine/core";
import Head from "next/head";
import Options from "../../../components/admin/Options";
import HeaderCheckout from "../../../components/layout/HeaderCheckout";

const CustomerHandler = () => {
  return (
    <>
      <Head>
        <title>Kunder - MakeUpByS</title>
        <meta property="og:title" content={`Beställningar - MakeUpByS`} />
      </Head>
      <AppShell fixed={false} header={<HeaderCheckout />}>
        <Flex direction={"column"} align="center" style={{ marginTop: 60 }}>
          <Options />
          <Text mt={20} color={"brand.8"}>
            Pågående arbete
          </Text>
        </Flex>
      </AppShell>
    </>
  );
};

export default CustomerHandler;
