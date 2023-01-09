import { useSession } from "next-auth/react";
import Link from "next/link";
import { Flex, Box, ThemeIcon, Text } from "@mantine/core";
import { IconUser, IconHomeCog, IconCheck } from "@tabler/icons";
import { useHover, useLocalStorage } from "@mantine/hooks";
import { LineItem } from "./AddToCartIcon";
import { FC, useEffect, useState } from "react";
import { createStyles } from "@mantine/core";

const IconsCheckout: FC = () => {
  // States
  const [quantity, setQuantity] = useState<number>();

  // Local storage
  const [cartItems, setCartItems] = useLocalStorage<LineItem[]>({
    key: "cart",
    defaultValue: [],
  });

  // Session
  const session = useSession();

  // Styles to non mantine component
  const { classes } = useStyles();

  // Hover function from mantine
  const { hovered, ref } = useHover();

  // Sets total quantity of cart items in cart
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
        w={100}
        gap={"md"}
        justify="flex-end"
        align="flex-end"
        direction="row"
        sx={(theme) => ({
          [theme.fn.smallerThan("xs")]: {
            width: 70,
            gap: 10,
          },
        })}
      >
        {session.data?.user ? (
          <Link href="/mypage">
            <Flex
              sx={(theme) => ({
                height: 12,
                [theme.fn.smallerThan("xs")]: {
                  height: "7px",
                },
              })}
            >
              <ThemeIcon
                color="teal"
                variant="light"
                radius="xl"
                size={14}
                sx={(theme) => ({
                  [theme.fn.smallerThan("xs")]: {
                    minWidth: "8px",
                    minHeight: "8px",
                    width: "8px",
                    height: "8px",
                  },
                })}
              >
                <IconCheck size={8} className={classes.iconCheck} />
              </ThemeIcon>
            </Flex>
            <Box ref={ref}>
              <IconUser
                color={hovered ? "#CC9887" : "white"}
                size={36}
                className={classes.icons}
              />
            </Box>
          </Link>
        ) : (
          <Link
            href="/mypage"
            style={{ display: "flex", alignItems: "center" }}
          >
            <IconUser size={36} color="white" className={classes.icons} />
          </Link>
        )}

        {session.data?.user.admin ? (
          <Link href="/admin">
            <IconHomeCog size={36} color="white" className={classes.icons} />
          </Link>
        ) : null}
      </Flex>
    </>
  );
};

const useStyles = createStyles((theme, _params, getRef) => ({
  icons: {
    [theme.fn.smallerThan("xs")]: {
      width: "26px",
      height: "26px",
    },
  },
  iconCheck: {
    [theme.fn.smallerThan("xs")]: {
      width: "6px",
      height: "6px",
    },
  },
  iconTheme: {
    [theme.fn.smallerThan("xs")]: {
      width: "8px",
      height: "8px",
    },
  },
}));

export default IconsCheckout;
