import { AppShell, Flex, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import Header from "../components/Header";
import MarginTopContainer from "../components/layout/MarginTopContainer";

const Kopvillkor: NextPage = (props) => {
  return (
    <AppShell fixed={false} header={<Header />}>
      <MarginTopContainer>
        <Flex
          align="center"
          direction="column"
          style={{ marginTop: 60, width: "100%" }}
        >
          <Title>Köpvillkor</Title>
          <Text>text</Text>
        </Flex>
      </MarginTopContainer>
    </AppShell>
  );
};

export default Kopvillkor;
