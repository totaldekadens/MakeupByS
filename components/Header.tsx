import {
  Title,
  Header as MantineHeader,
  Flex,
  Space,
  MediaQuery,
  Text,
  Box,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import Searchbar from "./Searchbar";
import ButtonSeason from "./ButtonSeason";
import { IconCheck } from "@tabler/icons";
import SearchbarMobile from "./SearchbarMobile";
import MobileLoginButton from "./MobileLoginButtons";
import MobileBurgerMenu from "./MobileBurgerMenu";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const session = useSession();
  const [scrollY, setScrollY] = useState<number>(0);
  const [hide, setHide] = useState<boolean>(false);

  // Refs
  const valueRef = useRef<any | null>();
  valueRef.current = scrollY;

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const handleScroll = () => {
    setScrollY(window.scrollY);
    let previousScrollY = valueRef.current;

    if (previousScrollY < window.scrollY) {
      setHide(true);
    } else {
      setHide(false);
    }
  };

  return (
    <>
      <MantineHeader
        fixed={true}
        height={200}
        px={20}
        sx={(theme) => ({
          backgroundColor: theme.colors.brand[2],
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "none",
          alignItems: "center",
          height: hide ? 160 : 200,
          [theme.fn.smallerThan("sm")]: {
            paddingTop: hide ? 10 : "unset",
            height: hide ? 140 : 170,
          },
          [theme.fn.smallerThan("xs")]: {
            height: hide ? "75px" : "85px",
          },
        })}
      >
        <Flex direction={"column"} align={"center"} sx={{ width: "100%" }}>
          <Flex
            justify={"center"}
            align={"center"}
            sx={(theme) => ({
              display: hide ? "none" : "flex",
              width: "100%",
              [theme.fn.smallerThan("xs")]: {},
            })}
          >
            <Flex
              align={"center"}
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  display: "none",
                },
              })}
            >
              <Flex>
                <IconCheck color="white" size={18} />
                <Text
                  ml={5}
                  fw={"400"}
                  mr={30}
                  tt={"uppercase"}
                  c={"white"}
                  fz={"md"}
                  sx={(theme) => ({
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: 14,
                    },
                  })}
                >
                  fri frakt från sverige
                </Text>
              </Flex>

              <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                <Space w={"lg"} />
              </MediaQuery>
              <Flex>
                <IconCheck color="white" size={18} />
                <Text
                  ml={5}
                  fw={"400"}
                  mr={30}
                  tt={"uppercase"}
                  c={"white"}
                  fz={"md"}
                  sx={(theme) => ({
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: 14,
                    },
                  })}
                >
                  100% vegan
                </Text>
              </Flex>
            </Flex>

            <Flex
              sx={(theme) => ({
                alignItems: "center",
                justifyContent: "space-around",
                [theme.fn.largerThan("xs")]: {
                  display: "none",
                },
              })}
            >
              <Flex align={"center"}>
                <IconCheck color="white" size={12} />
                <Text
                  ml={10}
                  mr={30}
                  tt={"uppercase"}
                  color={"white"}
                  size={11}
                >
                  fri frakt från sverige
                </Text>
              </Flex>

              <Space w={"lg"} />
              <Flex align={"center"}>
                <IconCheck color="white" size={12} />
                <Text ml={10} tt={"uppercase"} c={"white"} size={11}>
                  100% vegan
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            pt={20}
            justify={"space-between"}
            align="flex-end"
            sx={(theme) => ({
              width: "100%",
              paddingTop: hide ? 0 : 20,
              [theme.fn.smallerThan("xs")]: {
                paddingTop: hide ? 0 : 10,
              },
            })}
          >
            <Searchbar />

            {/* burger componenet här */}
            <MobileBurgerMenu />

            <Link href="/">
              {session.data?.user ? (
                <Title
                  fw={500}
                  size="xxx-large"
                  color="white"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("lg")]: {},
                    [theme.fn.smallerThan("md")]: {},
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: "xx-large",
                    },
                    [theme.fn.smallerThan("xs")]: {},
                  })}
                >
                  MakeUpByS
                </Title>
              ) : (
                <Title
                  fw={500}
                  size="xxx-large"
                  color="white"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("lg")]: {},
                    [theme.fn.smallerThan("md")]: {},
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: "xx-large",
                    },
                    [theme.fn.smallerThan("xs")]: {
                      paddingTop: hide ? 0 : 7,
                      fontSize: "x-large",
                    },
                  })}
                >
                  MakeUpByS
                </Title>
              )}
            </Link>
            <LoginButton />
            <MobileLoginButton />
          </Flex>
          <Flex>
            <ButtonSeason />
          </Flex>
        </Flex>
      </MantineHeader>

      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <Flex
          mt={85}
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
