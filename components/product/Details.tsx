import { Flex, Title, Text } from "@mantine/core";
import { FC } from "react";

type Props = {
  product: any;
};

const Details: FC<Props> = ({ product }) => {
  return (
    <Flex
      mt={40}
      p={20}
      bg="gray.2"
      direction="column"
      sx={{ borderRadius: "10px" }}
    >
      <Title order={4}>Ingredienser</Title>
      <Text size={"sm"}>{product.mainProduct.ingredients}</Text>
      <Text mt={20} size={"sm"}>
        Artikelnummer: {product.partNo}
      </Text>
    </Flex>
  );
};

export default Details;
