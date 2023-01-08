import { AppShell, Flex, Title, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { LineItem } from "../components/AddToCartIcon";
import { checkoutContext } from "../components/context/checkoutProvider";
import Header from "../components/Header";
import getStripe from "../utils/get-stripejs";

const SuccessPage: NextPage = (props) => {
  // Context
  //const { checkout, setCheckout } = useContext(checkoutContext);

  // Local storage
  const [checkoutLocal, setCheckoutLocal, removeCheckoutLocal] =
    useLocalStorage({
      key: "checkoutLocal",
    });

  const [cartItems, setCartItems, removeCartItems] = useLocalStorage<
    LineItem[]
  >({
    key: "cart",
    defaultValue: [],
  });

  useEffect(() => {
    async function verifyPayment() {
      // Gets session_id from URL-param
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const sessionId = urlParams.get("session_id");

      const body = JSON.stringify({ sessionId, checkout: checkoutLocal });

      let response = await fetch("/api/open/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      });
      let result = await response.json();
      console.log(result);
      // Om success.

      if (result.success) {
        removeCheckoutLocal();
        removeCartItems();
      }
      /*
       * Ta bort checkoutLocalstorage
       * TA bort cartItemLocalstorage
       * Fixa en orderbekräftelse med nödvändig info på sidan.
       * quantity minus på available quatnity
       * quantity plus på reserved quantity
       */

      //const message = document.getElementById("message");

      /*       if (response.customer_details) {
        var emptyArray = [];
        localStorage.setItem("cart", JSON.stringify(emptyArray));

        //localStorage.removeItem("cart")
        message.innerText = `Tack ${response.customer_details.name} för din beställning! Ditt ordernummer: ${response.id}`;
      } else {
        window.location.href = "/"; 
      }*/
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
