import {
  Box,
  Title,
  Header as MantineHeader,
  Flex,
  Paper,
  Space,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import ButtonSeason from "./ButtonSeason";
import { IconCheck } from "@tabler/icons";
import { toUpperCase } from "uri-js/dist/esnext/util";

const Header = () => {
  const session = useSession();
  return (
    <MantineHeader
      fixed={false}
      height={200}
      sx={(theme) => ({
        backgroundColor: theme.colors.brand[2],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      })}
    >
      <Flex direction={"column"} align={"center"} sx={{ width: "100%" }}>
        <Flex justify={"center"} align={"center"} sx={{ width: "100%" }}>
          <Title tt={"uppercase"} c={"white"} fz={"md"}>
            <IconCheck /> fri frakt från sverige
          </Title>
          <Space w={"md"} />
          <Title tt={"uppercase"} c={"white"} fz={"md"}>
            <IconCheck /> 100% vegan
          </Title>
        </Flex>

        <Flex justify={"space-between"} sx={{ width: "100%" }}>
          <Box>Sök...</Box>

          <Link href="/">
            <Title size="xxx-large" ml={10} order={2} color="white">
              MakeUpByS
            </Title>
          </Link>
          <Box>
            <LoginButton />
          </Box>
        </Flex>

        <Flex>
          <ButtonSeason />
        </Flex>
      </Flex>

      <Flex gap={10}>
        {session.data?.user ? <Link href="/mypage">Mina sidor</Link> : null}
        {session.data?.user.admin ? <Link href="/admin">Admin</Link> : null}
      </Flex>
    </MantineHeader>
  );
};

export default Header;
