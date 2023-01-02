import { Box, Drawer, Flex, Group, Image, Title, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconCircleMinus, IconCirclePlus } from "@tabler/icons";
import { Dispatch, FC, SetStateAction } from "react";
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
                  strokeWidth={1.2}
                  color={product.quantity < 2 ? "gray" : "black"}
                />
                <Text>{product.quantity}</Text>
                <IconCirclePlus strokeWidth={1.2} />
              </Group>
            </Flex>
          </Flex>
        );
      })}
    </Drawer>
  );
};

export default Cart;
