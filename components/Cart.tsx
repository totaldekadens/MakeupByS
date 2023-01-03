import {
  Drawer,
  Flex,
  Group,
  Image,
  Title,
  Text,
  Button,
  Box,
  ScrollArea,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import {
  IconCircleMinus,
  IconCirclePlus,
  IconTrash,
  IconX,
} from "@tabler/icons";
import Link from "next/link";
import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useHandleDecrement from "../utils/useHandleDecrement";
import UseHandleIncrement from "../utils/useHandleIncrement";
import useHandleRemoveCartItem from "../utils/useHandleRemoveCartItem";
import useWindowSize from "../utils/useWindowSize";
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

  let totalSum = cartItems.reduce(
    (sum, item) => sum + item.price_data.unit_amount * item.quantity,
    0
  );

  let size = useWindowSize();

  const setHeight = size.height - 320;

  return (
    <Drawer
      overlayOpacity={0.3}
      withCloseButton={false}
      opened={opened}
      onClose={() => openCart(false)}
      title="Varukorg"
      padding="xl"
      size="lg"
      position="right"
      styles={(theme) => ({
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
        drawer: {
          [theme.fn.smallerThan("sm")]: {
            width: "300px",
          },
          [theme.fn.smallerThan("xs")]: {
            width: "280px",
          },
        },
      })}
    >
      <Box pos={"absolute"} top={10} right={10}>
        <IconX style={{ cursor: "pointer" }} onClick={() => openCart(false)} />
      </Box>
      <ScrollArea
        style={{ height: setHeight, width: "100%" }}
        scrollbarSize={8}
      >
        <Flex direction={"column"} sx={{ width: "100%", height: setHeight }}>
          {cartItems.map((product, index) => {
            return (
              <Flex
                key={index}
                h={100}
                pb={15}
                mb={15}
                sx={(theme) => ({
                  width: "95%",

                  borderBottom: "1px solid" + theme.colors.gray[2],
                })}
              >
                <Image
                  src={`/uploads/${product.price_data.product_data.images[0]}`}
                  width={55}
                  alt={product.price_data.product_data.name}
                  fit="contain"
                />

                <Flex ml={"xs"} direction={"column"} justify="space-between">
                  <Title
                    order={6}
                    sx={(theme) => ({
                      [theme.fn.smallerThan("sm")]: {
                        fontSize: theme.fontSizes.sm,
                      },
                    })}
                  >
                    {product.price_data.product_data.name}
                  </Title>
                  <Group w={100} spacing={5}>
                    <IconCircleMinus
                      style={{
                        cursor: product.quantity < 2 ? "unset" : "pointer",
                        pointerEvents: product.quantity < 2 ? "none" : "unset",
                      }}
                      strokeWidth={1.2}
                      color={product.quantity < 2 ? "gray" : "black"}
                      onClick={() =>
                        useHandleDecrement(product, cartItems, setCartItems)
                      }
                    />
                    <Text>{product.quantity}</Text>
                    <IconCirclePlus
                      style={{ cursor: "pointer" }}
                      strokeWidth={1.2}
                      onClick={() =>
                        UseHandleIncrement(product, cartItems, setCartItems)
                      }
                    />
                  </Group>
                </Flex>
                <Flex
                  sx={{ width: "100%" }}
                  direction={"column"}
                  justify="flex-end"
                  align={"flex-end"}
                >
                  <Title
                    mb={10}
                    order={4}
                    sx={(theme) => ({
                      [theme.fn.smallerThan("sm")]: {
                        fontSize: "16px",
                      },
                    })}
                  >
                    {product.price_data.unit_amount} KR
                  </Title>
                  <IconTrash
                    size={20}
                    style={{ cursor: "pointer" }}
                    strokeWidth={1.25}
                    onClick={() =>
                      useHandleRemoveCartItem(product, cartItems, setCartItems)
                    }
                  />
                </Flex>
              </Flex>
            );
          })}
        </Flex>
      </ScrollArea>

      <Flex
        h={200}
        pos="absolute"
        bottom={0}
        direction={"column"}
        justify="center"
        align={"center"}
        sx={(theme) => ({
          width: "100%",
          borderTop: "1px solid" + theme.colors.gray[2],
        })}
        gap="lg"
      >
        <Flex gap={8} align="center">
          <Text>Totalt att betala</Text>
          <Title order={4}>{totalSum} KR</Title>
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
