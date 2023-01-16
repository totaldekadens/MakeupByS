import {
  AppShell,
  Title,
  Flex,
  Select,
  Table,
  MediaQuery,
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

type Props = {
  products: PopulatedProduct[];
};

const ProductHandler: NextPage<Props> = ({ products }) => {
  const [activeOrders, setActiveOrders] = useState<number>(0);
  const [currentProducts, setCurrentProducts] =
    useState<PopulatedProduct[]>(products);
  const [currentStatus, setCurrentStatus] = useState<string | null>(
    "Överblick"
  );
  const [isUpdated, setIsUpdated] = useState<boolean>(false);
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

  const selectList = [
    { label: "Överblick", value: "OverviewProducts" },
    { label: "Skapa produkt", value: "CreateProduct" },
    { label: "Ändra produkt", value: "EditProduct" },
    { label: "Ta bort produkt", value: "DeleteProduct" },
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
      <AppShell fixed={false} header={<HeaderCheckout />}>
        <Flex direction={"column"} align="center" style={{ marginTop: 60 }}>
          <Title>ADMIN</Title>
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
              <Select
                placeholder={currentStatus ? currentStatus : "Meny"}
                value={currentStatus}
                onChange={setCurrentStatus}
                data={selectList}
                styles={{ root: { width: 150 } }}
              />
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
