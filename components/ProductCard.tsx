import { Flex, Title } from "@mantine/core";
import { FC } from "react";

type Props = {
  product: any;
};

const ProductCard: FC<Props> = ({ product }) => {
  return (
    <Flex m="lg" wrap="wrap" justify={"center"}>
      <Title order={3}>{product.title}</Title>
    </Flex>
  );
};

export default ProductCard;
