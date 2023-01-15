import { AppShell, Title, Flex, Accordion, Text, Select } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import HeaderCheckout from "../../components/layout/HeaderCheckout";
import { useEffect, useRef, useState } from "react";
import dbConnect from "../../utils/dbConnect";
import Options from "../../components/admin/Options";
import OrderSummary from "../../components/OrderSummary";
import Order from "../../models/Order";
import OrderStatus, { OrderStatusDocument } from "../../models/OrderStatus";
import User from "../../models/User";
import { PopulatedOrder } from "../../utils/types";
import { SelectType } from "../../components/admin/SelectStatus";

type Props = {
  orders: PopulatedOrder[];
};

const Admin: NextPage<Props> = ({ orders }) => {
  const [activeOrders, setActiveOrders] = useState<number>(0);
  const [currentStatus, setCurrentStatus] = useState<string | null>(
    "63b94b6966d02095eb80e861"
  );
  const [currentOrders, setCurrentOrders] = useState<PopulatedOrder[]>();

  // Refs
  const valueRef = useRef<any | null>();
  valueRef.current = orders;

  useEffect(() => {
    // Returns how many orders needs to be handled
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
    // Returns orders with chosen status
    const getCurrentOrders = () => {
      if (orders) {
        let orderReference: PopulatedOrder[] = valueRef.current;
        const filteredOrders = orderReference.filter((order) => {
          const id = order.status!._id?.toString();
          if (id == currentStatus) {
            return true;
          }
          return false;
        });

        setCurrentOrders(filteredOrders);
      }
    };
    getCurrentOrders();
    getNumber();
  }, [orders, currentStatus]);

  // Gets an array with statuses in use and then adjusts it to a Select component
  let statuses: OrderStatusDocument[] = [];
  if (orders) {
    orders.forEach((order) => {
      if (statuses.length < 1) {
        statuses.push(order.status);
        return;
      }
      const findStatus = statuses.find(
        (status) => status.status == order.status.status
      );
      if (!findStatus) {
        statuses.push(order.status);
        return;
      }
    });
  }
  const selectList: SelectType[] = statuses.map((status) => ({
    label: status.status,
    value: status._id ? status._id.toString() : "",
  }));

  // Sorts orders in a descending order
  if (currentOrders) {
    currentOrders.sort((a, b) => (a.orderNo < b.orderNo ? 1 : -1));
  }

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
            <Flex
              justify="flex-end"
              sx={(theme) => ({
                width: "550px",
                [theme.fn.smallerThan("sm")]: {
                  width: "470px",
                },
                [theme.fn.smallerThan("xs")]: {
                  width: "100%",
                },
              })}
            >
              <Select
                placeholder="Välj ny status"
                value={currentStatus}
                onChange={setCurrentStatus}
                data={selectList}
                styles={{ root: { width: 150 } }}
              />
            </Flex>

            {currentOrders ? (
              currentOrders.map((order, index) => {
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
              <Text></Text>
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
