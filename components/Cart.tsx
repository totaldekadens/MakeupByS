import { Box, Drawer, Flex, Group, Image, Title, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import useSlugify from "../utils/useSlugify";
import { LineItem } from "./AddToCartIcon";

type Props = {
  opened: boolean;
  openCart: Dispatch<SetStateAction<boolean>>;
};

const Cart: FC<Props> = ({ opened, openCart }) => {
  const [product, setProduct] = useState<any>();
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
          setProduct(result.data);

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

  console.log(product);
  return (
    <Drawer
      opened={opened}
      onClose={() => openCart(false)}
      //title="Register"
      padding="xl"
      size="lg"
      position="right"
      styles={{
        body: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
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
              <Group spacing={5}>
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
          </Flex>
        );
      })}
    </Drawer>
  );
};

export default Cart;
