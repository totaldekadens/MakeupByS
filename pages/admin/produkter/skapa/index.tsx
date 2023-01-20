import {
  AppShell,
  Flex,
  Menu,
  Select,
  Title,
  Text,
  Accordion,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import Options from "../../../../components/admin/Options";
import CreateMainProductForm from "../../../../components/admin/product/CreateMainProductForm";
import CreateSubProductForm from "../../../../components/admin/product/CreateSubProductForm";
import HeaderCheckout from "../../../../components/layout/HeaderCheckout";
import WrapContainer from "../../../../components/layout/WrapContainer";
import Category, { CategoryDocument } from "../../../../models/Category";
import Color, { ColorDocument } from "../../../../models/Color";
import ColorTag, { ColorTagDocument } from "../../../../models/ColorTag";
import MainProduct, {
  MainProductDocument,
} from "../../../../models/MainProduct";
import Season from "../../../../models/Season";
import SubProduct, { SubProductDocument } from "../../../../models/SubProduct";
import dbConnect from "../../../../utils/dbConnect";
import { PopulatedMainProduct } from "../../../../utils/types";

type Props = {
  mainProducts: PopulatedMainProduct[];
  categories: CategoryDocument[];
};

const CreateProduct: NextPage<Props> = ({ mainProducts, categories }) => {
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("Skapa produkt");
  const [isCreated, setisCreated] = useState<boolean>(false);
  const list = [
    { label: "Överblick", value: "/admin/produkter" },
    { label: "Skapa produkt", value: "/admin/produkter/skapa" },
  ];
  return (
    <>
      <Head>
        <title>Skapa produkt - MakeUpByS</title>
        <meta property="og:title" content={`Skapa produkt - MakeUpByS`} />
      </Head>
      <AppShell fixed={false} header={<HeaderCheckout />}>
        <Flex direction={"column"} align="center">
          <WrapContainer>
            <Options />

            <Flex
              direction={"column"}
              mt={40}
              mb={40}
              justify={"center"}
              align="center"
              sx={{ width: "100%" }}
            >
              <Flex
                justify="flex-end"
                sx={(theme) => ({
                  width: "640px",
                  [theme.fn.smallerThan("sm")]: {
                    width: "100%",
                  },
                })}
              >
                <Flex gap={5} mt={20}>
                  <Menu
                    styles={(theme) => ({
                      dropdown: { width: 300 },
                      item: {
                        width: 180,
                        height: 50,
                        "&:hover": { backgroundColor: theme.colors.brand[1] },
                      },
                    })}
                    shadow="md"
                    opened={opened}
                    onChange={setOpened}
                  >
                    <Menu.Target>
                      <Flex align={"center"} sx={{ cursor: "pointer" }}>
                        <Text>{currentPage}</Text>
                        <IconChevronDown style={{ marginLeft: 13 }} size={14} />
                      </Flex>
                    </Menu.Target>
                    <Menu.Dropdown w={200}>
                      {list.map((button, index) => {
                        return (
                          <Menu.Item key={index} color="brand.7">
                            <Link key={index} href={button.value}>
                              {button.label}
                            </Link>
                          </Menu.Item>
                        );
                      })}
                    </Menu.Dropdown>
                  </Menu>
                </Flex>
              </Flex>
            </Flex>
            <Flex
              direction={"column"}
              p={30}
              sx={(theme) => ({
                border: `1px solid ${theme.colors.gray[3]}`,
                borderRadius: "10px",
                width: "680px",

                [theme.fn.smallerThan("sm")]: {
                  padding: 10,
                  width: "100%",
                },
              })}
            >
              <Accordion
                styles={{
                  item: { borderBottom: "unset" },
                }}
                defaultValue="customization"
              >
                <Accordion.Item value="sub">
                  <Accordion.Control>
                    <Title order={4}>Skapa subartikel</Title>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <CreateSubProductForm
                      setIsCreated={setisCreated}
                      mainProducts={mainProducts}
                    />
                  </Accordion.Panel>
                </Accordion.Item>
                <Accordion.Item value="main">
                  <Accordion.Control>
                    <Title order={4}>Skapa huvudartikel</Title>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <CreateMainProductForm
                      setIsCreated={setisCreated}
                      categories={categories}
                    />
                  </Accordion.Panel>
                </Accordion.Item>
              </Accordion>
            </Flex>
          </WrapContainer>
        </Flex>
      </AppShell>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const mainProducts = await MainProduct.find({}).populate({
    path: "category",
    model: Category,
  });
  const categories = await Category.find({});

  return {
    props: {
      mainProducts: JSON.parse(JSON.stringify(mainProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
};

export default CreateProduct;
