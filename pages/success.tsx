import { AppShell, Flex, Title, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NextPage } from "next";
import { Router, useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { LineItem } from "../components/AddToCartIcon";
import {
  Checkout,
  checkoutContext,
} from "../components/context/checkoutProvider";
import Header from "../components/Header";
import HeaderCheckout from "../components/HeaderCheckout";
import getStripe from "../utils/get-stripejs";

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
        const resultQty = await adjustQuantity(result.data.id);
        const resultOrder = await createOrder(result.data.id);
        console.log(resultQty);
        console.log(resultOrder);
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
    <AppShell fixed={false} header={<HeaderCheckout />}>
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
