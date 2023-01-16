import { Flex, Text } from "@mantine/core";
import { FC } from "react";

type Section = {
  title: string;
  description: string | number | undefined;
};

const Section: FC<Section> = ({ title, description }) => {
  return (
    <Flex gap={10}>
      <Text size={14} weight="bold">
        {title + ":"}
      </Text>
      <Text size={14}>{description}</Text>
    </Flex>
  );
};

export default Section;
