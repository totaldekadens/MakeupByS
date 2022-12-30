import { AppShell, Title, Box, Flex, Text, Button, Grid } from "@mantine/core";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import ProductCard from "../../components/ProductCard";
import { CategoryDocument } from "../../models/Category";
import { SeasonDocument } from "../../models/Season";
import SubProduct, { SubProductDocument } from "../../models/SubProduct";
import dbConnect from "../../utils/dbConnect";

type Props = {
  products: any;
  season: any;
};

const Season: NextPage<Props> = ({ products, season }) => {
  const router = useRouter();
  const { slug } = router.query;

  const path = "cate";

  // Gets available categories on the list of products
  let categories: CategoryDocument[] = [];
  if (products?.data) {
    products.data.forEach((product: any) => {
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
      <AppShell fixed={false} header={<Header />} footer={<Footer />}>
        <Box style={{ marginTop: 60, minHeight: "100vh" }}>
          <Flex direction={"column"} align="center" sx={{ width: "100%" }}>
            <Title order={1}>{season?.data?.title}</Title>
            <Text>{season?.data?.description}</Text>
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
              {products?.data?.map((product: any, index: number) => {
                return (
                  <Grid.Col key={index} span={4}>
                    <ProductCard product={product} />
                  </Grid.Col>
                );
              })}
            </Grid>
          </Flex>
        </Box>
      </AppShell>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const products: SubProductDocument[] = await SubProduct.find({});

  const paths = products.map((product) => ({
    params: { slug: product.slug },
  }));

  return { paths, fallback: true };
};

interface IParams extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  await dbConnect();

  const { slug } = context.params as IParams;
  const getProductsBySeason = await fetch(
    `${process.env.NEXT_DOMAIN}/api/open/subproduct/season/${slug}`
  );

  const getSeason = await fetch(
    `${process.env.NEXT_DOMAIN}/api/open/season/${slug}`
  );

  const season = await getSeason.json();
  const products = await getProductsBySeason.json();

  return {
    props: {
      products,
      season,
    },
  };
};
export default Season;
