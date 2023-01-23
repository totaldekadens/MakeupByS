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
import { useContext } from "react";
import { hideContext } from "./context/HideProvider";

const Header = () => {
  const session = useSession();
  const { hide, setHide } = useContext(hideContext);

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
          transition: "height 1.3s",
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
            transition: "height 0.6s",
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
              transition: "height 1.3s",
              height: hide ? 0 : 24.8,
              opacity: hide ? 0 : 1,
              width: "100%",
              [theme.fn.smallerThan("sm")]: { height: hide ? 0 : 21.7 },
              [theme.fn.smallerThan("xs")]: { transition: "height 0.6s" },
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
                  fri frakt inom sverige
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
              transition: "padding 0.3s",
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
                    fontSize: 24,
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
          pos={"fixed"}
          right={0}
          left={0}
          top={hide ? 75 : 85}
          sx={(theme) => ({
            zIndex: 100,
            backgroundColor: theme.colors.brand[2],
            transition: "height 0.6s",
            height: hide ? 0 : 36,
            opacity: hide ? 0 : 1,
          })}
        >
          <SearchbarMobile />
        </Flex>
      </MediaQuery>
    </>
  );
};

export default Header;
