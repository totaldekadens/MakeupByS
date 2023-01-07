import { Flex, Title, Text, Button } from "@mantine/core";
import { FC, useContext } from "react";
import getStripe from "../../utils/get-stripejs";
import { LineItem } from "../AddToCartIcon";
import { checkoutContext } from "../context/checkoutProvider";

const TotalSum: FC = () => {
  // Context
  const { checkout, setCheckout } = useContext(checkoutContext);

  // Gets totalsum of cart items
  let totalSum = checkout.cartItems.reduce(
    (sum: any, item: LineItem) =>
      sum + item.price_data.unit_amount * item.quantity,
    0
  );

  const handleClick = async () => {
    const stripe = await getStripe();

    const body = {
      checkout,
    };

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch("/api/open/checkout_sessions", request);
    let result = await response.json();
    console.log(result);
    if (result && stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: result,
      });
      console.warn(error.message);
    }
  };

  return (
    <Flex mt={50} mb={50} direction={"column"} align="center">
      <Text color={"dimmed"} weight={"bold"}>
        Att betala inkl. moms och frakt:
      </Text>
      <Title>
        {checkout.courrier
          ? totalSum + checkout.courrier.chosenFreightOption.cost
          : totalSum}{" "}
        KR
      </Title>
      <Button
        onClick={() => handleClick()}
        disabled={checkout.courrier ? false : true}
        sx={{ width: "100%" }}
        mt={10}
      >
        Gå till betalning
      </Button>
      <Text mt={5} size={"xs"}>
        Genom att fortsätta till betalning godkänner jag Almänna villkor, samt
        bekräftar att jag tagit del av, och förstått butikens integritetpolicy
      </Text>
    </Flex>
  );
};
export default TotalSum;
