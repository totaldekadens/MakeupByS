import {
  Title,
  Header as MantineHeader,
  Flex,
  Space,
  MediaQuery,
  BackgroundImage,
  Button,
  Text,
  Box,
  Image,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import Searchbar from "./Searchbar";
import { IconCheck } from "@tabler/icons";
import MobileLoginButton from "./MobileLoginButtons";
import MobileBurgerMenu from "./MobileBurgerMenu";
import ButtonSeasonFrontPage from "./ButtonSeasonFrontPage";
import SearchMobileFrontPage from "./SearchMobileFrontpage";
import { useCallback, useEffect, useState } from "react";
import { useWindowScroll } from "@mantine/hooks";

const FrontPageHeader = () => {
  const session = useSession();

  const [ fix, setFix ] = useState(false)

  function setFixed() {
    if(window.scrollY >= 500) {
      setFix(true)
    }else {
      setFix(false)
    }
    window.addEventListener("scroll", setFixed)
  }
  

  return (
    <>
      <MantineHeader
        fixed={false}
        height={"600px"}
        sx={(theme) => ({
          display: "flex",
          justifyContent: "space-between",
          borderBottom: "none",
          alignItems: "center",
          [theme.fn.smallerThan("xs")]: {
            height: "auto",
          },
        })}
      >
        <Image src="/uploads/fadeblacksvg.svg" pos={"absolute"} top={0}/>
        <BackgroundImage src="/uploads/hero.jpg">
          <Flex
            direction={"column"}
            align={"center"}
            sx={(theme) => ({
              position: "sticky",
              width: "100%",
              height: "650px",
              [theme.fn.smallerThan("sm")]: {
                height: "580px",
              },
              [theme.fn.smallerThan("xs")]: {
                height: "500px",
              },
            })}
          >
            <Flex
              mt={28}
              justify={"center"}
              align={"center"}
              sx={(theme) => ({
                zIndex: 2,
                width: "100%",
                [theme.fn.smallerThan("sm")]: {
                  marginTop: "0px",
                },
                [theme.fn.smallerThan("xs")]: {
                  marginTop: "5px",
                  paddingBottom: "9px",
                },
              })}
            >
              <Flex
                sx={(theme) => ({
                  zIndex: 2,
                  [theme.fn.smallerThan("xs")]: {
                    display: "none",
                  },
                })}
              >
                <Title
                  mb={15}
                  fw={"400"}
                  mr={30}
                  tt={"uppercase"}
                  c={"white"}
                  fz={"md"}
                >
                  <IconCheck size={18} /> fri frakt från sverige
                </Title>

                <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                  <Space w={"lg"} />
                </MediaQuery>

                <Title
                  fw={"400"}
                  ml={10}
                  tt={"uppercase"}
                  c={"white"}
                  fz={"md"}
                >
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
                  sx={(theme) => ({
                    [theme.fn.smallerThan("xs")]: {
                      marginRight: "0px",
                    },
                  })}
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
              className="navbar"
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
                        fontSize: "x-large",
                        paddingLeft: "70px",
                      },
                    })}
                  >
                    MakeUpByS
                  </Title>
                ) : (
                  <Title
                    size="xxx-large"
                    fw={500}
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
                        paddingLeft: "40px",
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
            {/*  */}
            <Flex
              sx={(theme) => ({
                width: "80%",
                height: "300px",
                marginRight: 100,
                gap: 100,
                justifyContent: "center",
                alignItems: "center",
                [theme.fn.smallerThan("sm")]: {
                  marginRight: 50,
                },
                [theme.fn.smallerThan("xs")]: {
                  marginTop: "40px",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  flexDirection: "column",
                  gap: 50,
                  marginRight: 0,
                  width: 350,
                },
              })}
            >
              <Flex
                sx={(theme) => ({
                  width: "50%",
                  [theme.fn.smallerThan("xs")]: {
                    width: "60%",
                  },
                })}
              >
                <Text
                  lineClamp={5}
                  color={"white"}
                  fz={"40px"}
                  fw={"bold"}
                  sx={(theme) => ({
                    [theme.fn.smallerThan("lg")]: {
                      fontSize: "30px",
                    },
                    [theme.fn.smallerThan("sm")]: {
                      fontSize: "25px",
                    },
                    [theme.fn.smallerThan("xs")]: {
                      fontSize: "20px",
                    },
                  })}
                >
                  Ta reda på vilken säsong du tillhör och få skräddarsydda
                  produkter som passar just dig
                </Text>
              </Flex>

              <Flex sx={{ alignItems: "flex-end" }}>
                <Button
                  sx={(theme) => ({
                    height: 100,
                    width: 40,
                    backgroundColor: "transparent",
                    border: "1px solid white",
                    [theme.fn.smallerThan("xs")]: {
                      height: 70,
                      width: 20,
                    },
                  })}
                >
                  GÅ TILL QUIZ
                </Button>
              </Flex>
            </Flex>
            {/*  */}
          </Flex>
        </BackgroundImage>
      </MantineHeader>
    </>
  );
};

export default FrontPageHeader;