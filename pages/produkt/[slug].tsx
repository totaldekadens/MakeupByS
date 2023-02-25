import { Carousel } from "@mantine/carousel";
import {
  AppShell,
  Box,
  Flex,
  Title,
  Text,
  Image,
  createStyles,
  Button,
  MediaQuery,
  Tooltip,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { LineItem } from "../../components/cart/AddToCartIcon";
import Cart from "../../components/cart/Cart";
import { openedCartContext } from "../../components/context/OpenCartProvider";
import Footer from "../../components/layout/Footer";
import Header from "../../components/layout/Header";
import MarginTopContainer from "../../components/layout/MarginTopContainer";
import CarouselProduct from "../../components/product/CarouselProduct";
import Details from "../../components/product/Details";
import Season, { SeasonDocument } from "../../models/Season";
import useWindowSize from "../../utils/useWindowSize";
import { IconChevronLeft } from "@tabler/icons";
import SubProduct from "../../models/SubProduct";
import dbConnect from "../../utils/dbConnect";
import MainProduct from "../../models/MainProduct";
import Category from "../../models/Category";
import Color, { ColorDocument } from "../../models/Color";
import { PopulatedColor, PopulatedProduct } from "../../utils/types";
import { ResponseModalType } from "../../components/admin/SelectStatus";
import ResponseModal from "../../components/layout/ResponseModal";
import Head from "next/head";
import useFetchHelper from "../../utils/useFetchHelper";

type Props = {
  product: PopulatedProduct;
  products: PopulatedProduct[];
};

const ProductPage: NextPage<Props> = ({ product, products }) => {
  // Context
  const { openedCart, setOpenedCart } = useContext(openedCartContext);
  // States
  const [opened, setOpened] = useState(false);
  const [response, setResponse] = useState<ResponseModalType>({
    title: "",
    reason: "info",
  });

  // Router
  const router = useRouter();
  const [status, setStatus] = useState(200);
  const [currentProduct, setCurrentProduct] =
    useState<PopulatedProduct>(product);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);

  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      useFetchHelper(
        setStatus,
        setIsLoadingProducts,
        setCurrentProduct,
        `/api/open/subproduct/${slug}`
      );
    }
  }, [product]);

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
    if (currentProduct && currentProduct.mainProduct) {
      const price = Number(currentProduct.mainProduct.price.$numberDecimal);

      const lineItem = {
        quantity: 1,
        price_data: {
          currency: "sek",
          unit_amount: price,
          product_data: {
            name: currentProduct.title,
            description: currentProduct.mainProduct.description1,
            images: currentProduct.images,
            metadata: {
              id: currentProduct._id,
              weight: currentProduct.mainProduct.weight
                ? currentProduct.mainProduct.weight
                : 0,
            },
          },
        },
      };

      let cartCopy = [...cartItems];

      let foundIndex = cartCopy.findIndex(
        (cartItem) =>
          cartItem.price_data.product_data.metadata.id === currentProduct._id
      );

      if (foundIndex >= 0) {
        if (cartCopy[foundIndex].quantity >= currentProduct.availableQty) {
          const object: ResponseModalType = {
            title: "Finns tyvärr inga fler produkter",
            reason: "error",
          };
          setResponse(object);
          setOpened(true);
          return;
        }
        cartCopy[foundIndex].quantity++;
      } else {
        cartCopy.push(lineItem);
      }

      setCartItems(cartCopy);
      setOpenedCart(true);
    }
  };

  return (
    <>
      <Head>
        <title>{currentProduct?.title + " - MakeUpByS"}</title>
        <meta
          property="og:title"
          content={`${currentProduct?.title} - MakeUpByS`}
        />
      </Head>
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
            {currentProduct && currentProduct.mainProduct && products ? (
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
                      withControls={
                        currentProduct.images.length < 2 ? false : true
                      }
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
                      {currentProduct.images ? (
                        currentProduct.images.map(
                          (image: string, index: number) => {
                            return (
                              <Carousel.Slide key={index}>
                                <Image
                                  alt={image}
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
                                  src={`https://res.cloudinary.com/dkzh2lxon/image/upload/v1675178603/makeupbys/${image}`}
                                />
                              </Carousel.Slide>
                            );
                          }
                        )
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
                        {currentProduct.mainProduct.brand}
                      </Title>
                      <Title color={"brand.8"} order={1}>
                        {currentProduct.title}
                      </Title>
                    </Flex>
                    <Flex justify={"space-between"}>
                      <Flex>
                        <MediaQuery
                          smallerThan={"xs"}
                          styles={{ display: "none" }}
                        >
                          <Text>
                            {currentProduct.mainProduct.price.$numberDecimal +
                              " KR"}
                          </Text>
                        </MediaQuery>
                      </Flex>
                      <Flex>
                        {currentProduct.colors
                          ? currentProduct.colors.map((color) => {
                              return color.seasons.map((season, index) => {
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
                              });
                            })
                          : null}
                      </Flex>
                    </Flex>

                    <Flex mt={20} gap={10} direction={"column"}>
                      <Text size={14}>
                        {currentProduct.mainProduct.description1}
                      </Text>
                      <Text size={14}>
                        {currentProduct.mainProduct.description2
                          ? currentProduct.mainProduct.description2
                          : null}
                      </Text>
                    </Flex>
                    {currentProduct.availableQty < 1 ? (
                      <Text mt={20} size={14} color="red">
                        Tillfällig slut
                      </Text>
                    ) : null}
                    <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                      <Button
                        disabled={
                          currentProduct.availableQty < 1 ? true : false
                        }
                        mt={20}
                        onClick={() => handleClick()}
                        sx={(theme) => ({
                          "&:hover": {
                            backgroundColor: theme.colors.brand[8],
                            color: theme.colors.brand[0],
                            borderColor: theme.colors.brand[0],
                          },
                        })}
                      >
                        KÖP NU
                      </Button>
                    </MediaQuery>
                    <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
                      <Box>
                        <Details product={currentProduct} />
                      </Box>
                    </MediaQuery>
                  </Flex>
                </Flex>

                <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                  <Box>
                    <Details product={currentProduct} />
                  </Box>
                </MediaQuery>
                <Flex direction={"column"} mt={20} sx={{ width: "100%" }}>
                  <Title color={"brand.8"} order={3}>
                    Andra har också köpt
                  </Title>
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
                        size.width < 767 || size.width > 1200
                          ? "none"
                          : "block",
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

                {currentProduct.availableQty < 1 ? null : (
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
                        {currentProduct.mainProduct.price.$numberDecimal +
                          " KR"}
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
        <ResponseModal info={response} setOpened={setOpened} opened={opened} />
      </AppShell>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const products = await SubProduct.find({});

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await dbConnect();

  const product = await SubProduct.findOne({ slug: params?.slug })
    .populate({
      path: "mainProduct",
      model: MainProduct,
      populate: {
        path: "category",
        model: Category,
      },
    })
    .populate({
      path: "colors",
      model: Color,
      populate: {
        path: "seasons",
        model: Season,
      },
    });

  const subProducts = await SubProduct.find({})
    .populate({
      path: "mainProduct",
      model: MainProduct,
      populate: {
        path: "category",
        model: Category,
      },
    })
    .populate({
      path: "colors",
      model: Color,
      populate: {
        path: "seasons",
        model: Season,
      },
    });

  // Todo if time: #67 Find a better way. Should be able to filter the query above.
  //Check aggregation and virtuals with match
  let list: any[] = [];
  subProducts.forEach((product) => {
    product.colors.forEach((color: PopulatedColor) => {
      color.seasons.forEach((season) => {
        if (season.slug == product.colors[0].seasons[0].slug) {
          list.push(product);
        }
      });
    });
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      products: JSON.parse(JSON.stringify(list)),
    },
  };
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
