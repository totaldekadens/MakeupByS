import { Card, Title, Image, Text, Box } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import Link from "next/link";
import { FC } from "react";
import { PopulatedProduct } from "../../utils/types";
import useWindowSize from "../../utils/useWindowSize";
import AddToCartIcon from "../cart/AddToCartIcon";

type Props = {
  product: PopulatedProduct;
};

const ProductCard: FC<Props> = ({ product }) => {
  const path = `/uploads/${product.images[0]}`;
  const { hovered, ref } = useHover();
  const size = useWindowSize();
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
        <Link href={`/produkt/${product.slug}`}>
          <Image src={path} height={300} alt={product.title} fit="contain" />
        </Link>
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
              [theme.fn.smallerThan("xs")]: {
                backgroundColor: "white",
              },
            })}
          >
            <AddToCartIcon
              color={size.width > 576 ? (hovered ? "white" : "black") : "black"}
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
      <Link href={`/produkt/${product.slug}`}>
        <Title align="center" color={"dimmed"} order={4}>
          {product.title}
        </Title>
      </Link>
      <Title align="center" order={4}>
        {price} KR
      </Title>
    </Card>
  );
};

export default ProductCard;
