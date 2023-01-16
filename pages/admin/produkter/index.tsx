import {
  AppShell,
  Title,
  Flex,
  Accordion,
  Text,
  Select,
  Pagination,
  Table,
  MediaQuery,
} from "@mantine/core";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import HeaderCheckout from "../../../components/layout/HeaderCheckout";
import { useEffect, useRef, useState } from "react";
import dbConnect from "../../../utils/dbConnect";
import Options from "../../../components/admin/Options";
import { PopulatedOrder, PopulatedProduct } from "../../../utils/types";
import { SelectType } from "../../../components/admin/SelectStatus";
import SubProduct from "../../../models/SubProduct";
import MainProduct from "../../../models/MainProduct";
import Category from "../../../models/Category";
import Color from "../../../models/Color";
import Season from "../../../models/Season";
import ContainerWithBorder from "../../../components/layout/ContainerWithBorder";
import OverviewProduct from "../../../components/admin/OverviewProduct";

type Props = {
  products: PopulatedProduct[];
};

const ProductHandler: NextPage<Props> = ({ products }) => {
  const [activeOrders, setActiveOrders] = useState<number>(0);
  const [currentProducts, setCurrentOrders] = useState<PopulatedOrder[]>();
  const [currentStatus, setCurrentStatus] = useState<string | null>(
    "Överblick"
  );
  // Refs
  const valueRef = useRef<any | null>();
  valueRef.current = products;

  useEffect(() => {
    // Returns products with chosen status
    /*   const getCurrentOrders = () => {
      if (products) {
        let orderReference: PopulatedOrder[] = valueRef.current;
        const filteredOrders = orderReference.filter((products) => {
          const id = product.status!._id?.toString();
          if (id == currentStatus) {
            return true;
          }
          return false;
        });

        setCurrentOrders(filteredOrders);
      }
    };
    getCurrentOrders();  */
  }, [products]);

  // Gets an array with statuses in use and then adjusts it to a Select component
  /*  let statuses: any= [];
  if (products) {
    products.forEach((product) => {
      if (statuses.length < 1) {
        statuses.push(product.status);
        return;
      }
      const findStatus = statuses.find(
        (status) => status.status == product.status.status
      );
      if (!findStatus) {
        statuses.push(product.status);
        return;
      }
    });
  }
  const selectList: SelectType[] = statuses.map((status) => ({
    label: status.status,
    value: status._id ? status._id.toString() : "",
  })); */

  // Sorts products in a descending product
  /*   if (currentOrders) {
    currentOrders.sort((a, b) => (a.orderNo < b.orderNo ? 1 : -1));
  } */

  const selectList = [
    { label: "Överblick", value: "OverviewProducts" },
    { label: "Skapa produkt", value: "CreateProduct" },
    { label: "Ändra produkt", value: "EditProduct" },
    { label: "Ta bort produkt", value: "DeleteProduct" },
  ];

  const rows = products.map((product, index) => (
    <OverviewProduct key={index} product={product} />
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
                width: "600px",
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
                width: "600px",

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
    props: { products: JSON.parse(JSON.stringify(subProducts)) },
  };
};

export default ProductHandler;
