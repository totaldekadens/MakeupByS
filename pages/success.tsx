import { AppShell, Flex, Title, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { LineItem } from "../components/AddToCartIcon";
import {
  Checkout,
  checkoutContext,
} from "../components/context/checkoutProvider";
import Header from "../components/Header";
import getStripe from "../utils/get-stripejs";

const SuccessPage: NextPage = (props) => {
  // Context
  //const { checkout, setCheckout } = useContext(checkoutContext);

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

  const adjustQuantity = async (sessionId: string) => {
    if (checkoutLocal) {
      for (let i = 0; i < checkoutLocal.cartItems!.length; i++) {
        if (checkoutLocal.cartItems) {
          let cartItem = checkoutLocal.cartItems[i];

          const body = JSON.stringify({ cartItem });

          let response = await fetch("/api/open/order", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body,
          });
          let result = await response.json();
          return result;
        }
      }
    }
  };

  const createOrder = async (sessionId: string) => {
    if (checkoutLocal) {
      const body = JSON.stringify({ cartItems: checkoutLocal, sessionId });

      let response = await fetch("/api/open/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      let result = await response.json();
      console.log(result);
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
      console.log(result);

      if (result.success) {
        const resultQty = await adjustQuantity(result.data.session_id);
        const resultOrder = await createOrder(result.data.session_id);
        console.log(resultQty);
        console.log(resultOrder);
      }

      // Om success.

      /*  if (result.success) {
       
         * Ta bort checkoutLocalstorage
         * TA bort cartItemLocalstorage
         * Fixa en orderbekräftelse med nödvändig info på sidan.

         */
    }
    verifyPayment();
  }, [checkoutLocal]);

  return (
    <AppShell fixed={false} header={<Header />}>
      <Flex
        align="center"
        direction="column"
        style={{ marginTop: 60, width: "100%" }}
      >
        <Title>Success!!</Title>
      </Flex>
    </AppShell>
  );
};

export default SuccessPage;
