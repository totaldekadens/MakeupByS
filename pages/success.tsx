import { AppShell, Flex, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import Header from "../components/Header";

type Props = {
  statusCode: number;
};

const SuccessPage: NextPage<Props> = (props) => {
  return (
    <AppShell fixed={false} header={<Header />}>
      <Flex
        align="center"
        direction="column"
        style={{ marginTop: 60, width: "100%" }}
      >
        <Title>Success!!</Title>
      </Flex>
    </AppShell>
  );
};

export default SuccessPage;
