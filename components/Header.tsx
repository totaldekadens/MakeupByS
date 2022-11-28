import { Box, Title, Header as MantineHeader, Flex } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";

const Header = () => {
  const session = useSession();
  return (
    <MantineHeader
      fixed={true}
      height={60}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link href="/">
        <Title ml={10} order={2} color="black">
          Home
        </Title>
      </Link>
      <Flex gap={10}>
        {session.data?.user ? <Link href="/mypage">Mina sidor</Link> : null}
        {session.data?.user.admin ? <Link href="/admin">Admin</Link> : null}
      </Flex>
      <LoginButton />
    </MantineHeader>
  );
};

export default Header;
