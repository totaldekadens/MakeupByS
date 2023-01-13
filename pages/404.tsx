import { AppShell, Flex, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import Header from "../components/Header";
import MarginTopContainer from "../components/layout/MarginTopContainer";

type Props = {
  statusCode: number;
};

const NotFound: NextPage<Props> = (props) => {
  return (
    <AppShell fixed={false} header={<Header />}>
      <MarginTopContainer>
        <Flex
          align="center"
          direction="column"
          style={{ marginTop: 60, width: "100%" }}
        >
          <Title>404</Title>
          <Text>Sidan hittades inte</Text>
        </Flex>
      </MarginTopContainer>
    </AppShell>
  );
};

export default NotFound;
