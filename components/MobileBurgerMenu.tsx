import { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import {
  Box,
  Burger,
  Button,
  Drawer,
  Flex,
  Grid,
  MediaQuery,
  Space,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconUser, IconCheck, IconHomeCog, IconSquareRoundedArrowRight } from "@tabler/icons";
import { useHover } from "@mantine/hooks";

const MobileBurgerMenu = () => {
    
    const [opened, setOpened] = useState(false);
    const session = useSession();
    const { hovered, ref } = useHover();


  return (
    <>
      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <Flex>
          <Burger
            left={"20px"}
            top={"10px"}
            pos="absolute"
            color="white"
            size={"sm"}
            opened={opened}
            onClick={() => setOpened(true)}
          />
        </Flex>
      </MediaQuery>

      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        size="md"
        overlayOpacity={0.4}
        overlayBlur={1}
        transition="rotate-left"
        transitionDuration={200}
        transitionTimingFunction="ease"
        styles={{
          drawer: {
            background: "#E5B4AD",
          },
        }}
        sx={(theme) => ({ color: theme.colors.brand[2] })}
      >
        <Flex
          sx={(theme) => ({
            height: "140px",
            backgroundColor: theme.colors.brand[1],
            width: "100%",
            justifyContent: "space-between",
            marginBottom: "20px",
            padding: "20px",
          })}
        >
          <Flex styles={{ height: "70px" }}>
            {session.data?.user ? (
              <Link href="/mypage">
                <Box sx={{ height: 70 }}>
                  <ThemeIcon color="teal" variant="light" radius="xl" size={14}>
                    <IconCheck size={8} />
                  </ThemeIcon>
                  <Box ref={ref}>
                    <IconUser color={hovered ? "#CC9887" : "white"} size={36}/>
                    <Title sx={{
                        color: "white",
                        fontSize: "12px"
                    }}>{session.data?.user.name.replace(/ .*/,'')}</Title>
                  </Box>
                </Box>
              </Link>
            ) : (
                <Flex>
                    <Link href="/">
                        <IconUser size={36} color="white" onClick={() => signIn()} />
                    </Link>
                </Flex>
            )}
          </Flex>
          <Flex>
            {session.data?.user.admin ? (
              <Link href="/admin">
                <IconHomeCog size={36} color="white" />
              </Link>
            ) : null}
          </Flex>
          <Flex>
            {session.data?.user.admin ? (
              <Link href="/admin">
                <IconHomeCog size={36} color="white" />
              </Link>
            ) : null}
          </Flex>
        </Flex>
        <Box onClick={() => setOpened(false)} sx={{ paddingLeft: "26px", marginBottom: "20px" }}>
            <Link href={"/mypage"}>
                <Title h={"30px"} color={"white"} size={"lg"}>Mina sidor</Title>         
                <Box>
                    <IconSquareRoundedArrowRight color="white" />
                </Box>       
            </Link>
        </Box>
        <Flex
          className="aa"
          sx={(theme) => ({
            width: "100%",
            height: "100px",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginBottom: "40px",
          })}
        >
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            href={`/season/var`}
          >
            <Button
              onClick={() => setOpened(false)}
              sx={(theme) => ({
                backgroundColor: theme.colors.brand[9],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0],
              })}
            >
              vår
            </Button>
          </Link>

          <Link
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            href={`/season/sommar`}
          >
            <Button
              onClick={() => setOpened(false)}
              sx={(theme) => ({
                backgroundColor: theme.colors.brand[9],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0],
              })}
            >
              sommar
            </Button>
          </Link>

          <Link
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            href={`/season/host`}
          >
            <Button
              onClick={() => setOpened(false)}
              sx={(theme) => ({
                backgroundColor: theme.colors.brand[9],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0],
              })}
            >
              höst
            </Button>
          </Link>

          <Link
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            href={`/season/vinter`}
          >
            <Button
              onClick={() => setOpened(false)}
              sx={(theme) => ({
                backgroundColor: theme.colors.brand[9],
                borderColor: theme.colors.brand[0],
                color: theme.colors.brand[0],
              })}
            >
              vinter
            </Button>
          </Link>
        </Flex>
        <Box sx={{ paddingLeft: "26px" }}>
          <Title size={"lg"}>Kategorier</Title>

          <Space h="lg"></Space>
          <Title size={"lg"}>Kategorier</Title>

          <Space h="lg"></Space>
          <Title size={"lg"}>Kategorier</Title>

          <Space h="lg"></Space>
              
          <Title size={"lg"}>Kategorier</Title>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileBurgerMenu;


