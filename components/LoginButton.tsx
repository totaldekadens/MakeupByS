import { Button, Flex, Text } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
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
    <Flex align="center">
      <Text color="black">Inte inloggad</Text>
      <Button mx={10} color="black" onClick={() => signIn()}>
        Logga in
      </Button>
    </Flex>
  );
};

export default LoginButton;
