import { Title, Header as MantineHeader, Flex } from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import Searchbar from "./Searchbar";
import MobileLoginButton from "./MobileLoginButtons";
import MobileBurgerMenu from "./MobileBurgerMenu";
import ButtonSeasonFrontPage from "./ButtonSeasonFrontPage";
import SearchMobileFrontPage from "./SearchMobileFrontpage";
import { hideContext } from "./context/HideProvider";
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
        height={170}
        sx={(theme) => ({
          display: "flex",
          backgroundColor: bg ? "#090909bd" : "transparent",
          justifyContent: "space-between",
          borderBottom: "none",
          alignItems: "center",
          paddingTop: bg ? 0 : 60,
          transition: "padding 0.6s",
          [theme.fn.smallerThan("sm")]: {
            height: 150,
            transition: "height 1s",
          },
          [theme.fn.smallerThan("xs")]: {
            paddingTop: bg ? 0 : 60,
            height: bg ? 80 : 0,
            transition: "height 0.6s, padding 0.6",
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
            [theme.fn.smallerThan("sm")]: {
              paddingTop: hide ? 0 : 40,
            },
            [theme.fn.smallerThan("xs")]: {
              paddingTop: hide ? 0 : 15,
            },
          })}
        >
          <Flex
            justify={"space-between"}
            px={15}
            sx={(theme) => ({
              transition: "height 1s",
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
                <Title
                  fw={500}
                  size="xxx-large"
                  color="white"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("lg")]: {},
                    [theme.fn.smallerThan("md")]: {
                      paddingRight: "10px",
                    },
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: "xx-large",
                    },
                    [theme.fn.smallerThan("xs")]: {
                      fontSize: "x-large",
                    },
                  })}
                >
                  MakeUpByS
                </Title>
              ) : (
                <Title
                  size="xxx-large"
                  fw={500}
                  color="white"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("lg")]: {},
                    [theme.fn.smallerThan("md")]: {},
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: "xx-large",
                    },
                    [theme.fn.smallerThan("xs")]: {
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

          <SearchMobileFrontPage />

          <Flex>
            <ButtonSeasonFrontPage />
          </Flex>

          {/* navv */}
        </Flex>
      </MantineHeader>
    </>
  );
};

export default FrontPageHeader;
