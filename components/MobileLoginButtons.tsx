import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Flex, Box, ThemeIcon } from "@mantine/core";
import {
  IconUser,
  IconShoppingBag,
  IconHomeCog,
  IconCheck,
} from "@tabler/icons";
import { useHover } from "@mantine/hooks";

const MobileLoginButton = () => {
  const session = useSession();
  const { hovered, ref } = useHover();
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
            }
        })}
      >
        {session.data?.user ? (
          <Link href="/mypage">
            <Flex sx={{ height: 7}}>
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

        <Box>
          <Link href="/">
            <IconShoppingBag size={24} color="white" />
          </Link>
        </Box>
      </Flex>
    </>
  );
};

export default MobileLoginButton;
