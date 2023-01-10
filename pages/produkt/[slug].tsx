import { Carousel } from "@mantine/carousel";
import {
  AppShell,
  Box,
  Flex,
  Grid,
  Title,
  Text,
  Breadcrumbs,
  Drawer,
  Image,
  createStyles,
  Button,
  MediaQuery,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, SetStateAction, useContext } from "react";
import { LineItem } from "../../components/AddToCartIcon";
import BreadCrumb from "../../components/BreadCrumb";
import Cart from "../../components/cart/Cart";
import { openedCartContext } from "../../components/context/OpenCartProvider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { CategoryDocument } from "../../models/Category";
import { SeasonDocument } from "../../models/Season";
import ErrorPage from "../ErrorPage";

const ProductPage: NextPage = (props) => {
  // Context
  const { openedCart, setOpenedCart } = useContext(openedCartContext);

  // States
  const [product, setProduct] = useState<any>([]);
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Router
  const router = useRouter();
  const { slug } = router.query;

  // Local storage
  const [cartItems, setCartItems] = useLocalStorage<LineItem[]>({
    key: "cart",
    defaultValue: [],
  });

  const { classes } = useStyles();

  // Fetching via useeffect. Todo if time: #66: Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        console.log("kör useeffect");
        setIsLoading(true);
        let response = await fetch(`/api/open/subproduct/${slug}`);
        let result = await response.json();
        if (result.success) {
          setProduct(result.data);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [slug]);

  console.log(product);
  /*   if (!isLoading) {
    if (product.length < 1) {
      return <ErrorPage statusCode={404} />;
    }
  } */
  return (
    <AppShell
      fixed={false}
      header={<Header />}
      footer={<Footer />}
      styles={{
        main: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <Flex sx={{ width: "100%" }}>
        <Breadcrumbs>
          <BreadCrumb href={"/"} title={"Hem"} />
          <BreadCrumb href={"/"} title={""} />
        </Breadcrumbs>
        <Text
          sx={{ cursor: "pointer" }}
          onClick={() => router.back()}
          color={"brand.6"}
          size={"sm"}
        >
          Tillbaka
        </Text>
      </Flex>

      <Box
        style={{
          marginTop: 30,
          minHeight: "100vh",
          width: "100%",
          maxWidth: "1320px",
        }}
      >
        {product && product.mainProduct ? (
          <Flex direction={"column"} sx={{ width: "100%" }}>
            <Flex
              sx={(theme) => ({
                width: "100%",
                [theme.fn.smallerThan("xs")]: {
                  flexDirection: "column",
                },
              })}
              gap={20}
            >
              <Flex
                sx={(theme) => ({
                  width: "50%",
                  [theme.fn.smallerThan("xs")]: {
                    width: "100%",
                  },
                })}
                align="flex-start"
              >
                <Carousel
                  classNames={classes}
                  mx="auto"
                  align="center"
                  height={"40vh"}
                  loop
                >
                  {product.images ? (
                    product.images.map((image: string, index: number) => {
                      return (
                        <Carousel.Slide key={index}>
                          <Image
                            fit="contain"
                            styles={{
                              root: {
                                display: "flex",
                                align: "center",
                                justifyContent: "center",
                              },
                              imageWrapper: {
                                display: "flex",
                                align: "center",
                              },
                              figure: { display: "flex", align: "center" },
                            }}
                            src={`/uploads/${image}`}
                          />
                        </Carousel.Slide>
                      );
                    })
                  ) : (
                    <Carousel.Slide></Carousel.Slide>
                  )}
                </Carousel>
              </Flex>
              <Flex
                sx={(theme) => ({
                  width: "50%",
                  [theme.fn.smallerThan("xs")]: {
                    width: "100%",
                  },
                })}
                direction={"column"}
              >
                <Flex direction={"column"}>
                  <Title color="dimmed" order={5}>
                    {product.mainProduct.brand}
                  </Title>
                  <Title order={1}>{product.title}</Title>
                </Flex>
                <Flex justify={"space-between"}>
                  <Flex>
                    <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                      <Text>
                        {product.mainProduct.price.$numberDecimal + " KR"}
                      </Text>
                    </MediaQuery>
                  </Flex>
                  <Flex>
                    {product.colors
                      ? product.colors.map((color: any) => {
                          return color.seasons.map(
                            (season: SeasonDocument, index: number) => {
                              return (
                                <Flex
                                  key={index}
                                  py={5}
                                  px={10}
                                  mr={20}
                                  align="center"
                                  sx={(theme) => ({
                                    borderRadius: "10px",
                                    backgroundColor: theme.colors.brand[2],
                                  })}
                                >
                                  <Text color={"white"} size={"sm"}>
                                    {season.title}
                                  </Text>
                                </Flex>
                              );
                            }
                          );
                        })
                      : null}
                  </Flex>
                </Flex>

                <Flex mt={20} gap={10} direction={"column"}>
                  <Text size={14}>{product.mainProduct.description1}</Text>
                  <Text size={14}>
                    {product.mainProduct.description2
                      ? product.mainProduct.description2
                      : null}
                  </Text>
                </Flex>
                {product.availableQty < 1 ? (
                  <Text mt={20} size={14} color="red">
                    Tillfällig slut
                  </Text>
                ) : null}
                <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                  <Button
                    disabled={product.availableQty < 1 ? true : false}
                    mt={20}
                  >
                    KÖP NU
                  </Button>
                </MediaQuery>
                <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                  <Flex
                    mt={40}
                    p={20}
                    bg="gray.2"
                    direction="column"
                    sx={{ borderRadius: "10px" }}
                  >
                    <Title order={4}>Ingredienser</Title>
                    <Text size={"sm"}>{product.mainProduct.ingredients}</Text>
                    <Text mt={20} size={"sm"}>
                      Artikelnummer: {product.partNo}
                    </Text>
                  </Flex>
                </MediaQuery>
              </Flex>
            </Flex>

            <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
              <Flex
                mt={40}
                p={20}
                bg="gray.2"
                direction="column"
                sx={{ borderRadius: "10px" }}
              >
                <Title order={4}>Ingredienser</Title>
                <Text size={"sm"}>{product.mainProduct.ingredients}</Text>
                <Text mt={20} size={"sm"}>
                  Artikelnummer: {product.partNo}
                </Text>
              </Flex>
            </MediaQuery>
            <Flex mt={20} sx={{ width: "100%" }}>
              <Title order={3}>Andra har också köpt</Title>
            </Flex>
            <MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
              <Flex
                pos={"fixed"}
                bottom={0}
                right={0}
                left={0}
                h={70}
                bg="gray.2"
                //bg="brand.1"
                justify={"space-between"}
                align="center"
                px={20}
              >
                <Text weight={"bold"}>
                  {" "}
                  {product.mainProduct.price.$numberDecimal + " KR"}
                </Text>
                <Button>Köp</Button>
              </Flex>
            </MediaQuery>
          </Flex>
        ) : null}
      </Box>
      <Cart />
    </AppShell>
  );
};

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
  slide: {
    display: "flex",
    align: "center",
  },
}));

export default ProductPage;
