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
import { LineItem } from "./AddToCartIcon";
import { FC, useContext, useEffect, useState } from "react";
import { openedCartContext } from "./context/OpenCartProvider";

const MobileLoginButton: FC = () => {
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
      if (cartItems.length > 0) {
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
        gap={"xs"}
        justify="center"
        align="flex-end"
        pr={"10px"}
        sx={(theme) => ({
          [theme.fn.largerThan("xs")]: {
            display: "none",
          },
        })}
      >
        {session.data?.user ? (
          <Link href="/mypage">
            <Flex sx={{ height: 7 }}>
              <ThemeIcon color="teal" variant="light" radius="xl" size={8}>
                <IconCheck size={6} />
              </ThemeIcon>
            </Flex>
            <Box ref={ref}>
              <IconUser color={hovered ? "#CC9887" : "white"} size={24} />
            </Box>
          </Link>
        ) : (
          <Link href="/">
            <IconUser size={24} color="white" onClick={() => signIn()} />
          </Link>
        )}

        {session.data?.user.admin ? (
          <Link href="/admin">
            <IconHomeCog size={24} color="white" />
          </Link>
        ) : null}

        <Box pos={"relative"}>
          {quantity && quantity > 0 ? (
            <Box
              top={-11}
              left={-9}
              pos={"absolute"}
              w={16}
              h={16}
              bg="#E6FCF5"
              sx={{
                borderRadius: "50px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text weight={"bold"} color={"brand.3"} size={9}>
                {quantity}
              </Text>
            </Box>
          ) : null}
          <IconShoppingBag
            style={{ cursor: "pointer" }}
            onClick={() => setOpenedCart(true)}
            size={24}
            color="white"
          />
        </Box>
      </Flex>
    </>
  );
};

export default MobileLoginButton;