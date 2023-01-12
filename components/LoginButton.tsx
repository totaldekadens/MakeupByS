import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Flex, Box, ThemeIcon, Text } from "@mantine/core";
import {
  IconUser,
  IconShoppingBag,
  IconHomeCog,
  IconCheck,
} from "@tabler/icons";
import { useHover, useLocalStorage } from "@mantine/hooks";
import { LineItem } from "./cart/AddToCartIcon";
import { FC, useContext, useEffect, useState } from "react";
import { openedCartContext } from "./context/OpenCartProvider";

const LoginButton: FC = () => {
  const session = useSession();
  const { hovered, ref } = useHover();
  const { openedCart, setOpenedCart } = useContext(openedCartContext);

  const [cartItems, setCartItems] = useLocalStorage<LineItem[]>({
    key: "cart",
    defaultValue: [],
  });
  const [quantity, setQuantity] = useState<number>();

  useEffect(() => {
    const updateQuantity = () => {
      if (cartItems && cartItems.length > 0) {
        const getTotalQuantity = cartItems
          .map((i) => i.quantity)
          .reduce((a, b) => a + b);

        setQuantity(getTotalQuantity);
        return;
      }
      setQuantity(0);
    };

    updateQuantity();
  }, [cartItems]);
  return (
    <>
      <Flex
        miw={250}
        gap={"md"}
        justify="flex-end"
        align="flex-end"
        direction="row"
        sx={(theme) => ({
          zIndex: 2,
          gap: session.data?.user.admin ? 10 : 16,
          [theme.fn.smallerThan("lg")]: {
            minWidth: "180px",
          },
          [theme.fn.smallerThan("sm")]: {
            minWidth: "150px",
          },
          [theme.fn.smallerThan("xs")]: {
            display: "none",
          },
        })}
      >
        {session.data?.user ? (
          <Link href="/minsida">
            <Box pos="relative">
              <Box pos={"absolute"} top={-17} left={-1} sx={{ height: 20 }}>
                <ThemeIcon color="teal" variant="light" radius="xl" size={14}>
                  <IconCheck size={8} />
                </ThemeIcon>
              </Box>
              <Box ref={ref}>
                <IconUser color={hovered ? "#CC9887" : "white"} size={36} />
              </Box>
            </Box>
          </Link>
        ) : (
          <Link href="/">
            <IconUser size={36} color="white" onClick={() => signIn()} />
          </Link>
        )}

        {session.data?.user.admin ? (
          <Link href="/admin">
            <IconHomeCog size={36} color="white" />
          </Link>
        ) : null}

        <Box pos={"relative"}>
          {quantity && quantity > 0 ? (
            <Box
              top={-14}
              left={-11}
              pos={"absolute"}
              w={23}
              h={23}
              bg="#E6FCF5"
              sx={{
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text weight={"bold"} color={"brand.3"} size={12}>
                {quantity}
              </Text>
            </Box>
          ) : null}

          <IconShoppingBag
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenedCart(!openedCart);
            }}
            size={36}
            color="white"
          />
        </Box>
      </Flex>
    </>
  );
};

export default LoginButton;
