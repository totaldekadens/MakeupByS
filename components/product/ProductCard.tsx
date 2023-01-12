import { Card, Flex, Title, Image, Text, Box } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useContext } from "react";
import AddToCartIcon from "../cart/AddToCartIcon";
import { openedCartContext } from "../context/OpenCartProvider";

type Props = {
  product: any;
};

const ProductCard: FC<Props> = ({ product }) => {
  const path = `/uploads/${product.images[0]}`;
  const { hovered, ref } = useHover();
  const price = Number(product.mainProduct.price.$numberDecimal);
  return (
    <Link href={`/produkt/${product.slug}`}>
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
          <Image src={path} height={300} alt={product.title} fit="contain" />
          {product.availableQty < 1 ? null : (
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
              <AddToCartIcon
                color={hovered ? "white" : "black"}
                product={product}
              />
            </Box>
          )}
        </Card.Section>
        {product.availableQty < 1 ? (
          <Text align="center" color={"red"} size={13}>
            Tillfälligt slut
          </Text>
        ) : null}
        <Title align="center" color={"dimmed"} order={4}>
          {product.title}
        </Title>
        <Title align="center" order={4}>
          {price} KR
        </Title>
      </Card>
    </Link>
  );
};

export default ProductCard;
