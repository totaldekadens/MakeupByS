import { Flex, Title, Text } from "@mantine/core";
import { FC } from "react";
import { HairDocument } from "../../models/Hair";

type Props = {
  item: string;
  description: string;
};

const Result: FC<Props> = ({ item, description }) => {
  return (
    <Flex
      sx={{ width: "100%", minHeight: "60vh" }}
      direction="column"
      align={"center"}
    >
      <Title>GRATTIS! </Title>
      <Title>{item}</Title>
      <Text>{description}</Text>
    </Flex>
  );
};

export default Result;
