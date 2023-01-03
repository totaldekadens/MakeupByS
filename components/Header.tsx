
import {
  Box,
  Title,
  Header as MantineHeader,
  Flex,
  Paper,
  Space,
  Input,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import Searchbar from "./Searchbar";
import ButtonSeason from "./ButtonSeason";
import { IconCheck } from "@tabler/icons";

const Header = () => {
  const session = useSession();
  return (
    <MantineHeader
      fixed={false}
      height={220}
      sx={(theme) => ({
        backgroundColor: theme.colors.brand[2],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      })}
    >
      <Flex direction={"column"} align={"center"} sx={{ width: "100%" }}>
        <Flex
          mt={10}
          justify={"center"}
          align={"center"}
          sx={{ width: "100%" }}
        >
          <Title fw={"400"} mr={30} tt={"uppercase"} c={"white"} fz={"md"}>
            <IconCheck size={18} /> fri frakt från sverige
          </Title>

          <Space w={"lg"} />

          <Title fw={"400"} ml={30} tt={"uppercase"} c={"white"} fz={"md"}>
            <IconCheck size={18} /> 100% vegan
          </Title>
        </Flex>

        <Flex justify={"space-between"} sx={{ width: "100%" }}>

          <Searchbar />

              <Link href="/">
                <Title size='xxx-large' mr={200} pt={20} color="white">
                  MakeUpByS
                </Title>
              </Link>              
                <LoginButton />
            </Flex>

            <Flex>
                <ButtonSeason/>
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
