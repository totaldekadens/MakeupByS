import { AppShell, Title, Flex, Accordion, Text } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import HeaderCheckout from "../../components/layout/HeaderCheckout";
import { useEffect, useRef, useState } from "react";
import dbConnect from "../../utils/dbConnect";
import Options from "../../components/admin/Options";
import OrderSummary from "../../components/OrderSummary";

type Props = {
  orders: any;
};

const Admin: NextPage<Props> = ({ orders }) => {
  const [activeOrders, setActiveOrders] = useState(0);

  // Refs
  const valueRef = useRef<any | null>();
  valueRef.current = orders;

  // Returns how many orders needs to be handled
  useEffect(() => {
    const getNumber = () => {
      let orderReference = valueRef.current;
      if (orders) {
        const getActiveOrders = orderReference.filter(
          (order: any) => order.status.status == "Behandlas"
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
              orders.map((order: any) => {
                return (
                  <Accordion
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
                            Order: {order.orderNo}
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

  let response = await fetch(`${process.env.NEXT_DOMAIN}/api/admin/order/`);
  let result = await response.json();
  return {
    props: { orders: result.data },
  };
};

export default Admin;
