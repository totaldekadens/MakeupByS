import { AppShell, Flex, Menu, Select, Title, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Options from "../../../../components/admin/Options";
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
  products: SubProductDocument[];
  colors: ColorDocument[];
  colorTags: ColorTagDocument[];
  mainProducts: PopulatedMainProduct[]; //MainProductDocument[];
  categories: CategoryDocument[];
};

const CreateProduct: NextPage<Props> = ({
  products,
  colors,
  colorTags,
  mainProducts,
  categories,
}) => {
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("Skapa produkt");
  const [isCreated, setisCreated] = useState<boolean>(false);
  const list = [
    { label: "Överblick", value: "/admin/produkter" },
    { label: "Skapa produkt", value: "/admin/produkter/skapa" },
  ];
  return (
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
            <Flex direction={"column"} sx={{ width: "100%" }}>
              <Title mb={20} order={3}>
                Skapa subartikel
              </Title>
              <CreateSubProductForm
                setIsCreated={setisCreated}
                mainProducts={mainProducts}
              />
            </Flex>
            <Flex direction={"column"} sx={{ width: "100%" }}>
              <Title mb={20} order={3}>
                Skapa huvudartikel
              </Title>
            </Flex>
          </Flex>
        </WrapContainer>
      </Flex>
    </AppShell>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

  const mainProducts = await MainProduct.find({}).populate({
    path: "category",
    model: Category,
  });
  const colors = await Color.find({});
  const colorTags = await ColorTag.find({});
  const subProducts = await SubProduct.find({});
  const categories = await Category.find({});

  return {
    props: {
      products: JSON.parse(JSON.stringify(subProducts)),
      mainProducts: JSON.parse(JSON.stringify(mainProducts)),
      colors: JSON.parse(JSON.stringify(colors)),
      categories: JSON.parse(JSON.stringify(categories)),
      colorTags: JSON.parse(JSON.stringify(colorTags)),
    },
  };
};

export default CreateProduct;
