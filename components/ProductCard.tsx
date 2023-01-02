import { Card, Flex, Title, Image, Text, Box } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { FC } from "react";
import AddToCartIcon from "./AddToCartIcon";

type Props = {
  product: any;
};

const ProductCard: FC<Props> = ({ product }) => {
  const path = `/uploads/${product.images[0]}`;
  const { hovered, ref } = useHover();
  const price = Number(product.mainProduct.price.$numberDecimal);
  return (
    <Card
      ref={ref}
      m="lg"
      sx={{
        justifyContent: "center",
        "&:hover": {
          cursor: "pointer",
        },
      }}
    >
      <Card.Section>
        <Image src={path} height={300} alt="Norway" fit="contain" />
        <Box
          w={50}
          h={50}
          pos={"absolute"}
          sx={(theme) => ({
            top: 0,
            left: 0,
            borderRadius: "50%",
            backgroundColor: hovered ? theme.colors.brand[2] : "white",
          })}
        >
          <AddToCartIcon color={hovered ? "white" : "black"} />
        </Box>
      </Card.Section>
      <Title align="center" color={"dimmed"} order={4}>
        {product.title}
      </Title>
      <Title align="center" order={4}>
        {price} KR
      </Title>
    </Card>
  );
};

export default ProductCard;
