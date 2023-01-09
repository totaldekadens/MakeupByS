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
              <Flex sx={{ width: "50%" }}>
                <Carousel
                  classNames={classes}
                  mx="auto"
                  align="center"
                  height={"100%"}
                  styles={{
                    control: {
                      "&[data-inactive]": {
                        opacity: 0,
                        cursor: "default",
                      },
                    },
                  }}
                >
                  {product.images ? (
                    product.images.map((image: string) => {
                      return (
                        <Carousel.Slide>
                          <Image src={`/uploads/${image}`} />
                        </Carousel.Slide>
                      );
                    })
                  ) : (
                    <Carousel.Slide>
                      <Image src={`/uploads/AMORE.webp`} />
                    </Carousel.Slide>
                  )}
                </Carousel>
              </Flex>
              <Flex sx={{ width: "50%" }} direction={"column"}>
                <Flex>Title</Flex>
              </Flex>
            </Flex>
            <Flex sx={{ width: "100%" }}>
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
}));

export default ProductPage;
