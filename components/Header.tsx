import {
  Title,
  Header as MantineHeader,
  Flex,
  Space,
  MediaQuery,
  Burger,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import Searchbar from "./Searchbar";
import ButtonSeason from "./ButtonSeason";
import { IconCheck } from "@tabler/icons";
import { useState } from "react";
import SearchbarMobile from "./SearchbarMobile";

const Header = () => {
  const session = useSession();
  const [opened, setOpened] = useState(false);
  return (
    <>
      <MantineHeader
        fixed={false}
        height={220}
        px={100}
        sx={(theme) => ({
          backgroundColor: theme.colors.brand[2],
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          [theme.fn.smallerThan("lg")]: {
            paddingLeft: "30px",
            paddingRight: "30px",
          },
          [theme.fn.smallerThan("xs")]: {
            height: "150px",
          },
        })}
      >
        <Flex direction={"column"} align={"center"} sx={{ width: "100%" }}>
          <Flex
            mt={10}
            justify={"center"}
            align={"center"}
            sx={(theme) => ({
              width: "100%",
              [theme.fn.smallerThan("xs")]: {
                alignContent: "flex-start",
                top: "0px",
                position: "absolute",
              },
            })}
          >
            <Flex
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  display: "none",
                },
              })}
            >
              <Title fw={"400"} mr={30} tt={"uppercase"} c={"white"} fz={"md"}>
                <IconCheck size={18} /> fri frakt från sverige
              </Title>

              <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                <Space w={"lg"} />
              </MediaQuery>

              <Title fw={"400"} ml={10} tt={"uppercase"} c={"white"} fz={"md"}>
                <IconCheck size={18} /> 100% vegan
              </Title>
            </Flex>

            <Flex
              sx={(theme) => ({
                [theme.fn.largerThan("xs")]: {
                  display: "none",
                },
              })}
            >
              <Title
                fw={"400"}
                mr={30}
                tt={"uppercase"}
                c={"white"}
                fz={"12px"}
              >
                <IconCheck size={12} /> fri frakt från sverige
              </Title>

              <Space w={"lg"} />

              <Title
                fw={"400"}
                ml={10}
                tt={"uppercase"}
                c={"white"}
                fz={"12px"}
              >
                <IconCheck size={12} /> 100% vegan
              </Title>
            </Flex>
          </Flex>

          <Flex
            justify={"space-between"}
            sx={(theme) => ({
              width: "100%",
              [theme.fn.smallerThan("xs")]: {
                justifyContent: "center",
                position: "absolute",
                top: "60px",
              },
            })}
          >
            <Searchbar />

            <Link href="/">
              {session.data?.user ? (
                <Title
                  size="xxx-large"
                  pt={25}
                  color="white"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("lg")]: {
                      paddingRight: "70px",
                    },
                    [theme.fn.smallerThan("md")]: {
                      paddingRight: "10px",
                    },
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: "xx-large",
                      paddingRight: "0px",
                      paddingLeft: "20px",
                    },
                    [theme.fn.smallerThan("xs")]: {
                      paddingTop: "5px",
                    },
                  })}
                >
                  MakeUpByS
                </Title>
              ) : (
                <Title
                  size="xxx-large"
                  pt={20}
                  color="white"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("lg")]: {
                      paddingRight: "70px",
                    },
                    [theme.fn.smallerThan("md")]: {
                      paddingRight: "10px",
                    },
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: "xx-large",
                      paddingRight: "0px",
                      paddingLeft: "20px",
                    },
                    [theme.fn.smallerThan("xs")]: {
                      paddingTop: "5px",
                    },
                  })}
                >
                  MakeUpByS
                </Title>
              )}
            </Link>
            <LoginButton />
          </Flex>
          <Flex>
            <ButtonSeason />
          </Flex>
        </Flex>

        <MediaQuery largerThan="xs" styles={{ display: "none" }}>
          <Flex sx={{ paddingRight: "20px" }}>
            <Burger
              pos="absolute"
              color="white"
              size={"sm"}
              opened={opened}
              onClick={() => setOpened((o: boolean) => !o)}
            />
          </Flex>
        </MediaQuery>
      </MantineHeader>

      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <Flex
          sx={(theme) => ({
            backgroundColor: theme.colors.brand[2],
          })}
        >
          <SearchbarMobile />
        </Flex>
      </MediaQuery>
    </>
  );
};

export default Header;
