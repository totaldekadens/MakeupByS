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
  }, []);

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
          marginTop: 60,
          minHeight: "100vh",
          width: "100%",
          maxWidth: "1320px",
        }}
      >
        {product ? (
          <Flex direction={"column"} sx={{ width: "100%" }}>
            <Flex sx={{ width: "100%" }}>
              <Flex sx={{ width: "50%" }} align="center">
                <Carousel
                  classNames={classes}
                  mx="auto"
                  align="center"
                  height={"50vh"}
                  loop
                  /*  styles={{
                    control: {
                      "&[data-inactive]": {
                        opacity: 0,
                        cursor: "default",
                      },
                    },
                  }} */
                >
                  {product.images ? (
                    product.images.map((image: string, index: number) => {
                      return (
                        <Carousel.Slide key={index}>
                          <Image
                            fit="contain"
                            styles={{
                              root: { display: "flex", align: "center" },
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
              <Flex sx={{ width: "50%" }} direction={"column"}>
                <Flex direction={"column"}>
                  <Title color="dimmed" order={5}>
                    {product.mainProduct ? product.mainProduct.brand : null}
                  </Title>
                  <Title order={1}>{product.title}</Title>
                </Flex>
                <Flex justify={"space-between"}>
                  <Flex>
                    <Text>
                      {product.mainProduct
                        ? product.mainProduct.price.$numberDecimal
                        : null}{" "}
                      KR{" "}
                    </Text>
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
                                    backgroundColor: theme.fn.rgba(
                                      theme.colors.brand[1],
                                      0.5
                                    ),
                                  })}
                                >
                                  <Text size={"sm"}>{season.title}</Text>
                                </Flex>
                              );
                            }
                          );
                        })
                      : null}
                  </Flex>
                </Flex>

                <Flex mt={20} gap={10} direction={"column"}>
                  {product.mainProduct ? (
                    <>
                      <Text size={14}>{product.mainProduct.description1}</Text>
                      <Text size={14}>
                        {product.mainProduct.description2
                          ? product.mainProduct.description2
                          : null}
                      </Text>
                    </>
                  ) : null}
                </Flex>
                <Button mt={20}>KÖP NU</Button>
                {product.mainProduct ? (
                  <Flex
                    mt={40}
                    p={20}
                    bg="gray.0"
                    direction="column"
                    sx={{ borderRadius: "10px" }}
                  >
                    <Title order={4}>Ingredienser</Title>
                    <Text size={"sm"}>{product.mainProduct.ingredients}</Text>
                    <Text mt={20} size={"sm"}>
                      Artikelnummer: {product.partNo}
                    </Text>
                  </Flex>
                ) : null}
              </Flex>
            </Flex>
            <Flex mt={20} sx={{ width: "100%" }}>
              <Title order={3}>Andra har också köpt</Title>
            </Flex>
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
