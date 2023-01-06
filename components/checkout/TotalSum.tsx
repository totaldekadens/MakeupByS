import { Flex, Title, Text, Button } from "@mantine/core";
import { FC, useContext } from "react";
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

  return (
    <Flex mt={20} direction={"column"} align="center">
      <Text weight={"bold"}>Att betala inkl. moms och frakt:</Text>
      <Title>{totalSum + checkout.courrier.chosenFreightOption.cost} KR</Title>
      <Button
        disabled={checkout.courrier ? false : true}
        sx={{ width: "100%" }}
        mt={40}
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
