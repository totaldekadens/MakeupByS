import {
  AppShell,
  Title,
  Flex,
  Select,
  Table,
  MediaQuery,
  Menu,
  Text,
  Autocomplete,
  TextInput,
} from "@mantine/core";
import { GetServerSideProps, NextPage } from "next";
import HeaderCheckout from "../../../components/layout/HeaderCheckout";
import { useEffect, useRef, useState } from "react";
import dbConnect from "../../../utils/dbConnect";
import Options from "../../../components/admin/Options";
import { PopulatedOrder, PopulatedProduct } from "../../../utils/types";
import { SelectType } from "../../../components/admin/SelectStatus";
import SubProduct from "../../../models/SubProduct";
import MainProduct from "../../../models/MainProduct";
import Category, { CategoryDocument } from "../../../models/Category";
import Color from "../../../models/Color";
import Season from "../../../models/Season";
import OverviewProduct from "../../../components/admin/product/OverviewProduct";
import { IconChevronDown } from "@tabler/icons";
import Link from "next/link";
import Head from "next/head";

type Props = {
  products: PopulatedProduct[];
};

const ProductHandler: NextPage<Props> = ({ products }) => {
  const [currentProducts, setCurrentProducts] =
    useState<PopulatedProduct[]>(products);
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("Överblick");
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState(""); // Autocomplete
  // Refs
  const valueRef = useRef<any | null>();
  valueRef.current = products;

  // If product is updated the productlist will be updated
  useEffect(() => {
    const updateProducts = async () => {
      const response = await fetch("/api/open/subproduct");
      let result = await response.json();
      if (result.success) {
        setCurrentProducts(result.data);
        setIsUpdated(false);
      }
      setIsUpdated(false);
    };
    updateProducts();
  }, [isUpdated]);

  // Filtering products depending on search input
  useEffect(() => {
    const updateProducts = async () => {
      const filterProducts = products.filter((product) =>
        product.partNo.includes(searchValue.toUpperCase())
      );
      setCurrentProducts(filterProducts);
    };
    updateProducts();
  }, [searchValue]);

  const list = [
    { label: "Överblick", value: "/admin/produkter" },
    { label: "Skapa produkt", value: "/admin/produkter/skapa" },
  ];

  const rows = currentProducts.map((product, index) => (
    <OverviewProduct
      key={index}
      product={product}
      setIsUpdated={setIsUpdated}
    />
  ));
  return (
    <>
      <Head>
        <title>Överblick produkter - MakeUpByS</title>
        <meta property="og:title" content={`Överblick produkter - MakeUpByS`} />
      </Head>
      <AppShell fixed={false} header={<HeaderCheckout />}>
        <Flex direction={"column"} align="center" style={{ marginTop: 60 }}>
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
              <Flex
                gap={5}
                mt={20}
                justify="space-between"
                sx={{ width: "100%" }}
              >
                <TextInput
                  radius={"md"}
                  color="black"
                  styles={{
                    wrapper: { color: "black" },
                    root: { color: "black" },
                    input: {
                      borderBottom: "1px solid #dee2e6",
                      color: "black",
                      "::placeholder": { color: "black" },
                    },
                  }}
                  placeholder="Sök på produkt.."
                  value={searchValue}
                  onChange={(event) =>
                    setSearchValue(event.currentTarget.value)
                  }
                />
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

            <Flex
              direction={"column"}
              p={30}
              mt="xl"
              sx={(theme) => ({
                border: `1px solid ${theme.colors.gray[3]}`,
                borderRadius: "10px",
                width: "640px",

                [theme.fn.smallerThan("sm")]: {
                  padding: 10,
                  width: "100%",
                },
              })}
            >
              <Table>
                <thead>
                  <tr>
                    <th>Produkt</th>
                    <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                      <th>Art.nr</th>
                    </MediaQuery>
                    <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                      <th>Kategori</th>
                    </MediaQuery>
                    <th>Res. antal</th>
                    <th>Tillg. antal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </Flex>
          </Flex>
        </Flex>
      </AppShell>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  await dbConnect();

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
      populate: { path: "seasons", model: Season },
    });

  return {
    props: {
      products: JSON.parse(JSON.stringify(subProducts)),
    },
  };
};

export default ProductHandler;
