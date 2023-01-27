import { AppShell, Flex, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import Header from "../components/layout/Header";
import MarginTopContainer from "../components/layout/MarginTopContainer";

type Props = {
  statusCode: number;
};

const ErrorPage: NextPage<Props> = (props) => {
  const codes = [
    { status: 400, description: "Något gick fel" },
    { status: 401, description: "Du är inte auktoriserad" },
    { status: 403, description: "Förbjuden förfrågan" },
    { status: 404, description: "Sidan hittades ej" },
    { status: 500, description: "Fel på servern" },
  ];

  const foundCode = codes.find((code) => code.status == props.statusCode);

  return (
    <AppShell fixed={false} header={<Header />}>
      <MarginTopContainer>
        <Flex
          align="center"
          direction="column"
          style={{ marginTop: 60, width: "100%" }}
        >
          <Title>{foundCode?.status}</Title>
          <Text>{foundCode?.description}</Text>
        </Flex>
      </MarginTopContainer>
    </AppShell>
  );
};

export default ErrorPage;
