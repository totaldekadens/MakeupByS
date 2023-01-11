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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import BreadCrumb from "../../../../components/BreadCrumb";
import Cart from "../../../../components/cart/Cart";
import Footer from "../../../../components/Footer";
import Header from "../../../../components/Header";
import WrapContainer from "../../../../components/layout/WrapContainer";
import ProductCard from "../../../../components/ProductCard";
import { CategoryDocument } from "../../../../models/Category";
import { SeasonDocument } from "../../../../models/Season";
import useFetchHelper from "../../../../utils/useFetchHelper";
import ErrorPage from "../../../ErrorPage";

const CategoryPage: NextPage = (props) => {
  const router = useRouter();
  const { categorySlug, seasonSlug } = router.query;
  const [products, setProducts] = useState<any>([]);
  const [category, setCategory] = useState<CategoryDocument>();
  const [season, setSeason] = useState<SeasonDocument>();
  const [status, setStatus] = useState(200);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingSeason, setIsLoadingSeason] = useState(true);
  const [isLoadingCategory, setIsLoadingCategory] = useState(true);

  // Fetching via useeffect. Todo if time: #66: Tried with getStaticProps, but couldnt get ahead of it probably bec of node v. 19.
  useEffect(() => {
    useFetchHelper(
      setStatus,
      setIsLoadingProducts,
      setProducts,
      `/api/open/subproduct/categorybyseason/${categorySlug}?seasonSlug=${seasonSlug}`
    );
    useFetchHelper(
      setStatus,
      setIsLoadingCategory,
      setCategory,
      `/api/open/category/${categorySlug}`
    );
    useFetchHelper(
      setStatus,
      setIsLoadingSeason,
      setSeason,
      `/api/open/season/${seasonSlug}`
    );
  }, [categorySlug]);

  if (
    !isLoadingProducts &&
    !isLoadingSeason &&
    !isLoadingCategory &&
    status > 299
  ) {
    return <ErrorPage statusCode={status} />;
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
