import { AppShell, Title, Box, Button, Flex, Tabs, Text } from "@mantine/core";
import { NextPage } from "next";
import HeaderCheckout from "../../components/layout/HeaderCheckout";
import { useEffect, useRef, useState } from "react";
import OrderHandler from "../../components/admin/OrderHandler";
import ProductHandler from "../../components/admin/ProductHandler";
import CategoryHandler from "../../components/admin/CategoryHandler";
import CustomerHandler from "../../components/admin/CustomerHandler";
import FreightHandler from "../../components/admin/FreightHandler";
import useFetchHelper from "../../utils/useFetchHelper";
import { OrderDocument } from "../../models/Order";
import { Types } from "mongoose";

const Admin: NextPage = () => {
  const list = [
    { name: "Beställningar", component: OrderHandler },
    { name: "Produkter", component: ProductHandler },
    { name: "Kategorier", component: CategoryHandler },
    { name: "Frakt", component: FreightHandler },
    { name: "Kunder", component: CustomerHandler },
  ];

  const [activeTab, setActiveTab] = useState<string | null>("Beställningar");
  const [orders, setOrders] = useState<any>();
  const [status, setStatus] = useState(200);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);
  const [activeOrders, setActiveOrders] = useState(0);

  // Refs
  const valueRef = useRef<any | null>();
  valueRef.current = orders;

  // Gets orders and return how many needs to be handled
  useEffect(() => {
    useFetchHelper(
      setStatus,
      setIsLoadingOrders,
      setOrders,
      `/api/admin/order/`
    );
    const getNumber = () => {
      let orderReference = valueRef.current;
      if (orders) {
        console.log(orderReference);
        const getActiveOrders = orderReference.filter(
          (order: any) => order.status.status == "Behandlas"
        );
        const getLength = getActiveOrders.length;
        setActiveOrders(getLength);
      }
    };
    getNumber();
  }, [activeTab]);

  console.log(activeOrders);
  return (
    <>
      <AppShell fixed={false} header={<HeaderCheckout />}>
        <Flex direction={"column"} align="center" style={{ marginTop: 60 }}>
          <Title order={1}>ADMIN</Title>
          <Flex gap={5} mt={20}>
            <Tabs
              styles={(theme) => ({
                tab: {
                  border: "1.5px solid " + theme.colors.brand[7],
                  backgroundColor: "white",
                  color: theme.colors.brand[7],
                  fontWeight: "bold",
                },
              })}
              value={activeTab}
              onTabChange={setActiveTab}
              color="brand.7"
              variant="pills"
            >
              <Tabs.List>
                {list
                  ? list.map((button, index) => {
                      return (
                        <Tabs.Tab key={index} value={button.name}>
                          <Flex>
                            <Text>{button.name} </Text>
                            {button.name == "Beställningar" ? (
                              <Flex
                                ml={8}
                                bg={"brand.0"}
                                h={21}
                                w={28}
                                justify="center"
                                align={"center"}
                                sx={(theme) => ({
                                  borderRadius: "50%",
                                })}
                              >
                                <Text
                                  pt={2}
                                  color={"red.9"}
                                  size={10}
                                  weight="bold"
                                >
                                  {activeOrders}
                                </Text>
                              </Flex>
                            ) : null}
                          </Flex>
                        </Tabs.Tab>
                      );
                    })
                  : null}
              </Tabs.List>
              {list.map((button, index) => {
                return (
                  <Tabs.Panel key={index} value={button.name}>
                    <button.component />
                  </Tabs.Panel>
                );
              })}
            </Tabs>
          </Flex>
        </Flex>
      </AppShell>
    </>
  );
};

export default Admin;
