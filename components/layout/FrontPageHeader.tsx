import { Title, Header as MantineHeader, Flex, Text } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "../buttons/LoginButton";
import Searchbar from "../search/Searchbar";
import MobileLoginButton from "../buttons/MobileLoginButtons";
import MobileBurgerMenu from "../buttons/MobileBurgerMenu";
import ButtonSeasonFrontPage from "../buttons/ButtonSeasonFrontPage";
import SearchMobileFrontPage from "../search/SearchMobileFrontpage";
import { hideContext } from "../context/HideProvider";
import React, { useContext, useEffect, useState } from "react";

const FrontPageHeader = () => {
  const session = useSession();
  const { hide, setHide } = useContext(hideContext);

  const [scrollY, setScrollY] = useState<number>(0);
  const [bg, setBg] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  const handleScroll = () => {
    setScrollY(window.scrollY);

    if (window.scrollY > 1) {
      setBg(true);
      return;
    } else {
      setBg(false);
    }
  };

  return (
    <>
      <MantineHeader
        fixed={true}
        height={150}
        sx={(theme) => ({
          display: "flex",
          backgroundColor: bg ? "#090909bd" : "transparent",
          justifyContent: "space-between",
          borderBottom: "none",
          alignItems: "center",
          paddingTop: bg ? 20 : 90,
          transition: "padding 0.6s",
          zIndex: 10000,
          [theme.fn.smallerThan("sm")]: {
            height: 150,
            transition: "padding 0.6s",
          },
          [theme.fn.smallerThan("sm")]: {
            paddingTop: bg ? 35 : 80,
            transition: "padding 0.6s",
            },
          [theme.fn.smallerThan("xs")]: {
            paddingTop: bg ? 0 : 60,
            height: bg && !hide ? 94 : 80,
            transition: "padding 0.6",
          },
        })}
      >
        <Flex
          className="navbarcontainer"
          direction={"column"}
          align={"center"}
          sx={(theme) => ({
            width: "100%",
            transition: "padding 1s",
            [theme.fn.smallerThan("xs")]: {
              paddingTop: hide ? 0 : 15,
              transition: "padding 0.6s",
            },
            [theme.fn.smallerThan("md")]: {
              paddingTop: bg ? 5 : 15,
              transition: "padding 0.6s",
              },
          })}
        >
          <Flex
            justify={"space-between"}
            px={15}
            sx={(theme) => ({
              zIndex: 2,
              width: "100%",
              [theme.fn.smallerThan("xs")]: {
                alignItems: "flex-end",
              },
            })}
          >
            <Searchbar />
            <MobileBurgerMenu />

            <Link href="/">
              {session.data?.user.admin ? (
                <Text
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
                </Text>
              ) : (
                <Text
                  size={48}
                  fw={500}
                  color="white"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: 35,
                    },
                    [theme.fn.smallerThan("xs")]: {
                      fontSize: 24,
                    },
                  })}
                >
                  MakeUpByS
                </Text>
              )}
            </Link>
            <LoginButton />
            <MobileLoginButton />
          </Flex>

          <SearchMobileFrontPage />

          <Flex>
            <ButtonSeasonFrontPage />
          </Flex>
        </Flex>
      </MantineHeader>
    </>
  );
};

export default FrontPageHeader;
