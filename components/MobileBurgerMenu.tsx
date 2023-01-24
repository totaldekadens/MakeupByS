import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import {
  Box,
  Burger,
  Button,
  Drawer,
  Flex,
  MediaQuery,
  Space,
  ThemeIcon,
  Text,
} from "@mantine/core";
import {
  IconUser,
  IconCheck,
  IconHomeCog,
  IconSquareRoundedArrowRight,
  IconBrandAppleArcade,
  IconShoppingBag,
} from "@tabler/icons";
import { useHover, useLocalStorage } from "@mantine/hooks";
import { LineItem } from "./cart/AddToCartIcon";
import { FC, useContext, useEffect, useState } from "react";
import { openedCartContext } from "./context/OpenCartProvider";
import Quiz from "./quiz/Quiz";

const MobileBurgerMenu: FC = () => {
  const [opened, setOpened] = useState(false);
  const session = useSession();
  const { hovered, ref } = useHover();
  const { openedCart, setOpenedCart } = useContext(openedCartContext);
  const [cartItems, setCartItems] = useLocalStorage<LineItem[]>({
    key: "cart",
    defaultValue: [],
  });
  const [quantity, setQuantity] = useState<number>();
  const [openedQuiz, setOpenedQuiz] = useState(false);
  useEffect(() => {
    const updateQuantity = () => {
      if (cartItems.length > 0) {
        const getTotalQuantity = cartItems
          .map((i) => i.quantity)
          .reduce((a, b) => a + b);

        setQuantity(getTotalQuantity);
        return;
      }
      setQuantity(0);
    };

    updateQuantity();
  }, [cartItems]);

  return (
    <>
      <MediaQuery largerThan="xs" styles={{ display: "none" }}>
        <Flex
          sx={{
            alignItems: "center",
            width: 58,
          }}
        >
          <Burger
            left={"20px"}
            color="white"
            size={"sm"}
            opened={opened}
            onClick={() => setOpened(true)}
          />
        </Flex>
      </MediaQuery>

      <Drawer
        zIndex={120000}
        opened={opened}
        onClose={() => setOpened(false)}
        size="md"
        overlayOpacity={0.4}
        overlayBlur={1}
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
            height: "120px",
            backgroundColor: theme.colors.brand[1],
            width: "100%",
            justifyContent: "space-evenly",
            gap: "20px",
            marginBottom: "20px",
          })}
        >
          <Flex
            align={"center"}
            sx={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {session.data?.user ? (
              <Link
                href="/minsida"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  sx={{
                    height: 70,
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/*  <ThemeIcon
                    pos={"absolute"}
                    top={-8}
                    left={5}
                    color="teal"
                    variant="light"
                    radius="xl"
                    size={14}
                  >
                    <IconCheck size={8} />
                  </ThemeIcon> */}
                  <Box
                    ref={ref}
                    h={70}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <IconUser color={hovered ? "#CC9887" : "white"} size={36} />
                    <Text
                      mt={5}
                      weight={"bold"}
                      sx={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {session.data?.user.name.replace(/ .*/, "")}
                    </Text>
                  </Box>
                </Box>
              </Link>
            ) : (
              <Flex
                h={120}
                pb={5}
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box>
                  <Flex
                    direction={"column"}
                    align="center"
                    sx={{ alignContent: "center" }}
                  >
                    <IconUser
                      size={36}
                      color="white"
                      style={{ cursor: "pointer" }}
                      onClick={() => signIn()}
                    />
                    <Text
                      mt={5}
                      weight="bold"
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      Logga In
                    </Text>
                  </Flex>
                </Box>
              </Flex>
            )}
          </Flex>
          {session.data?.user.admin ? (
            <Link href="/admin">
              <Box
                sx={{
                  height: 110,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <ThemeIcon color="teal" variant="light" radius="xl" size={14}>
                  <IconCheck size={8} />
                </ThemeIcon> */}
                <Box ref={ref}>
                  <IconHomeCog
                    color={hovered ? "#CC9887" : "white"}
                    size={36}
                  />
                  <Text
                    weight={"bold"}
                    sx={{
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    Admin
                  </Text>
                </Box>
              </Box>
            </Link>
          ) : null}
          {/* quiz */}
          <Flex>
            <Box sx={{ paddingTop: 25 }}>
              <Box
                onClick={() => {
                  setOpenedQuiz(true);
                  setOpened(false);
                }}
                sx={{ alignContent: "center", cursor: "pointer" }}
              >
                <IconBrandAppleArcade size={36} color="white" />
                <Text
                  weight={"bold"}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "12px",
                  }}
                >
                  Quiz
                </Text>
              </Box>
            </Box>
          </Flex>
          {/* quiz */}

          {/* cart */}
          <Flex sx={[{ paddingTop: 27, justifyContent: "flex-end" }]}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {quantity && quantity > 0 ? (
                <Box
                  top={-6}
                  left={2}
                  pos={"absolute"}
                  w={16}
                  h={16}
                  bg="#E6FCF5"
                  sx={{
                    borderRadius: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text weight={"bold"} color={"brand.3"} size={9}>
                    {quantity}
                  </Text>
                </Box>
              ) : null}
              <IconShoppingBag
                style={{ cursor: "pointer" }}
                onClick={() => setOpenedCart(true)}
                size={36}
                color="white"
              />
              <Text
                mt={5}
                weight={"bold"}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                Varukorg
              </Text>
            </Box>
          </Flex>
          {/* cart */}
        </Flex>
        {session.data?.user ? (
          <Link href={"/minsida"}>
            <Box>
              <Flex
                onClick={() => setOpened(false)}
                sx={{
                  paddingLeft: "26px",
                  marginBottom: "20px",
                  alignItems: "center",
                  width: "295px",
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <Text weight={"bold"} h={"33px"} color={"white"} size={"lg"}>
                    Mina sidor
                  </Text>
                </Box>
                <Flex align={"center"}>
                  <IconSquareRoundedArrowRight color="white" />
                </Flex>
              </Flex>
            </Box>
          </Link>
        ) : null}
        {/* knappar season */}

        <Flex
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
            href={`/sasong/var`}
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
            href={`/sasong/sommar`}
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
            href={`/sasong/host`}
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
            href={`/sasong/vinter`}
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
        <Flex
          pos={"fixed"}
          bottom={20}
          left={20}
          gap={5}
          direction={"column"}
          justify="flex-end"
          h={100}
        >
          <Link href={"/kopvillkor"}>
            <Text weight={"bold"} color="white">
              Köpvillkor
            </Text>
          </Link>
          <Link href={"/integritet"}>
            <Text weight={"bold"} color="white">
              Integritetspolicy
            </Text>
          </Link>
        </Flex>
      </Drawer>
      <Quiz opened={openedQuiz} setOpened={setOpenedQuiz} />
    </>
  );
};

export default MobileBurgerMenu;
