import { AppShell, Box, Button, Flex, Grid, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import ProductCard from "../../../../components/ProductCard";
import { CategoryDocument } from "../../../../models/Category";
import { SeasonDocument } from "../../../../models/Season";
import ErrorPage from "../../../ErrorPage";

const CategoryPage: NextPage = (props) => {
  const router = useRouter();
  const { categorySlug, slug } = router.query;
  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<SeasonDocument>();
  const [exist, setExist] = useState(true);

  //console.log(slug, categorySlug);
  //console.log("KOMMER JAG IN HÄR NU? ");
  // Fetching via useeffect. Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch(
          `/api/open/subproduct/season/${categorySlug}`
        );
        let result = await response.json();
        if (result.success) {
          setProducts(result.data);
          return;
        }
        setExist(false);
      } catch (err) {
        console.error(err);
      }
    };
    const fetchCategory = async () => {
      try {
        let response = await fetch(`/api/open/category/${categorySlug}`);
        let result = await response.json();
        if (result.success) {
          setCategory(result.data);
          return;
        }
        setExist(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategory();
    fetchProducts();
  }, [categorySlug]);

  console.log(category);
  console.log(products);
  // Check how to delay error page.
  //if (!exist) return <ErrorPage statusCode={404} />;

  return (
    <AppShell fixed={false} header={<Header />} footer={<Footer />}>
      <Box style={{ marginTop: 60, minHeight: "100vh" }}>
        <>
          <Flex direction={"column"} align="center" sx={{ width: "100%" }}>
            <Title order={1}>{category?.title}</Title>
            <Text>{category?.description}</Text>
          </Flex>
          {products[0] ? (
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
          ) : null}
        </>
      </Box>
    </AppShell>
  );
};

export default CategoryPage;
