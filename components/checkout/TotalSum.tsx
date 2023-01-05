import { Flex, Title, Text, Button } from "@mantine/core";
import { FC } from "react";

const TotalSum: FC = () => {
  return (
    <Flex mt={20} direction={"column"} align="center">
      <Text weight={"bold"}>Att betala inkl. moms och frakt:</Text>
      <Title color={"red"}>1000 KR</Title>
      <Button sx={{ width: "100%" }} mt={40}>
        Gå till betalning
      </Button>
      <Text mt={5} size={"xs"}>
        Genom att fortsätta till betalning godkänner jag Almänna villkor, samt
        bekräftar att jag tagit del av, och förstått butikens integritetpolicy
      </Text>
    </Flex>
  );
};
export default TotalSum;
