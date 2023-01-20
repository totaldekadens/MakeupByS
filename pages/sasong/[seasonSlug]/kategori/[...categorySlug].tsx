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
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/BreadCrumb";
import Cart from "../../../../components/cart/Cart";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import MarginTopContainer from "../../../../components/layout/MarginTopContainer";
import WrapContainer from "../../../../components/layout/WrapContainer";
import ProductCard from "../../../../components/product/ProductCard";
import { CategoryDocument } from "../../../../models/Category";
import { SeasonDocument } from "../../../../models/Season";
import { PopulatedProduct } from "../../../../utils/types";
import useFetchHelper from "../../../../utils/useFetchHelper";
import ErrorPage from "../../../_error";

const CategoryPage: NextPage = (props) => {
  const router = useRouter();
  const { categorySlug, seasonSlug } = router.query;
  const [products, setProducts] = useState<PopulatedProduct[]>([]);
  const [category, setCategory] = useState<CategoryDocument>();
  const [season, setSeason] = useState<SeasonDocument>();
  const [status, setStatus] = useState(200);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingSeason, setIsLoadingSeason] = useState(true);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);

  // Fetching via useeffect. Todo if time: #66: Tried with getStaticProps,
  //but couldnt get ahead of it probably
  useEffect(() => {
    if (categorySlug) {
      useFetchHelper(
        setStatus,
        setIsLoadingProducts,
        setProducts,
        `/api/open/subproduct/categorybyseason/${categorySlug[0]}?seasonSlug=${seasonSlug}`
      );
      useFetchHelper(
        setStatus,
        setIsLoadingCategory,
        setCategory,
        `/api/open/category/${categorySlug[0]}`
      );
    }
    if (seasonSlug) {
      useFetchHelper(
        setStatus,
        setIsLoadingSeason,
        setSeason,
        `/api/open/season/${seasonSlug}`
      );
    }
  }, [categorySlug]);

  if (
    !isLoadingProducts &&
    !isLoadingSeason &&
    !isLoadingCategory &&
    categorySlug &&
    seasonSlug &&
    status > 299
  ) {
    return <ErrorPage statusCode={status} />;
  }

  return (
    <>
      <Head>
        <title>{category?.title + " - MakeUpByS"}</title>
        <meta property="og:title" content={`${category?.title} - MakeUpByS`} />
      </Head>
      <AppShell
        fixed={false}
        header={<Header />}
        footer={<Footer />}
        styles={(theme) => ({
          main: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        })}
      >
        <MarginTopContainer>
          {!season || !category ? null : (
            <Flex sx={{ width: "100%" }}>
              <Breadcrumbs>
                <BreadCrumb href={"/"} title={"Hem"} />
                <BreadCrumb
                  href={`/sasong/${season?.slug}`}
                  title={season?.title}
                />
                {categorySlug ? (
                  <BreadCrumb
                    href={`/sasong/${season?.slug}/kategori/${categorySlug[0]}`}
                    title={category?.title}
                  />
                ) : null}
              </Breadcrumbs>
            </Flex>
          )}
          <WrapContainer>
            {!products ? null : (
              <>
                <Flex
                  direction={"column"}
                  align="center"
                  sx={{ width: "100%" }}
                >
                  <Title order={1}>{category?.title}</Title>
                  <Text color="dimmed">{category?.description}</Text>
                </Flex>
                {products ? (
                  <Flex mt="xl" wrap="wrap" justify={"center"}>
                    <Grid justify={"center"}>
                      {products?.map((product, index) => {
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
        </MarginTopContainer>
        <Cart />
      </AppShell>
    </>
  );
};

export default CategoryPage;
