import {
  AppShell,
  Flex,
  Title,
  Text,
  Box,
  HoverCard,
  MediaQuery,
  Table,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconInfoCircle, IconPoint } from "@tabler/icons";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LineItem } from "../components/AddToCartIcon";
import CartItemConfirmation from "../components/checkout/CartItemConfirmation";
import { Checkout } from "../components/context/checkoutProvider";
import HeaderCheckout from "../components/layout/HeaderCheckout";
import HeaderSuccess from "../components/layout/HeaderSuccess";
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

  // Gets list of finished displayed products
  const rows = orderConfirmation?.lineItems.map((cartItem, index) => (
    <CartItemConfirmation key={index} cartItem={cartItem} />
  ));

  let totalSum = orderConfirmation?.lineItems.reduce(
    (sum, item) => sum + item.price_data.unit_amount * item.quantity,
    0
  );

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

      if (result) {
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
        router.push("/");
      } else {
        router.push(`/kassa?message=${result.data}`);
      }
    }
    verifyPayment();
  }, [checkoutLocal]);

  return (
    <AppShell fixed={false} header={<HeaderSuccess />}>
      <Flex
        align="center"
        direction="column"
        style={{ marginTop: 60, width: "100%" }}
      >
        {orderConfirmation ? (
          <>
            <Title order={1}>Orderbekräftelse</Title>
            <ContainerWithBorder>
              <Flex gap={10} mb={10} direction="column">
                <Text size={"sm"} align="end" color={"dimmed"}>
                  {orderConfirmation.registerDate}
                </Text>
                <Flex gap={10} align="center" justify={"space-between"}>
                  <Title order={3}>
                    {`Order:  ${orderConfirmation.orderNo}`}
                  </Title>
                </Flex>

                {orderConfirmation.deliveryAddress ? (
                  <>
                    <Flex
                      gap={20}
                      justify={"space-between"}
                      sx={(theme) => ({
                        [theme.fn.smallerThan("xs")]: {
                          gap: 0,
                          flexDirection: "column",
                        },
                      })}
                    >
                      <Box mb={20}>
                        <Title order={5}>Beställare: </Title>
                        <Flex direction={"column"}>
                          <Flex direction="column">
                            <Text size={"sm"}>{orderConfirmation.email}</Text>
                            <Text size={"sm"}>
                              {orderConfirmation.invoiceAddress.line1},
                            </Text>
                            <Text size={"sm"}>
                              {orderConfirmation.invoiceAddress?.line2
                                ? orderConfirmation.invoiceAddress?.line2 + ","
                                : null}
                            </Text>

                            <Flex gap={7}>
                              <Text size={"sm"}>
                                {orderConfirmation.invoiceAddress?.postal_code}
                              </Text>
                              <Text size={"sm"}>
                                {orderConfirmation.invoiceAddress?.city}
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
                          ></Flex>
                        </Flex>
                      </Box>
                      <Box>
                        <Title order={5}>Levereras till: </Title>
                        <Flex direction={"column"}>
                          <Text size={"sm"}>{orderConfirmation.name}</Text>
                          <Flex direction="column">
                            <Text size={"sm"}>
                              {orderConfirmation.deliveryAddress?.line1},
                            </Text>
                            <Text size={"sm"}>
                              {orderConfirmation.deliveryAddress?.line2
                                ? orderConfirmation.deliveryAddress?.line2 + ","
                                : null}
                            </Text>

                            <Flex gap={7}>
                              <Text size={"sm"}>
                                {orderConfirmation.deliveryAddress?.postal_code}
                              </Text>
                              <Text size={"sm"}>
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
                            <Text size={"sm"}>{orderConfirmation.phone}</Text>
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                  </>
                ) : (
                  <Box mb={20}>
                    <Title order={5}>Levereras till: </Title>
                    <Flex direction={"column"}>
                      <Text size={"sm"}>{orderConfirmation.name}</Text>
                      <Flex
                        gap={3}
                        sx={(theme) => ({
                          [theme.fn.smallerThan("xs")]: {
                            flexDirection: "column",
                          },
                        })}
                      >
                        <Text size={"sm"}>
                          {orderConfirmation.invoiceAddress?.line1},
                        </Text>
                        <Text size={"sm"}>
                          {orderConfirmation.invoiceAddress?.line2
                            ? orderConfirmation.invoiceAddress?.line2 + ","
                            : null}
                        </Text>

                        <Flex gap={7}>
                          <Text size={"sm"}>
                            {orderConfirmation.invoiceAddress?.postal_code}
                          </Text>
                          <Text size={"sm"}>
                            {orderConfirmation.invoiceAddress?.city},
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
                        <Text size={"sm"}>{orderConfirmation.email}, </Text>
                        <Text size={"sm"}>{orderConfirmation.phone}</Text>
                      </Flex>
                    </Flex>
                  </Box>
                )}
                <Title order={5}>Fraktsätt</Title>
                <Flex
                  justify={"space-between"}
                  sx={{
                    width: "100%",
                  }}
                >
                  <Flex>
                    <Flex direction={"column"} w={230}>
                      <Flex gap={10}>
                        <Text size={"sm"}>
                          {orderConfirmation.courrier.info.description}
                        </Text>
                        <HoverCard width={280} shadow="md">
                          <HoverCard.Target>
                            <Box>
                              <IconInfoCircle size={20} />
                            </Box>
                          </HoverCard.Target>
                          <HoverCard.Dropdown>
                            <Text size="sm">
                              {orderConfirmation.courrier.info.description2}
                            </Text>
                          </HoverCard.Dropdown>
                        </HoverCard>
                      </Flex>
                      <Flex align={"center"}>
                        <Text size={"sm"} color={"dimmed"}>
                          {orderConfirmation.courrier.info.cost} KR
                        </Text>

                        <MediaQuery
                          largerThan={"xs"}
                          styles={{ display: "none" }}
                        >
                          <Flex align={"center"} ml={12}>
                            <IconPoint size={15} fill="black" />
                            <Text color={"dimmed"} size={"sm"} ml={12}>
                              {
                                orderConfirmation.courrier.info.deliveryTime
                                  .from
                              }{" "}
                              -{" "}
                              {orderConfirmation.courrier.info.deliveryTime.to}{" "}
                              dagar
                            </Text>
                          </Flex>
                        </MediaQuery>
                      </Flex>
                    </Flex>
                  </Flex>
                  <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                    <Flex>
                      <Text size={"sm"} color={"dimmed"}>
                        {orderConfirmation.courrier.info.deliveryTime.from} -{" "}
                        {orderConfirmation.courrier.info.deliveryTime.to} dagar
                      </Text>
                    </Flex>
                  </MediaQuery>
                </Flex>

                <Title order={5}>Produkter</Title>
                <Flex direction={"column"}>
                  <Table>
                    <thead>
                      <tr>
                        <th>Produkt</th>
                        <th>Antal</th>
                      </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                  </Table>

                  <Flex
                    mt={10}
                    justify={"flex-end"}
                    sx={{ width: "100%" }}
                  ></Flex>
                  <Flex mt={20} justify={"flex-end"} sx={{ width: "100%" }}>
                    <Text size={"sm"} color="dimmed">
                      Moms
                    </Text>
                    <Flex justify={"flex-end"} w={70} ml={47}>
                      <Text size={"sm"}>
                        {totalSum ? totalSum * 0.25 + " KR" : "Något gick fel"}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex mt={10} justify={"flex-end"} sx={{ width: "100%" }}>
                    <Text size={"sm"} color="dimmed">
                      Frakt
                    </Text>
                    <Flex justify={"flex-end"} w={70} ml={47}>
                      <Text size={"sm"}>
                        {orderConfirmation.courrier.info.cost + " KR"}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex mt={10} justify={"flex-end"} sx={{ width: "100%" }}>
                    <Text size={"sm"} color="dimmed">
                      Totalt inkl. moms och frakt
                    </Text>
                    <Flex justify={"flex-end"} w={70} ml={47}>
                      <Text weight={"bold"}>
                        {totalSum
                          ? totalSum + orderConfirmation.courrier.info.cost
                          : "Något gick fel"}{" "}
                        KR
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </ContainerWithBorder>
          </>
        ) : null}
      </Flex>
    </AppShell>
  );
};

export default SuccessPage;
