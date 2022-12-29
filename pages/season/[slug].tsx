import { AppShell, Title, Box } from "@mantine/core";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Category from "../../models/Category";
import Color from "../../models/Color";
import MainProduct from "../../models/MainProduct";
import SubProduct, { SubProductDocument } from "../../models/SubProduct";
import dbConnect from "../../utils/dbConnect";

type Props = {
  products: any;
};

const Season: NextPage<Props> = ({ products }) => {
  const router = useRouter();
  const { slug } = router.query;

  console.log(products);

  return (
    <>
      <AppShell fixed={false} header={<Header />} footer={<Footer />}>
        <Box style={{ marginTop: 60, minHeight: "100vh" }}>
          <Title order={1}>{slug}</Title>
        </Box>
      </AppShell>
      <Header />
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

  // todo: Fix domain in .env.local
  const { slug } = context.params as IParams;
  const response = await fetch(
    `http://localhost:3000/api/open/subproduct/season/${slug}`
  );

  const products = await response.json();

  return {
    props: {
      products,
    },
  };
};
export default Season;
