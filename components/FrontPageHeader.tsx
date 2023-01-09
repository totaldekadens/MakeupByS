import {
  Title,
  Header as MantineHeader,
  Flex,
  Space,
  MediaQuery,
  BackgroundImage,
  Box,
  Button,
  Text,
  Center,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import LoginButton from "./LoginButton";
import Searchbar from "./Searchbar";
import { IconCheck } from "@tabler/icons";
import SearchbarMobile from "./SearchbarMobile";
import MobileLoginButton from "./MobileLoginButtons";
import MobileBurgerMenu from "./MobileBurgerMenu";
import ButtonSeasonFrontPage from "./ButtonSeasonFrontPage";
import { object } from "yup";

const FrontPageHeader = () => {
  const session = useSession();

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
        <BackgroundImage src="https://i.ibb.co/wd8Zk9f/hero.jpg">
          <Flex
            className="aaaaa"
            direction={"column"}
            align={"center"}
            sx={(theme) => ({
              width: "100%",
              height: "650px",
              [theme.fn.smallerThan("xs")]: {
                height: "300px",
              },
            })}
          >
            <Flex
              mt={25}
              justify={"center"}
              align={"center"}
              sx={(theme) => ({
                width: "100%",
                [theme.fn.smallerThan("xs")]: {
                  alignContent: "flex-start",
                  marginTop: "10px",
                  marginBottom: "10px",
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
              px={15}
              sx={(theme) => ({
                width: "100%",
                [theme.fn.smallerThan("xs")]: {
                  alignItems: "flex-end"
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
                        paddingLeft: "5px",
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
              <ButtonSeasonFrontPage />
            </Flex>
            {/*  */}
            <Flex
              sx={(theme) => ({
                width: "90%",
                height: "300px",
                gap: 100,
                justifyContent: "center",
                alignItems: "flex-end",
                [theme.fn.smallerThan("xs")]: {
                  height: "150px",
                },
              })}
            >
              <Flex sx={(theme) => ({ width: "50%",
              [theme.fn.smallerThan("xs")]: {
                    width: "60%",
                  }, })}>

                <Text lineClamp={3} color={"white"} fz={"50px"} fw={"bold"}sx={(theme)=> ({
                   [theme.fn.smallerThan("xs")]: {
                    fontSize: "30px",
                  },
                })}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Nostrum dicta dolorem aut voluptate.
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

export default FrontPageHeader;
