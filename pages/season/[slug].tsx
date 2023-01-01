import { AppShell, Box, Button, Flex, Grid, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { CategoryDocument } from "../../models/Category";
import { SeasonDocument } from "../../models/Season";
import ErrorPage from "../ErrorPage";

const SeasonPage: NextPage = (props) => {
  const router = useRouter();
  const { slug } = router.query;
  const [products, setProducts] = useState<any>([]);
  const [season, setSeason] = useState<SeasonDocument>();

  // Fetching via useeffect. Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch(`/api/open/subproduct/season/${slug}`);
        let result = await response.json();
        if (result.success) {
          setProducts(result.data);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    };
    const fetchSeason = async () => {
      try {
        let response = await fetch(`/api/open/season/${slug}`);
        let result = await response.json();
        if (result.success) {
          setSeason(result.data);
          return;
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchSeason();
    fetchProducts();
  }, [slug]);

  if (!products || !season) return <ErrorPage statusCode={404} />; // Fix error page;

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
  return (
    <AppShell fixed={false} header={<Header />} footer={<Footer />}>
      <Box style={{ marginTop: 60, minHeight: "100vh" }}>
        {products[0] ? (
          <>
            <Flex direction={"column"} align="center" sx={{ width: "100%" }}>
              <Title order={1}>{season?.title}</Title>
              <Text>{season?.description}</Text>
            </Flex>
            <Flex justify={"center"} mt="sm" mb="xl" gap="lg">
              {categories.map((category) => {
                return (
                  <Link href={`/season/${slug}/category/${category.slug}`}>
                    <Button variant="outline" color="brand.2">
                      {category.title}
                    </Button>
                  </Link>
                );
              })}
            </Flex>
            <Flex wrap="wrap" justify={"center"}>
              <Grid justify={"center"}>
                {products?.map((product: any, index: number) => {
                  return (
                    <Grid.Col key={index} span={4}>
                      <ProductCard product={product} />
                    </Grid.Col>
                  );
                })}
              </Grid>
            </Flex>
          </>
        ) : null}
      </Box>
    </AppShell>
  );
};

export default SeasonPage;
