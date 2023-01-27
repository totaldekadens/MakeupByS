import { Flex, Title, Text, Button } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import Link from "next/link";
import { FC, useContext } from "react";
import getStripe from "../../utils/get-stripejs";
import { LineItem } from "../cart/AddToCartIcon";
import { checkoutContext } from "../context/checkoutProvider";

const TotalSum: FC = () => {
  // Context
  const { checkout, setCheckout } = useContext(checkoutContext);

  // Local storage
  const [checkoutLocal, setCheckoutLocal] = useLocalStorage({
    key: "checkoutLocal",
    defaultValue: checkout,
  });

  // Gets totalsum of cart items
  let totalSum = checkout.cartItems.reduce(
    (sum: any, item: LineItem) =>
      sum + item.price_data.unit_amount * item.quantity,
    0
  );

  // Sending information to create an order
  const handleClick = async () => {
    const stripe = await getStripe();

    setCheckoutLocal(checkout);

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(checkout),
    };

    const response = await fetch("/api/open/checkout_sessions", request);
    let result = await response.json();

    if (result.success && stripe) {
      const { error } = await stripe.redirectToCheckout({
        sessionId: result.data,
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
        {checkout.courrier.info
          ? totalSum + checkout.courrier.info.cost
          : totalSum}
        KR
      </Title>
      <Button
        onClick={() => handleClick()}
        disabled={checkout.courrier ? false : true}
        mt={10}
        sx={(theme) => ({
          width: "100%",
          "&:hover": {
            backgroundColor: theme.colors.brand[8],
            color: theme.colors.brand[0],
            borderColor: theme.colors.brand[0],
        },
        })}
      >
        Gå till betalning
      </Button>
      <Text mt={5} size={"xs"}>
        Genom att fortsätta till betalning godkänner jag Almänna{" "}
        <Link href={"/kopvillkor"}>
          <b>villkor</b>
        </Link>{" "}
        , samt bekräftar att jag tagit del av, och förstått butikens{" "}
        <Link href={"/integritet"}>
          <b>Integritetspolicy</b>
        </Link>
      </Text>
    </Flex>
  );
};
export default TotalSum;
