import {
  Title,
  Header as MantineHeader,
  Flex,
  Space,
  MediaQuery,
  Text,
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
          height: hide ? 150 : 200,
          paddingTop: 10,
          [theme.fn.smallerThan("md")]: {
            height: hide ? 150 : 180,
            paddingTop: hide ? 20 : 10,
          },
          [theme.fn.smallerThan("sm")]: {
            height: hide ? 135 : 150,
            paddingTop: hide ? 25 : 10,
          },
          [theme.fn.smallerThan("xs")]: {
            height: hide ? "75px" : "85px",
            alignItems: hide ? "center" : "flex-start",
            paddingTop: hide ? 0 : 10,
          },
        })}
      >
        <Flex direction={"column"} align={"center"} sx={{ width: "100%" }}>
          <Flex
            justify={"space-around"}
            align={"center"}
            sx={(theme) => ({
              display: hide ? "none" : "flex",
              width: "100%",
              [theme.fn.smallerThan("xs")]: {},
            })}
          >
            <Flex
              gap={20}
              justify={"center"}
              align="center"
              sx={(theme) => ({ width: "100%" })}
            >
              <Flex align={"center"} gap={5}>
                <IconCheck color="white" size={18} />
                <Text
                  fw={"400"}
                  tt={"uppercase"}
                  c={"white"}
                  fz={"md"}
                  sx={(theme) => ({
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: 14,
                    },
                    [theme.fn.smallerThan("xs")]: {
                      fontSize: 11,
                    },
                  })}
                >
                  fri frakt från sverige
                </Text>
              </Flex>

              <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                <Space w={"lg"} />
              </MediaQuery>
              <Flex align={"center"} gap={5}>
                <IconCheck color="white" size={18} />
                <Text
                  fw={"400"}
                  tt={"uppercase"}
                  c={"white"}
                  fz={"md"}
                  sx={(theme) => ({
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: 14,
                    },
                    [theme.fn.smallerThan("xs")]: {
                      fontSize: 11,
                    },
                  })}
                >
                  100% vegan
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex
            pt={22}
            justify={"space-between"}
            align="flex-end"
            sx={(theme) => ({
              width: "100%",
              paddingTop: hide ? 0 : 22,
              [theme.fn.smallerThan("md")]: {
                paddingTop: hide ? 0 : 10,
              },
              [theme.fn.smallerThan("xs")]: {
                alignItems: "center",
                paddingTop: hide ? 0 : 15,
              },
            })}
          >
            <Searchbar />

            {/* burger componenet här */}
            <MobileBurgerMenu />

            <Link href="/">
              <Title
                fw={500}
                size={48}
                color="white"
                sx={(theme) => ({
                  [theme.fn.smallerThan("md")]: {
                    fontSize: 43,
                  },
                  [theme.fn.smallerThan("sm")]: {
                    fontSize: 35,
                  },
                  [theme.fn.smallerThan("xs")]: {
                    fontSize: "x-large",
                  },
                })}
              >
                MakeUpByS
              </Title>
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
