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
  Title,
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
import { LineItem } from "./AddToCartIcon";
import { FC, useContext, useEffect, useState } from "react";
import { openedCartContext } from "./context/OpenCartProvider";

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
        <Flex sx={{ alignItems: "flex-end", paddingBottom: "2px", width: 58 }}>
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
            height: "120px",
            backgroundColor: theme.colors.brand[1],
            width: "100%",
            justifyContent: "space-evenly",
            gap: "20px",
            marginBottom: "20px",
          })}
        >
          <Flex styles={{ height: "70px" }}>
            {session.data?.user ? (
              <Link href="/minsida">
                <Box sx={{ height: 70 }}>
                  <ThemeIcon color="teal" variant="light" radius="xl" size={14}>
                    <IconCheck size={8} />
                  </ThemeIcon>
                  <Box ref={ref}>
                    <IconUser color={hovered ? "#CC9887" : "white"} size={36} />
                    <Title
                      sx={{
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      {session.data?.user.name.replace(/ .*/, "")}
                    </Title>
                  </Box>
                </Box>
              </Link>
            ) : (
              <Flex>
                <Box sx={{ paddingTop: 25 }}>
                  <Box sx={{ alignContent: "center" }}>
                    <Link href="/">
                      <IconUser
                        size={36}
                        color="white"
                        onClick={() => signIn()}
                      />
                      <Title
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "12px",
                        }}
                      >
                        Log In
                      </Title>
                    </Link>
                  </Box>
                </Box>
              </Flex>
            )}
          </Flex>
          {session.data?.user.admin ? (
            <Link href="/admin">
              <Box sx={{ height: 70 }}>
                <ThemeIcon color="teal" variant="light" radius="xl" size={14}>
                  <IconCheck size={8} />
                </ThemeIcon>
                <Box ref={ref}>
                  <IconHomeCog
                    color={hovered ? "#CC9887" : "white"}
                    size={36}
                  />
                  <Title
                    sx={{
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    {session.data?.user.name.replace(/ .*/, "")}
                  </Title>
                </Box>
              </Box>
            </Link>
          ) : null}
          {/* quiz */}
          <Flex>
            <Box sx={{ paddingTop: 25 }}>
              <Box sx={{ alignContent: "center" }}>
                <Link href="/Quiz">
                  <IconBrandAppleArcade size={36} color="white" />
                  <Title
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "12px",
                    }}
                  >
                    Quiz
                  </Title>
                </Link>
              </Box>
            </Box>
          </Flex>
          {/* quiz */}

          {/* cart */}
          <Flex sx={[{ paddingTop: 27, justifyContent: "flex-end" }]}>
            <Box sx={{ position: "relative" }}>
              {quantity && quantity > 0 ? (
                <Box
                  top={-11}
                  left={-9}
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
                  <Title weight={"bold"} color={"brand.3"} size={9}>
                    {quantity}
                  </Title>
                </Box>
              ) : null}
              <IconShoppingBag
                style={{ cursor: "pointer" }}
                onClick={() => setOpenedCart(true)}
                size={36}
                color="white"
              />
              <Title
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "12px",
                }}
              >
                Cart
              </Title>
            </Box>
          </Flex>
          {/* cart */}
        </Flex>
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
                <Title h={"30px"} color={"white"} size={"lg"}>
                  Mina sidor
                </Title>
              </Box>
              <Box>
                <IconSquareRoundedArrowRight color="white" />
              </Box>
            </Flex>
          </Box>
        </Link>
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
          <Flex
            sx={{ width: "270px", alignItems: "center", cursor: "pointer" }}
          >
            <Box sx={{ width: "100%" }}>
              <Title color={"white"} size={"lg"}>
                Kategorier
              </Title>
            </Box>
            <Box>
              <IconSquareRoundedArrowRight color="white" />
            </Box>
          </Flex>

          <Space h="lg"></Space>
          <Flex
            sx={{ width: "270px", alignItems: "center", cursor: "pointer" }}
          >
            <Box sx={{ width: "100%" }}>
              <Title color={"white"} size={"lg"}>
                Kategorier
              </Title>
            </Box>
            <Box>
              <IconSquareRoundedArrowRight color="white" />
            </Box>
          </Flex>

          <Space h="lg"></Space>
          <Flex
            sx={{ width: "270px", alignItems: "center", cursor: "pointer" }}
          >
            <Box sx={{ width: "100%" }}>
              <Title color={"white"} size={"lg"}>
                Kategorier
              </Title>
            </Box>
            <Box>
              <IconSquareRoundedArrowRight color="white" />
            </Box>
          </Flex>

          <Space h="lg"></Space>

          <Flex
            sx={{ width: "270px", alignItems: "center", cursor: "pointer" }}
          >
            <Box sx={{ width: "100%" }}>
              <Title color={"white"} size={"lg"}>
                Kategorier
              </Title>
            </Box>
            <Box>
              <IconSquareRoundedArrowRight color="white" />
            </Box>
          </Flex>
        </Box>
      </Drawer>
    </>
  );
};

export default MobileBurgerMenu;
