import {
  AppShell,
  Box,
  Button,
  Flex,
  Grid,
  Title,
  Text,
  Breadcrumbs,
} from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Cart from "../../../components/cart/Cart";
import Footer from "../../../components/Footer";
import Header from "../../../components/Header";
import ProductCard from "../../../components/ProductCard";
import { CategoryDocument } from "../../../models/Category";
import { SeasonDocument } from "../../../models/Season";
import ErrorPage from "../../ErrorPage";

const SeasonPage: NextPage = (props) => {
  const router = useRouter();
  const { seasonSlug } = router.query;
  const [products, setProducts] = useState<any>([]);
  const [season, setSeason] = useState<SeasonDocument>();
  const [openedCart, setOpenedCart] = useState(false);
  const [error, setError] = useState(200);

  // Fetching via useeffect. Todo if time: #66: Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(200);
        if (seasonSlug) {
          let response = await fetch(
            `/api/open/subproduct/season/${seasonSlug}`
          );
          let result = await response.json();

          if (result.success) {
            setProducts(result.data);
            setError(200);
            return;
          }
          setError(404);
        }
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
    fetchProducts();
  }, [seasonSlug]);

  let categories: CategoryDocument[] = [];
  if (products) {
    products.forEach((product: any) => {
      if (categories.length < 1) {
        categories.push(product.mainProduct.category);
        return;
      }
      const findCategory = categories.find(
        (category) => category.title == product.mainProduct.category.title
      );
      if (!findCategory) {
        categories.push(product.mainProduct.category);
        return;
      }
    });
  }
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
      {!season ? null : (
        <Flex sx={{ width: "100%" }}>
          <Breadcrumbs>
            <BreadCrumb href={"/"} title={"Hem"} />
            <BreadCrumb
              href={`/season/${season?.slug}`}
              title={season?.title}
            />
          </Breadcrumbs>
        </Flex>
      )}
      <Box
        style={{
          marginTop: 60,
          minHeight: "100vh",
          maxWidth: "1320px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!products ? null : (
          <>
            <Flex direction={"column"} align="center" sx={{ width: "100%" }}>
              <Title order={1}>{season?.title}</Title>
              <Text color="dimmed">{season?.description}</Text>
            </Flex>
            {products[0] ? (
              <Flex justify={"center"} mt="sm" gap="lg" wrap={"wrap"}>
                {categories.map((category, index) => {
                  return (
                    <Link
                      key={index}
                      href={`/season/${seasonSlug}/category/${category.slug}`}
                    >
                      <Button variant="outline" color="brand.2">
                        {category.title}
                      </Button>
                    </Link>
                  );
                })}
              </Flex>
            ) : null}
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
          </>
        )}
      </Box>
      <Cart />
    </AppShell>
  );
};

export default SeasonPage;
