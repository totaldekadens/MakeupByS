import { AppShell, Flex, Title, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { checkoutContext } from "../components/context/checkoutProvider";
import Header from "../components/Header";
import getStripe from "../utils/get-stripejs";

const SuccessPage: NextPage = (props) => {
  // Context
  //const { checkout, setCheckout } = useContext(checkoutContext);

  // Local storage
  const [checkoutLocal, setCheckoutLocal] = useLocalStorage({
    key: "checkoutLocal",
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
      /*
       * Ta bort checkoutLocalstorage
       * TA bort cartItemLocalstorage
       * Fixa en orderbekräftelse med nödvändig info på sidan.
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
