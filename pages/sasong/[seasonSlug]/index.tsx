import {
  AppShell,
  Button,
  Flex,
  Grid,
  Title,
  Text,
  Breadcrumbs,
} from "@mantine/core";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import BreadCrumb from "../../../components/BreadCrumb";
import Cart from "../../../components/cart/Cart";
import Footer from "../../../components/layout/Footer";
import Header from "../../../components/layout/Header";
import MarginTopContainer from "../../../components/layout/MarginTopContainer";
import WrapContainer from "../../../components/layout/WrapContainer";
import ProductCard from "../../../components/product/ProductCard";
import Category, { CategoryDocument } from "../../../models/Category";
import Color, { ColorDocument } from "../../../models/Color";
import MainProduct from "../../../models/MainProduct";
import Season, { SeasonDocument } from "../../../models/Season";
import SubProduct from "../../../models/SubProduct";
import dbConnect from "../../../utils/dbConnect";
import { PopulatedProduct } from "../../../utils/types";

type Props = {
  products: PopulatedProduct[];
  season: SeasonDocument;
};

const SeasonPage: NextPage<Props> = ({ products, season }) => {
  const router = useRouter();
  const { seasonSlug } = router.query;

  let categories: CategoryDocument[] = [];
  if (products) {
    products.forEach((product) => {
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
    <>
      <Head>
        <title>{season?.title + " - MakeUpByS"}</title>
        <meta property="og:title" content={`${season?.title} - MakeUpByS`} />
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
          {!season ? null : (
            <Flex sx={{ width: "100%" }}>
              <Breadcrumbs>
                <BreadCrumb href={"/"} title={"Hem"} />
                <BreadCrumb
                  href={`/sasong/${season?.slug}`}
                  title={season?.title}
                />
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
                  <Title color={"brand.8"} order={1}>{season?.title}</Title>
                  <Text align="center" mt={10} color="dimmed">
                    {season?.description}
                  </Text>
                </Flex>
                {products[0] ? (
                  <Flex justify={"center"} mt="sm" gap="lg" wrap={"wrap"}>
                    {categories.map((category, index) => {
                      return (
                        <Link
                          key={index}
                          href={`/sasong/${seasonSlug}/kategori/${category.slug}`}
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
                    {products?.map((product, index) => {
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
          </WrapContainer>
        </MarginTopContainer>
        <Cart />
      </AppShell>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const seasons = await Season.find({});

  const paths = seasons.map((season: SeasonDocument) => ({
    params: { seasonSlug: season.slug },
  }));

  return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await dbConnect();

  const season = await Season.findOne({ slug: params?.seasonSlug });

  const subProducts = await SubProduct.find({})
    .populate({
      path: "mainProduct",
      model: MainProduct,
      populate: {
        path: "category",
        model: Category,
      },
    })
    .populate({
      path: "colors",
      model: Color,
      populate: {
        path: "seasons",
        model: Season,
      },
    });

  // Todo if time: #67 Find a better way. Should be able to filter the query above.
  // Check aggregation and virtuals with match
  let list: any = [];
  subProducts.forEach((product) => {
    product.colors.forEach((color: any) => {
      color.seasons.forEach((season: any) => {
        if (season.slug == params?.seasonSlug) {
          list.push(product);
        }
      });
    });
  });

  return {
    props: {
      products: JSON.parse(JSON.stringify(list)),
      season: JSON.parse(JSON.stringify(season)),
    },
  };
};

export default SeasonPage;
