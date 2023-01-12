import { AppShell, Title, Flex, Tabs, Text } from "@mantine/core";
import { GetStaticProps, NextPage } from "next";
import HeaderCheckout from "../../components/layout/HeaderCheckout";
import { useEffect, useRef, useState } from "react";
import OrderHandler from "../../components/admin/OrderHandler";
import ProductHandler from "../../components/admin/ProductHandler";
import CategoryHandler from "../../components/admin/CategoryHandler";
import CustomerHandler from "../../components/admin/CustomerHandler";
import FreightHandler from "../../components/admin/FreightHandler";
import dbConnect from "../../utils/dbConnect";

type Props = {
  orders: any;
};

const Admin: NextPage<Props> = ({ orders }) => {
  const list = [
    { name: "Beställningar", component: OrderHandler },
    { name: "Produkter", component: ProductHandler },
    { name: "Kategorier", component: CategoryHandler },
    { name: "Frakt", component: FreightHandler },
    { name: "Kunder", component: CustomerHandler },
  ];
  const [activeTab, setActiveTab] = useState<string | null>("Beställningar");
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
  }, [activeTab]);

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
                                <Text color={"red.9"} size={11} weight="bold">
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

export const getStaticProps: GetStaticProps = async (context) => {
  await dbConnect();

  let response = await fetch(`${process.env.NEXT_DOMAIN}/api/admin/order/`);
  let result = await response.json();
  return {
    props: { orders: result.data },
  };
};

export default Admin;
