import {
  AppShell,
  Box,
  Button,
  Flex,
  Grid,
  Title,
  Text,
  Breadcrumbs,
  Anchor,
} from "@mantine/core";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
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
  const [exist, setExist] = useState(true);

  // Fetching via useeffect. Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch(`/api/open/subproduct/season/${seasonSlug}`);
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
    const fetchSeason = async () => {
      try {
        let response = await fetch(`/api/open/season/${seasonSlug}`);
        let result = await response.json();
        if (result.success) {
          setSeason(result.data);
          return;
        }
        setExist(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSeason();
    fetchProducts();
  }, [seasonSlug]);

  // Check how to delay error page.
  //if (!exist) return <ErrorPage statusCode={404} />;

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
      <Flex sx={{ width: "100%" }}>
        <Breadcrumbs>
          <Link href={"/"}>
            <Text color="brand.6" size="sm">
              Hem
            </Text>
          </Link>
          <Link color="brand.6" href={`/season/${season?.slug}`}>
            <Text color="brand.6" size="sm">
              {season?.title}
            </Text>
          </Link>
        </Breadcrumbs>
      </Flex>
      <Box style={{ marginTop: 60, minHeight: "100vh" }}>
        <>
          <Flex direction={"column"} align="center" sx={{ width: "100%" }}>
            <Title order={1}>{season?.title}</Title>
            <Text>{season?.description}</Text>
          </Flex>
          {products[0] ? (
            <Flex justify={"center"} mt="sm" gap="lg">
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
                  <Grid.Col key={index} span={4}>
                    <ProductCard product={product} />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Flex>
        </>
      </Box>
    </AppShell>
  );
};

export default SeasonPage;
