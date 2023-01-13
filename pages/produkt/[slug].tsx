import { Carousel } from "@mantine/carousel";
import {
  AppShell,
  Box,
  Flex,
  Title,
  Text,
  Breadcrumbs,
  Image,
  createStyles,
  Button,
  MediaQuery,
  Tooltip,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { boolean } from "yup";
import { LineItem } from "../../components/cart/AddToCartIcon";
import BreadCrumb from "../../components/BreadCrumb";
import Cart from "../../components/cart/Cart";
import { openedCartContext } from "../../components/context/OpenCartProvider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import MarginTopContainer from "../../components/layout/MarginTopContainer";
import CarouselProduct from "../../components/product/CarouselProduct";
import Details from "../../components/product/Details";
import { SeasonDocument } from "../../models/Season";
import useFetchHelper from "../../utils/useFetchHelper";
import useWindowSize from "../../utils/useWindowSize";
import ErrorPage from "../_error";
import { IconChevronLeft } from "@tabler/icons";

const ProductPage: NextPage = (props) => {
  // Context
  const { openedCart, setOpenedCart } = useContext(openedCartContext);

  // States
  const [product, setProduct] = useState<any>([]);
  const [products, setProducts] = useState<any>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [status, setStatus] = useState(200);

  // Router
  const router = useRouter();
  const { slug } = router.query;
  // Local storage
  const [cartItems, setCartItems] = useLocalStorage<LineItem[]>({
    key: "cart",
    defaultValue: [],
  });

  // Gets current window height and window width
  let size = useWindowSize();

  // Use mantines useStyle
  const { classes } = useStyles();

  const handleClick = () => {
    if (product && product.mainProduct) {
      const price = Number(product.mainProduct.price.$numberDecimal);

      const lineItem = {
        quantity: 1,
        price_data: {
          currency: "sek",
          unit_amount: price,
          product_data: {
            name: product.title,
            description: product.description,
            images: product.images,
            metadata: {
              id: product._id,
              weight: product.mainProduct.weight
                ? product.mainProduct.weight
                : 0,
            },
          },
        },
      };

      let cartCopy = [...cartItems];

      let foundIndex = cartCopy.findIndex(
        (cartItem) =>
          cartItem.price_data.product_data.metadata.id === product._id
      );

      if (foundIndex >= 0) {
        if (cartCopy[foundIndex].quantity >= product.availableQty) {
          return alert("Finns tyvärr inga fler produkter"); // Fixa modal till denna sen
        }
        cartCopy[foundIndex].quantity++;
      } else {
        cartCopy.push(lineItem);
      }

      setCartItems(cartCopy);
      setOpenedCart(true);
    }
  };

  // Fetching via useeffect. Todo if time: #66: Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
    if (slug) {
      useFetchHelper(
        setStatus,
        setIsLoadingProduct,
        setProduct,
        `/api/open/subproduct/${slug}`
      );
    }
  }, [slug]);

  useEffect(() => {
    if (product && product.colors) {
      useFetchHelper(
        setStatus,
        setIsLoadingProducts,
        setProducts,
        `/api/open/subproduct/season/${product.colors[0].seasons[0].slug}`
      );
    }
  }, [product]);

  if (!isLoadingProduct && status > 299) {
    return <ErrorPage statusCode={status} />;
  }

  return (
    <AppShell
      fixed={false}
      header={<Header />}
      footer={<Footer />}
      styles={(theme) => ({
        main: {
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      })}
    >
      <MarginTopContainer>
        <Flex sx={{ width: "100%" }}>
          <Flex
            w={100}
            justify="flex-start"
            align={"center"}
            onClick={() => {
              router.back();
            }}
            sx={(theme) => ({
              cursor: "pointer",
              [theme.fn.smallerThan("xs")]: {
                width: 70,
              },
            })}
          >
            <IconChevronLeft size={14} color="#375F69" />

            <Text
              size={13}
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  fontSize: 13,
                },
              })}
              color={"brand.6"}
              align="center"
            >
              Tillbaka
            </Text>
          </Flex>
        </Flex>
        <Box
          style={{
            marginTop: 30,
            minHeight: "100vh",
            width: "100%",
            maxWidth: "1320px",
          }}
        >
          {product && product.mainProduct && products ? (
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
                    height={"55vh"}
                    styles={(theme) => ({
                      viewport: {
                        [theme.fn.smallerThan("xs")]: {
                          height: "40vh",
                        },
                      },
                      container: {
                        [theme.fn.smallerThan("xs")]: {
                          height: "40vh",
                        },
                      },
                    })}
                    loop
                    slideSize={"101%"}
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
                                figure: {
                                  display: "flex",
                                  align: "center",
                                },
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
                      <MediaQuery
                        smallerThan={"xs"}
                        styles={{ display: "none" }}
                      >
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
                                  <Tooltip
                                    key={index}
                                    color="black"
                                    label={season.title}
                                    withArrow
                                  >
                                    <Flex
                                      mt={10}
                                      key={index}
                                      mr={20}
                                      w={30}
                                      h={30}
                                      justify="center"
                                      align="center"
                                      sx={(theme) => ({
                                        borderRadius: "50%",
                                        border: "1px solid black",
                                        [theme.fn.smallerThan("md")]: {
                                          marginRight: 10,
                                          width: 25,
                                          height: 25,
                                        },
                                      })}
                                    >
                                      <Text
                                        color={"black"}
                                        size={"sm"}
                                        sx={(theme) => ({
                                          [theme.fn.smallerThan("md")]: {
                                            fontSize: theme.fontSizes.xs,
                                          },
                                        })}
                                      >
                                        {season.title.slice(0, 2)}
                                      </Text>
                                    </Flex>
                                  </Tooltip>
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
                      onClick={() => handleClick()}
                    >
                      KÖP NU
                    </Button>
                  </MediaQuery>
                  <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                    <Box>
                      <Details product={product} />
                    </Box>
                  </MediaQuery>
                </Flex>
              </Flex>

              <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                <Box>
                  <Details product={product} />
                </Box>
              </MediaQuery>
              <Flex direction={"column"} mt={20} sx={{ width: "100%" }}>
                <Title order={3}>Andra har också köpt</Title>
                <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
                  <Box>
                    <CarouselProduct
                      products={products}
                      slideGap="md"
                      slideSize="30.3333%"
                      slidesToScroll={undefined}
                    />
                  </Box>
                </MediaQuery>

                <Box
                  sx={{
                    display:
                      size.width < 767 || size.width > 1200 ? "none" : "block",
                  }}
                >
                  <CarouselProduct
                    products={products}
                    slideGap="md"
                    slideSize="50%"
                    slidesToScroll={2}
                  />
                </Box>

                <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                  <Box>
                    <CarouselProduct
                      products={products}
                      slideGap="xs"
                      slideSize="100%"
                      slidesToScroll={undefined}
                    />
                  </Box>
                </MediaQuery>
              </Flex>

              {product.availableQty < 1 ? null : (
                <MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
                  <Flex
                    pos={"fixed"}
                    bottom={0}
                    right={0}
                    left={0}
                    h={70}
                    bg="gray.2"
                    justify={"space-between"}
                    align="center"
                    px={20}
                    sx={{ zIndex: 3 }}
                  >
                    <Text weight={"bold"}>
                      {" "}
                      {product.mainProduct.price.$numberDecimal + " KR"}
                    </Text>
                    <Button onClick={() => handleClick()}>KÖP NU</Button>
                  </Flex>
                </MediaQuery>
              )}
            </Flex>
          ) : null}
        </Box>
      </MarginTopContainer>
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
