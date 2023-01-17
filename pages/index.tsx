import Head from "next/head";
import FrontPageHeader from "../components/FrontPageHeader";
import Footer from "../components/Footer";
import {
  Header as MantineHeader,
  AppShell,
  MediaQuery,
  Image,
  Flex,
  Title,
  Text,
  BackgroundImage,
  Space,
  Button,
} from "@mantine/core";
import Cart from "../components/cart/Cart";
import { useContext } from "react";
import { useSession } from "next-auth/react";
import { hideContext } from "../components/context/HideProvider";
import { IconCheck } from "@tabler/icons";

export default function Home() {
  const { hide, setHide } = useContext(hideContext);

  return (
    <>
      <Head>
        <title>MakeupByS</title>
        <meta name="theme-color" content="#000000"></meta>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
        <Image src="/uploads/fadetoblackbig.svg" pos={"absolute"} top={0} />
      </MediaQuery>

      <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
        <Image src="/uploads/fadeblackmobilesvg.svg" pos={"absolute"} top={0} />
      </MediaQuery>
      <BackgroundImage
        sx={(theme) => ({
          height: "80vh",
          width: "100%",
          [theme.fn.smallerThan("lg")]: {
            height: "80vh",
          },
          [theme.fn.smallerThan("md")]: {
            height: "80vh",
          },
          [theme.fn.smallerThan("sm")]: {
            height: "70vh",
          },
          [theme.fn.smallerThan("xs")]: {
            height: "90vh",
          },
        })}
        src="/uploads/hero.jpg"
      >
        <Flex
          className="asdasdaaa"
          direction={"column"}
          align={"center"}
          sx={(theme) => ({
            width: "100%",
          })}
        >
          <Flex
            className="top"
            display={"flex"}
            justify={"center"}
            align={"center"}
            sx={(theme) => ({
              zIndex: 2,
              height: "40px",
              width: "100%",

              [theme.fn.smallerThan("sm")]: {

              },
              [theme.fn.smallerThan("xs")]: {

              },
            })}
          >
            <Flex
              sx={(theme) => ({
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
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

              <Title fw={"400"} tt={"uppercase"} c={"white"} fz={"12px"}>
                <IconCheck size={12} /> 100% vegan
              </Title>
            </Flex>
          </Flex>
        </Flex>

        <Flex
        className="quizbox"
          sx={(theme) => ({
            marginTop: 200,
            gap: 100,
            width: "80%",
            justifyContent: "left",
            alignItems: "left",
            [theme.fn.smallerThan("lg")]: {
              marginTop: 190,
              width: "82%",
            },
            [theme.fn.smallerThan("md")]: {
              width: "90%",
            },
            [theme.fn.smallerThan("sm")]: {
              width: "95%",
              marginTop: 240,
              gap: 30,
            },
            [theme.fn.smallerThan("xs")]: {
              gap: 20,
              width: "100%",
              marginTop: 220,
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
            },
          })}
        >
          <MediaQuery largerThan={"xs"} styles={{display: "none"}}>
          <Title styles={{ width: "100%", paddingTop: "150px"}} color={"white"}>Make Up By Season</Title>
          </MediaQuery>
          <Flex
            sx={(theme) => ({
              width: "70%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              [theme.fn.smallerThan("xs")]: {
                width: "60%",
              },
            })}
          >
            
            <Text
              lineClamp={6}
              w={400}
              align="center"
              color={"white"}
              fz={"40px"}
              fw={"bold"}
              sx={(theme) => ({
                [theme.fn.smallerThan("lg")]: {
                  fontSize: "40px",
                },
                [theme.fn.smallerThan("sm")]: {
                  fontSize: "25px",
                },
                [theme.fn.smallerThan("xs")]: {
                  fontSize: "20px",
                },
              })}
            >
              Ta reda på vilken säsong du tillhör och få skräddarsydda produkter
              som passar just dig
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
      </BackgroundImage>
      <AppShell fixed={false} header={<FrontPageHeader />} footer={<Footer />}>
        <>
          <main style={{ marginTop: 60, minHeight: "100vh" }}>
            <h1>Startsida</h1>
          </main>
          <Cart />
        </>
      </AppShell>
    </>
  );
}
