import {
  AppShell,
  Box,
  Flex,
  Grid,
  Title,
  Text,
  Breadcrumbs,
  Drawer,
} from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, SetStateAction } from "react";
import BreadCrumb from "../../components/BreadCrumb";
import Cart from "../../components/cart/Cart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { CategoryDocument } from "../../models/Category";
import { SeasonDocument } from "../../models/Season";
import ErrorPage from "../ErrorPage";

const ProductPage: NextPage = (props) => {
  const router = useRouter();
  const { categorySlug, seasonSlug, productSlug } = router.query;
  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<CategoryDocument>();
  const [season, setSeason] = useState<SeasonDocument>();
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState({
    products: true,
    category: true,
    season: true,
  });

  const { slug } = router.query;
  console.log(router.query);
  // Fetching via useeffect. Todo if time: #66: Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  /* useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading((existingValues) => ({
          ...existingValues,
          products: true,
        }));
        let response = await fetch(
          `/api/open/subproduct/categorybyseason/${categorySlug}?seasonSlug=${seasonSlug}`
        );
        let result = await response.json();
        if (result.success) {
          setProducts(result.data);
          setIsLoading((existingValues) => ({
            ...existingValues,
            products: false,
          }));
          return;
        }
        setIsLoading((existingValues) => ({
          ...existingValues,
          products: false,
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []); */

  /*   if (!isLoading.products) {
    if (products.length < 1 ) {
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
      {/* {isLoading.season || isLoading.category ? null : (
        <Flex sx={{ width: "100%" }}>
          <Breadcrumbs>
            <BreadCrumb href={"/"} title={"Hem"} />
            <BreadCrumb
              href={`/season/${season?.slug}`}
              title={season?.title}
            />
            <BreadCrumb
              href={`/season/${season?.slug}/category/${categorySlug}`}
              title={category?.title}
            />
          </Breadcrumbs>
        </Flex>
      )} */}
      <Box style={{ marginTop: 60, minHeight: "100vh", maxWidth: "1320px" }}>
        <Title>Du har kommit rätt!</Title>
      </Box>
      <Cart />
    </AppShell>
  );
};

export default ProductPage;
