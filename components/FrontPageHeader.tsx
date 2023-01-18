import {
  Title,
  Header as MantineHeader,
  Flex,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import Searchbar from "./Searchbar";
import MobileLoginButton from "./MobileLoginButtons";
import MobileBurgerMenu from "./MobileBurgerMenu";
import ButtonSeasonFrontPage from "./ButtonSeasonFrontPage";
import SearchMobileFrontPage from "./SearchMobileFrontpage";
import { hideContext } from "./context/HideProvider";
import { useCallback, useContext, useEffect, useState } from "react";

const FrontPageHeader = () => {
  const session = useSession();
  const { hide, setHide } = useContext(hideContext);

  return (
    <>
      <MantineHeader
        fixed={true}
        height={170}
        sx={(theme) => ({
          display: "flex",
          backgroundColor: hide ? "#090909bd" : "transparent",
          justifyContent: "space-between",
          borderBottom: "none",
          alignItems: "center",
          paddingTop: hide ? 0 : 60,
          [theme.fn.smallerThan("sm")] : {
            height: 150,
          },
          [theme.fn.smallerThan("xs")] : {
            height: 85,
            paddingTop: hide ? 0 : 60,
          }
        })}
      >
        <Flex
          className="navbarcontainer"
          direction={"column"}
          align={"center"}
          sx={(theme) => ({
            width: "100%",
            [theme.fn.smallerThan("sm")]: {
              paddingTop: hide ? 20 : 40,
            },
            [theme.fn.smallerThan("xs")]: {
              paddingTop: hide ? 10 : 0,
            },
          })}
        >

          {/* navbar */}
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

            {/* burger componenet här */}
            <MobileBurgerMenu />

            <Link href="/">
              {session.data?.user.admin ? (
                <Title
                  fw={500}
                  size="xxx-large"
                  color="white"
                  sx={(theme) => ({
                    [theme.fn.smallerThan("lg")]: {
                    },
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
                    [theme.fn.smallerThan("lg")]: {
                    },
                    [theme.fn.smallerThan("md")]: {
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
