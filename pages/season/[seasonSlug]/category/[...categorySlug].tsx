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
import { useEffect, useState, useRef } from "react";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import ProductCard from "../../../../components/ProductCard";
import { SeasonDocument } from "../../../../models/Season";
import ErrorPage from "../../../ErrorPage";

const CategoryPage: NextPage = (props) => {
  const router = useRouter();
  const { categorySlug, seasonSlug } = router.query;
  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<SeasonDocument>();
  const [exist, setExist] = useState(true);
  const [season, setSeason] = useState<SeasonDocument>();

  // Fetching via useeffect. Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response = await fetch(
          `/api/open/subproduct/categorybyseason/${categorySlug}?seasonSlug=${seasonSlug}`
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
    fetchCategory();
    fetchProducts();
  }, [categorySlug]);

  // Check how to delay error page.
  //if (!exist) return <ErrorPage statusCode={404} />;

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
          <Link
            color="brand.6"
            href={`/season/${season?.slug}/category/${categorySlug}`}
          >
            <Text color="brand.6" size="sm">
              {category?.title}
            </Text>
          </Link>
        </Breadcrumbs>
      </Flex>
      <Box style={{ marginTop: 60, minHeight: "100vh" }}>
        <>
          <Flex direction={"column"} align="center" sx={{ width: "100%" }}>
            <Title order={1}>{category?.title}</Title>
            <Text>{category?.description}</Text>
          </Flex>
          {products[0] ? (
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
          ) : null}
        </>
      </Box>
    </AppShell>
  );
};

export default CategoryPage;
