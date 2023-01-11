import {
  AppShell,
  Box,
  Flex,
  Grid,
  Title,
  Text,
  Breadcrumbs,
} from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/BreadCrumb";
import Cart from "../../../../components/cart/Cart";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import WrapContainer from "../../../../components/layout/WrapContainer";
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
  const [error, setError] = useState(200);
  console.log(products);
  // Fetching via useeffect. Todo if time: #66: Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(200);
        let response = await fetch(
          `/api/open/subproduct/categorybyseason/${categorySlug}?seasonSlug=${seasonSlug}`
        );
        let result = await response.json();
        if (result.success) {
          setProducts(result.data);
          setError(200);
          return;
        }
        setError(404);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchCategory = async () => {
      try {
        setError(200);
        let response = await fetch(`/api/open/category/${categorySlug}`);
        let result = await response.json();
        if (result.success) {
          setCategory(result.data);
          setError(200);
          return;
        }
        setError(404);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchSeason = async () => {
      try {
        setError(200);
        let response = await fetch(`/api/open/season/${seasonSlug}`);
        let result = await response.json();
        if (result.success) {
          setSeason(result.data);
          setError(200);
          return;
        }
        setError(404);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSeason();
    fetchCategory();
    fetchProducts();
  }, [categorySlug]);

  if (products && error > 200) {
    return <ErrorPage statusCode={error} />;
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
      {!season || !category ? null : (
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
      <WrapContainer>
        {!products ? null : (
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
                        <ProductCard product={product} />
                      </Grid.Col>
                    );
                  })}
                </Grid>
              </Flex>
            ) : null}
          </>
        )}
      </WrapContainer>
      <Cart />
    </AppShell>
  );
};

export default CategoryPage;
