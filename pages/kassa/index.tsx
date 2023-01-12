import { AppShell, Flex, Title, Text } from "@mantine/core";
import { NextPage } from "next";
import HeaderCheckout from "../../components/layout/HeaderCheckout";
import { useLocalStorage } from "@mantine/hooks";
import { LineItem } from "../../components/cart/AddToCartIcon";
import CartCheckout from "../../components/checkout/CartCheckout";
import DeliveryInformation from "../../components/checkout/DeliveryInformation";
import { useContext, useEffect, useRef } from "react";
import { checkoutContext } from "../../components/context/checkoutProvider";
import Courrier from "../../components/checkout/Courrier";
import TotalSum from "../../components/checkout/TotalSum";

const Kassa: NextPage = () => {
  // Context
  const { checkout, setCheckout } = useContext(checkoutContext);

  // Local storage
  const [cartItems, setCartItems] = useLocalStorage<LineItem[]>({
    key: "cart",
    defaultValue: [],
  });

  // Ref
  const checkoutRef = useRef<any | null>();
  checkoutRef.current = checkout;

  // Gets total sum of cart items in cart
  let totalSum = cartItems.reduce(
    (sum, item) => sum + item.price_data.unit_amount * item.quantity,
    0
  );

  // Updates checkout with current cartitems from local storage
  useEffect(() => {
    let checkoutCopy = checkoutRef.current;
    const updateCheckoutInfo = () => {
      checkoutCopy.cartItems = cartItems;
      setCheckout(checkoutCopy);
    };
    updateCheckoutInfo();
  }, [cartItems]);

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
            {checkout.address.invoice || checkout.address.delivery ? (
              checkout.address.invoice || checkout.address.delivery ? (
                checkout.address.invoice.city ||
                checkout.address.delivery.city ? (
                  <>
                    <Courrier />
                    <TotalSum />
                  </>
                ) : null
              ) : null
            ) : null}
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
