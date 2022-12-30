import { Box, Button, Flex, Text } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import {
    IconUser,
    IconShoppingBag
} from "@tabler/icons"
import Link from "next/link";
const LoginButton = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Flex align="center">
          <Text color="black">Inloggad som {session?.user.email}</Text>
          <Button mx={10} color="black" onClick={() => signOut()}>
            Logga ut
          </Button>
        </Flex>
      </>
    );
  }
  return (
    <Flex gap={"md"} 
    justify="center"
    align="flex-end"
    direction="row"
    wrap="wrap"
    mr={40}
    >

        <Link href='/'>
            <IconUser size={36} color="white" onClick={() => signIn()} />
          </Link>

          <Link href='/'>
            <IconShoppingBag size={36} color='white'/>
        </Link>

    </Flex>
  );
};

export default LoginButton;
