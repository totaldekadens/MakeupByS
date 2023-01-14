import { AppShell, Title, Flex, Accordion, Text } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import HeaderCheckout from "../../components/layout/HeaderCheckout";
import { useEffect, useRef, useState } from "react";
import dbConnect from "../../utils/dbConnect";
import Options from "../../components/admin/Options";
import OrderSummary from "../../components/OrderSummary";
import Router from "next/router";
import Order from "../../models/Order";
import OrderStatus from "../../models/OrderStatus";
import User from "../../models/User";
import { PopulatedOrder } from "../../utils/types";

type Props = {
  orders: PopulatedOrder[];
};

const Admin: NextPage<Props> = ({ orders }) => {
  const [activeOrders, setActiveOrders] = useState<number>(0);

  // Refs
  const valueRef = useRef<any | null>();
  valueRef.current = orders;

  // Returns how many orders needs to be handled
  useEffect(() => {
    const getNumber = () => {
      let orderReference: PopulatedOrder[] = valueRef.current;
      if (orders) {
        const getActiveOrders = orderReference.filter(
          (order) => order.status.status == "Behandlas"
        );
        const getLength = getActiveOrders.length;
        setActiveOrders(getLength);
      }
    };
    getNumber();
  }, [orders]);

  return (
    <>
      <AppShell fixed={false} header={<HeaderCheckout />}>
        <Flex direction={"column"} align="center" style={{ marginTop: 60 }}>
          <Title order={1}>ADMIN</Title>
          <Options />
          <Flex
            direction={"column"}
            mt={40}
            mb={40}
            justify={"center"}
            align="center"
            sx={{ width: "100%" }}
          >
            {orders ? (
              orders.map((order, index) => {
                return (
                  <Accordion
                    key={index}
                    styles={{ control: { padding: 5 } }}
                    sx={(theme) => ({
                      marginTop: 20,
                      width: "550px",
                      [theme.fn.smallerThan("sm")]: {
                        width: "470px",
                      },
                      [theme.fn.smallerThan("xs")]: {
                        width: "100%",
                        padding: 0,
                      },
                    })}
                    defaultValue={null}
                  >
                    <Accordion.Item value="customization">
                      <Accordion.Control>
                        <Flex justify={"space-between"} align={"center"}>
                          <Text
                            sx={(theme) => ({
                              [theme.fn.smallerThan("xs")]: {
                                fontSize: 14,
                              },
                            })}
                          >
                            {"Order: " + order.orderNo}
                          </Text>
                          <Flex align={"center"} gap={15}>
                            <Text
                              size={14}
                              sx={(theme) => ({
                                [theme.fn.smallerThan("xs")]: {
                                  fontSize: 11,
                                },
                              })}
                            >
                              {order.shippingDate
                                ? order.shippingDate
                                : order.registerDate}
                            </Text>
                            <Flex
                              p={6}
                              pt={2}
                              pb={2}
                              bg={order.status.color}
                              sx={(theme) => ({
                                borderRadius: "7px",
                                [theme.fn.smallerThan("xs")]: {
                                  padding: 4,
                                },
                              })}
                            >
                              <Text
                                sx={(theme) => ({
                                  [theme.fn.smallerThan("xs")]: {
                                    fontSize: 10,
                                  },
                                })}
                                size={12}
                              >
                                {order.status.status}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      </Accordion.Control>
                      <Accordion.Panel>
                        <OrderSummary order={order} />
                      </Accordion.Panel>
                    </Accordion.Item>
                  </Accordion>
                );
              })
            ) : (
              <Text>Du har ännu inte lagt en order</Text>
            )}
          </Flex>
        </Flex>
      </AppShell>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  await dbConnect();

  const res: PopulatedOrder[] = await Order.find({})
    .populate({
      path: "status",
      model: OrderStatus,
    })
    .populate({
      path: "existingCustomer",
      model: User,
    });

  return {
    props: { orders: JSON.parse(JSON.stringify(res)) },
  };
};

export default Admin;
