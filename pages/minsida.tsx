import { AppShell, Title, Button, Text, Accordion, Flex } from "@mantine/core";
import { NextPage } from "next";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useSession, signIn, signOut } from "next-auth/react";
import Cart from "../components/cart/Cart";
import { useEffect, useState } from "react";
import OrderSummary from "../components/OrderSummary";
import WrapContainer from "../components/layout/WrapContainer";
import useFetchHelper from "../utils/useFetchHelper";
import ErrorPage from "./ErrorPage";

const MyPage: NextPage = () => {
  const { data: session } = useSession();
  const [status, setStatus] = useState(200);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [orders, setOrders] = useState<any>();

  useEffect(() => {
    useFetchHelper(
      setStatus,
      setIsLoadingOrders,
      setOrders,
      `/api/customer/orders/${session?.user.email}`
    );
  }, [session]);

  if (!isLoadingOrders && status > 299) {
    return <ErrorPage statusCode={status} />;
  }

  // Descending order
  if (orders) {
    orders.sort((a: any, b: any) => (a.orderNo < b.orderNo ? 1 : -1));
  }
  return (
    <>
      <AppShell
        fixed={false}
        header={<Header />}
        footer={<Footer />}
        styles={{
          main: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          },
        }}
      >
        <WrapContainer>
          <Title
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                fontSize: 30,
              },
            })}
            order={1}
          >
            Välkommen {session?.user.name} !
          </Title>
          <Text align="center">Nedan kan du se dina senaste beställningar</Text>
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
                              {order.registerDate}
                            </Text>
                            <Flex
                              p={6}
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
                                size={14}
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
          <Button mx={10} color="white" onClick={() => signOut()}>
            Logga ut
          </Button>
        </WrapContainer>
        <Cart />
      </AppShell>
    </>
  );
};

export default MyPage;