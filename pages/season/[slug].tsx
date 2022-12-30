import { AppShell, Title, Box, Flex, Text } from "@mantine/core";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
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

  console.log(products);

  return (
    <>
      <AppShell fixed={false} header={<Header />} footer={<Footer />}>
        <Box style={{ marginTop: 60, minHeight: "100vh" }}>
          <Flex direction={"column"} align="center" sx={{ width: "100%" }}>
            <Title order={1}>{season?.data?.title}</Title>
            <Text>{season?.data?.description}</Text>
          </Flex>
          <Flex>
            {products?.data?.map((product: any, index: number) => {
              return (
                <Title key={index} order={3}>
                  {product.title}
                </Title>
              );
            })}
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
