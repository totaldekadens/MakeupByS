import {
  Drawer,
  Flex,
  Title,
  Text,
  Button,
  Box,
  ScrollArea,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconX } from "@tabler/icons";
import Link from "next/link";
import { Dispatch, FC, SetStateAction } from "react";
import useWindowSize from "../utils/useWindowSize";
import { LineItem } from "./AddToCartIcon";
import CartItem from "./CartItem";

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
              <CartItem
                product={product}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
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
          [theme.fn.smallerThan("sm")]: {
            height: "150px",
          },
        })}
        gap="lg"
      >
        <Flex gap={8} align="center">
          <Text>Totalt att betala</Text>
          <Title order={4}>{totalSum} KR</Title>
        </Flex>
        <Flex>
          <Link href="/kassa">
            <Button h={50}>Till kassan</Button>
          </Link>
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default Cart;
