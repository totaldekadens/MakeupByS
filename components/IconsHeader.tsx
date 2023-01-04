import { Box, Button, Flex, Text } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import { IconUser, IconShoppingBag } from "@tabler/icons";
import Link from "next/link";

// Temporary component.
const IconsHeader = () => {
  return (
    <Flex
      gap={"md"}
      justify="center"
      align="center"
      direction="row"
      mr={40}
      sx={(theme) => ({
        [theme.fn.smallerThan("sm")]: {
          marginRight: 10,
          gap: 0,
        },
      })}
    >
      <Link href="/">
        <IconUser size={36} color="white" onClick={() => signIn()} />
      </Link>
      <Link href="/">
        <IconShoppingBag size={36} color="white" />
      </Link>
    </Flex>
  );
};

export default IconsHeader;
