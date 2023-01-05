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
import BreadCrumb from "../../../../components/BreadCrumb";
import Cart from "../../../../components/cart/Cart";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import ProductCard from "../../../../components/ProductCard";
import { CategoryDocument } from "../../../../models/Category";
import { SeasonDocument } from "../../../../models/Season";
import ErrorPage from "../../../ErrorPage";

const CategoryPage: NextPage = (props) => {
  const router = useRouter();
  const { categorySlug, seasonSlug } = router.query;
  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<CategoryDocument>();
  const [season, setSeason] = useState<SeasonDocument>();
  const [opened, setOpened] = useState(false);
  const [isLoading, setIsLoading] = useState({
    products: true,
    category: true,
    season: true,
  });

  // Fetching via useeffect. Todo if time: #66: Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
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
    const fetchCategory = async () => {
      try {
        setIsLoading((existingValues) => ({
          ...existingValues,
          category: true,
        }));
        let response = await fetch(`/api/open/category/${categorySlug}`);
        let result = await response.json();
        if (result.success) {
          setCategory(result.data);
          setIsLoading((existingValues) => ({
            ...existingValues,
            category: false,
          }));
          return;
        }
        setIsLoading((existingValues) => ({
          ...existingValues,
          category: false,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    const fetchSeason = async () => {
      try {
        setIsLoading((existingValues) => ({
          ...existingValues,
          season: true,
        }));
        let response = await fetch(`/api/open/season/${seasonSlug}`);
        let result = await response.json();
        if (result.success) {
          setSeason(result.data);
          setIsLoading((existingValues) => ({
            ...existingValues,
            season: false,
          }));
          return;
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSeason();
    fetchCategory();
    fetchProducts();
  }, [categorySlug]);

  if (!isLoading.products && !isLoading.season && !isLoading.category) {
    if (products.length < 1 || !season || !category) {
      return <ErrorPage statusCode={404} />;
    }
  }
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
      {isLoading.season || isLoading.category ? null : (
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
      )}
      <Box style={{ marginTop: 60, minHeight: "100vh", maxWidth: "1320px" }}>
        {isLoading.products ? null : (
          <>
            <Flex direction={"column"} align="center" sx={{ width: "100%" }}>
              <Title order={1}>{category?.title}</Title>
              <Text color="dimmed">{category?.description}</Text>
            </Flex>
            {products ? (
              <Flex mt="xl" wrap="wrap" justify={"center"}>
                <Grid justify={"center"}>
                  {products?.map((product: any, index: number) => {
                    return (
                      <Grid.Col key={index} md={4} sm={5} xs={6}>
                        <ProductCard product={product} openCart={setOpened} />
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Flex>
            ) : null}
          </>
        )}
      </Box>
      <Cart />
    </AppShell>
  );
};

export default CategoryPage;
