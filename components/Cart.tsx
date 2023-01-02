import {
  Box,
  Drawer,
  Flex,
  Group,
  Image,
  Title,
  Text,
  Button,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconCircleMinus, IconCirclePlus, IconTrash } from "@tabler/icons";
import Link from "next/link";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import useSlugify from "../utils/useSlugify";
import { LineItem } from "./AddToCartIcon";

type Props = {
  opened: boolean;
  openCart: Dispatch<SetStateAction<boolean>>;
};

const Cart: FC<Props> = ({ opened, openCart }) => {
  const [cartItems, setCartItems] = useLocalStorage<LineItem[]>({
    key: "cart",
    defaultValue: [],
  });

  const handleIncrement = async (product: LineItem) => {
    try {
      if (product) {
        const getSlug = useSlugify(product.price_data.product_data.name);

        let response = await fetch(`/api/open/subproduct/${getSlug}`);
        let result = await response.json();

        if (result.success) {
          let cartCopy = [...cartItems];

          let foundIndex = cartCopy.findIndex(
            (cartItem) =>
              cartItem.price_data.product_data.metadata.id ===
              product.price_data.product_data.metadata.id
          );

          if (foundIndex >= 0) {
            if (cartCopy[foundIndex].quantity >= result.data.availableQty) {
              return alert("Finns tyvärr inga fler produkter"); // Fixa modal till denna sen
            }
            cartCopy[foundIndex].quantity++;
          }
          setCartItems(cartCopy);

          return;
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDecrement = async (product: LineItem) => {
    try {
      if (product) {
        let cartCopy = [...cartItems];

        let foundIndex = cartCopy.findIndex(
          (cartItem) =>
            cartItem.price_data.product_data.metadata.id ===
            product.price_data.product_data.metadata.id
        );
        console.log(foundIndex);
        if (foundIndex >= 0) {
          console.log("kommer in");
          cartCopy[foundIndex].quantity--;
        }
        setCartItems(cartCopy);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (product: LineItem) => {
    try {
      if (product) {
        let cartCopy = [...cartItems];

        const updateCart = cartCopy.filter(
          (cartItem) =>
            cartItem.price_data.product_data.metadata.id !=
            product.price_data.product_data.metadata.id
        );
        setCartItems(updateCart);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Drawer
      withCloseButton={false}
      opened={opened}
      onClose={() => openCart(false)}
      title="Varukorg"
      padding="xl"
      size="lg"
      position="right"
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
        header: {
          width: "100%",
          display: "flex",
          marginBottom: "40px",
          fontSize: "24px",
          justifyContent: "center",
        },
      }}
    >
      <Flex direction={"column"} sx={{ width: "100%" }}>
        {cartItems.map((product) => {
          return (
            <Flex
              h={100}
              pb={10}
              mb={10}
              sx={(theme) => ({
                width: "95%",
                borderBottom: "1px solid" + theme.colors.dark[0],
              })}
            >
              <Image
                src={`/uploads/${product.price_data.product_data.images[0]}`}
                width={80}
                alt={product.price_data.product_data.name}
                fit="contain"
              />
              <Flex ml={"xs"} direction={"column"} justify="space-between">
                <Title order={6}>{product.price_data.product_data.name}</Title>
                <Group w={100} spacing={5}>
                  <IconCircleMinus
                    style={{
                      cursor: product.quantity < 2 ? "unset" : "pointer",
                      pointerEvents: product.quantity < 2 ? "none" : "unset",
                    }}
                    strokeWidth={1.2}
                    color={product.quantity < 2 ? "gray" : "black"}
                    onClick={() => handleDecrement(product)}
                  />
                  <Text>{product.quantity}</Text>
                  <IconCirclePlus
                    style={{ cursor: "pointer" }}
                    strokeWidth={1.2}
                    onClick={() => handleIncrement(product)}
                  />
                </Group>
              </Flex>
              <Flex
                sx={{ width: "100%" }}
                direction={"column"}
                justify="flex-end"
                align={"flex-end"}
              >
                <Title mb={10} order={4}>
                  {product.price_data.unit_amount} KR
                </Title>
                <IconTrash
                  size={20}
                  style={{ cursor: "pointer" }}
                  strokeWidth={1.25}
                  onClick={() => handleRemove(product)}
                />
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Flex
        h={200}
        pos="absolute"
        bottom={0}
        direction={"column"}
        justify="center"
        align={"center"}
        sx={{ width: "100%", borderTop: "1px solid lightGray" }}
        gap="lg"
      >
        <Flex gap={8} align="center">
          <Text>Totalt att betala</Text>
          <Title order={4}>summa</Title>
        </Flex>
        <Flex>
          <Link href="#">
            <Button h={50}>Till kassan</Button>
          </Link>
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default Cart;
