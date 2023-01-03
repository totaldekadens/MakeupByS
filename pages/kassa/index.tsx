import {
  AppShell,
  Box,
  Flex,
  Grid,
  Title,
  Text,
  Group,
  TextInput,
} from "@mantine/core";
import { NextPage } from "next";
import HeaderCheckout from "../../components/HeaderCheckout";
import { useLocalStorage } from "@mantine/hooks";
import { LineItem } from "../../components/AddToCartIcon";
import CartCheckout from "../../components/CartCheckout";
import DeliveryInformation from "../../components/DeliveryInformation";
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
        <CartCheckout cartItems={cartItems} setCartItems={setCartItems} />
        <DeliveryInformation />
      </Flex>
    </AppShell>
  );
};

export default Kassa;
