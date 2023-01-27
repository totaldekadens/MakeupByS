import { AppShell, Title, Button, Text, Accordion, Flex } from "@mantine/core";
import { NextPage } from "next";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { useSession, signIn, signOut } from "next-auth/react";
import Cart from "../components/cart/Cart";
import { useEffect, useState } from "react";
import OrderSummary from "../components/OrderSummary";
import WrapContainer from "../components/layout/WrapContainer";
import useFetchHelper from "../utils/useFetchHelper";
import ErrorPage from "./_error";
import MarginTopContainer from "../components/layout/MarginTopContainer";
import { PopulatedOrder } from "../utils/types";
import Head from "next/head";

const MyPage: NextPage = () => {
  const { data: session } = useSession();
  const [status, setStatus] = useState(200);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [orders, setOrders] = useState<PopulatedOrder[]>();

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
    orders.sort((a, b) => (a.orderNo < b.orderNo ? 1 : -1));
  }
  return (
    <>
      <Head>
        <title>Min sida - MakeUpByS</title>
        <meta property="og:title" content="Min sida - MakeUpByS" />
        <meta property="og:url" content="https://makeupbys.se/minsida" />
      </Head>
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
        <MarginTopContainer>
          <WrapContainer>
            <Title
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  fontSize: 30,
                },
              })}
              order={1}
            >
              Välkommen {session?.user.name.replace(/ .*/, "")} !
            </Title>
            <Text align="center">
              Nedan kan du se dina senaste beställningar
            </Text>
            <Flex
              direction={"column"}
              mt={40}
              mb={40}
              justify={"center"}
              align="center"
              sx={{ width: "100%" }}
            >
              {orders ? (
                orders.map((order, index: number) => {
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
            <Button
              sx={(theme) => ({
                "&:hover": {
                  backgroundColor: theme.colors.brand[8],
                  color: theme.colors.brand[0],
                  borderColor: theme.colors.brand[0],
                },
              })}
              mx={10}
              color="white"
              onClick={() => signOut()}
            >
              Logga ut
            </Button>
          </WrapContainer>
        </MarginTopContainer>
        <Cart />
      </AppShell>
    </>
  );
};

export default MyPage;
