import { AppShell, Flex, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import HeaderCheckout from "../../components/HeaderCheckout";
import { useLocalStorage } from "@mantine/hooks";
import { LineItem } from "../../components/AddToCartIcon";
import CartCheckout from "../../components/checkout/CartCheckout";
import DeliveryInformation from "../../components/checkout/DeliveryInformation";
import { useContext, useEffect } from "react";
import { checkoutContext } from "../../components/context/checkoutProvider";

const Kassa: NextPage = () => {
  const [cartItems, setCartItems] = useLocalStorage<LineItem[]>({
    key: "cart",
    defaultValue: [],
  });

  const { checkout, setCheckout } = useContext(checkoutContext);

  useEffect(() => {
    const updateCheckoutInfo = () => {
      const checkoutCopy = { ...checkout };
      checkoutCopy.cartItems = cartItems;
      setCheckout(checkoutCopy);
    };
    updateCheckoutInfo();
  }, [cartItems]);

  let totalSum = cartItems.reduce(
    (sum, item) => sum + item.price_data.unit_amount * item.quantity,
    0
  );

  return (
    <AppShell
      fixed={false}
      header={<HeaderCheckout />}
      styles={{
        main: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        },
      }}
    >
      <Flex
        style={{
          width: "100%",
          marginTop: 60,
          minHeight: "100vh",
          maxWidth: "1320px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Title order={1}>KASSA</Title>
        {totalSum && totalSum > 0 ? (
          <>
            <CartCheckout cartItems={cartItems} setCartItems={setCartItems} />
            <DeliveryInformation />
          </>
        ) : (
          <>
            <Title mt={20} order={3}>
              Din varukorg är tom.
            </Title>
            <Text mt={10} align="center" color={"dimmed"}>
              Gå tillbaka och lägg produkter i varukorgen för att slutföra ditt
              köp
            </Text>
          </>
        )}
      </Flex>
    </AppShell>
  );
};

export default Kassa;
