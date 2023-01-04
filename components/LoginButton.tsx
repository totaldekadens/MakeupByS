import { Button, Flex, Text } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import { IconUser, IconShoppingBag } from "@tabler/icons";
import Link from "next/link";
import { Flex, Box, ThemeIcon } from "@mantine/core";
import {
  IconUser,
  IconShoppingBag,
  IconHomeCog,
  IconCheck,
} from "@tabler/icons";
import { useHover } from "@mantine/hooks";

const LoginButton = () => {
  const session = useSession();
  const { hovered, ref } = useHover();
  return (
    <>
      <Flex
        miw={250}
        gap={"md"}
        justify="center"
        align="flex-end"
        direction="row"
        sx={(theme) => ({
          [theme.fn.smallerThan("lg")]: {
            minWidth: "180px",
          },
          [theme.fn.smallerThan("xs")]: {
            display: "none",
          },
        })}
      >
        {session.data?.user ? (
          <Link href="/mypage">
            <Box sx={{ height: 20 }}>
              <ThemeIcon color="teal" variant="light" radius="xl" size={14}>
                <IconCheck size={8} />
              </ThemeIcon>
            </Box>
            <Box ref={ref}>
              <IconUser color={hovered ? "#CC9887" : "white"} size={36} />
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

        <Box>
          <Link href="/">
            <IconShoppingBag size={36} color="white" />
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default LoginButton;
