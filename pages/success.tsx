import { AppShell, Flex, Title, Text, Box } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LineItem } from "../components/AddToCartIcon";
import { Checkout } from "../components/context/checkoutProvider";
import HeaderCheckout from "../components/HeaderCheckout";
import ContainerWithBorder from "../components/layout/ContainerWithBorder";
import { OrderDocument } from "../models/Order";

const SuccessPage: NextPage = (props) => {
  // Local storage
  const [checkoutLocal, setCheckoutLocal, removeCheckoutLocal] =
    useLocalStorage<Checkout>({
      key: "checkoutLocal",
    });

  const [cartItems, setCartItems, removeCartItems] = useLocalStorage<
    LineItem[]
  >({
    key: "cart",
    defaultValue: [],
  });

  // State
  const [orderConfirmation, setOrderConfirmation] = useState<OrderDocument>();

  // Router
  const router = useRouter();

  // Adjusts quantity on products in DB
  const adjustQuantity = async (sessionId: string) => {
    if (checkoutLocal) {
      let results: any = [];
      for (let i = 0; i < checkoutLocal.cartItems!.length; i++) {
        if (checkoutLocal.cartItems) {
          let cartItem = checkoutLocal.cartItems[i];

          const body = JSON.stringify({ cartItem, sessionId });

          let response = await fetch("/api/open/order", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body,
          });
          let result = await response.json();
          results.push(result);
        }
      }
      return results;
    }
  };

  // Creates order in DB
  const createOrder = async (sessionId: string) => {
    if (checkoutLocal) {
      const body = JSON.stringify({
        checkout: checkoutLocal,
        sessionId,
      });

      let response = await fetch("/api/open/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      let result = await response.json();
      if (result.success) {
        setOrderConfirmation(result.data);
      }
      return result;
    }
  };

  useEffect(() => {
    async function verifyPayment() {
      // Gets session_id from URL-param
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");

      const body = JSON.stringify({ sessionId });

      let response = await fetch("/api/open/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      let result = await response.json();

      if (result.success) {
        await adjustQuantity(result.data.id);
        await createOrder(result.data.id);
        removeCheckoutLocal();
        removeCartItems();
      } else if (response.status == 400) {
        //router.push("/");    // Borttagen bara sålänge jag håller på med ordebekräftelsen.
      } else {
        router.push(`/kassa?message=${result.data}`);
      }
    }
    verifyPayment();
  }, [checkoutLocal]);

  return (
    <AppShell fixed={false} header={<HeaderCheckout />}>
      <Flex
        align="center"
        direction="column"
        style={{ marginTop: 60, width: "100%" }}
      >
        {orderConfirmation ? (
          <>
            <Title order={1}>Orderbekräftelse</Title>
            <ContainerWithBorder>
              <Flex gap={10} align="center" mb={10}>
                <Title order={3}> Order: </Title>
                <Text weight={"bold"}>{orderConfirmation.orderNo}</Text>
              </Flex>

              {orderConfirmation.deliveryAddress ? (
                <>
                  <Box mb={20}>
                    <Title order={4}>Beställare: </Title>
                    <Flex direction={"column"}>
                      <Flex direction="column">
                        <Text>{orderConfirmation.email}</Text>
                        <Text>{orderConfirmation.invoiceAddress.line1},</Text>
                        <Text>
                          {orderConfirmation.invoiceAddress?.line2
                            ? orderConfirmation.invoiceAddress?.line2 + ","
                            : null}
                        </Text>

                        <Flex gap={7}>
                          <Text>
                            {orderConfirmation.invoiceAddress?.postal_code}
                          </Text>
                          <Text>{orderConfirmation.invoiceAddress?.city}</Text>
                        </Flex>
                      </Flex>
                      <Flex
                        gap={3}
                        sx={(theme) => ({
                          [theme.fn.smallerThan("xs")]: {
                            flexDirection: "column",
                          },
                        })}
                      ></Flex>
                    </Flex>
                  </Box>
                  <Box>
                    <Title order={4}>Levereras till: </Title>
                    <Flex direction={"column"}>
                      <Text>{orderConfirmation.name}</Text>
                      <Flex
                        gap={3}
                        sx={(theme) => ({
                          [theme.fn.smallerThan("xs")]: {
                            flexDirection: "column",
                          },
                        })}
                      >
                        <Text>{orderConfirmation.deliveryAddress?.line1},</Text>
                        <Text>
                          {orderConfirmation.deliveryAddress?.line2
                            ? orderConfirmation.deliveryAddress?.line2 + ","
                            : null}
                        </Text>

                        <Flex gap={7}>
                          <Text>
                            {orderConfirmation.deliveryAddress?.postal_code}
                          </Text>
                          <Text>
                            {orderConfirmation.deliveryAddress?.city},
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex
                        gap={3}
                        sx={(theme) => ({
                          [theme.fn.smallerThan("xs")]: {
                            flexDirection: "column",
                          },
                        })}
                      >
                        <Text>{orderConfirmation.phone}</Text>
                      </Flex>
                    </Flex>
                  </Box>
                </>
              ) : (
                <Box>
                  <Title order={4}>Levereras till: </Title>
                  <Flex direction={"column"}>
                    <Text>{orderConfirmation.name}</Text>
                    <Flex
                      gap={3}
                      sx={(theme) => ({
                        [theme.fn.smallerThan("xs")]: {
                          flexDirection: "column",
                        },
                      })}
                    >
                      <Text>{orderConfirmation.invoiceAddress.line1},</Text>
                      <Text>
                        {orderConfirmation.invoiceAddress.line2
                          ? orderConfirmation.invoiceAddress.line2 + ","
                          : null}
                      </Text>

                      <Flex gap={7}>
                        <Text>
                          {orderConfirmation.invoiceAddress.postal_code}
                        </Text>
                        <Text>{orderConfirmation.invoiceAddress.city},</Text>
                      </Flex>
                    </Flex>
                    <Flex
                      gap={3}
                      sx={(theme) => ({
                        [theme.fn.smallerThan("xs")]: {
                          flexDirection: "column",
                        },
                      })}
                    >
                      <Text>{orderConfirmation.email}, </Text>
                      <Text>{orderConfirmation.phone}</Text>
                    </Flex>
                  </Flex>
                </Box>
              )}
            </ContainerWithBorder>
          </>
        ) : null}
      </Flex>
    </AppShell>
  );
};

export default SuccessPage;
