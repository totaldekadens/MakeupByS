import { Flex, Table, Text } from "@mantine/core";
import { FC } from "react";
import { LineItem } from "../cart/AddToCartIcon";
import ContainerWithBorder from "../layout/ContainerWithBorder";
import CartItemCheckout from "./CartItemCheckout";

type Props = {
  cartItems: LineItem[];
  setCartItems: (
    val: LineItem[] | ((prevState: LineItem[]) => LineItem[])
  ) => void;
};

const CartCheckout: FC<Props> = ({ cartItems, setCartItems }) => {
  // Gets list of finished displayed cartItems in cart
  const rows = cartItems.map((cartItem, index) => (
    <CartItemCheckout
      key={index}
      cartItem={cartItem}
      cartItems={cartItems}
      setCartItems={setCartItems}
    />
  ));

  // Gets total sum of cart items in cart
  let totalSum = cartItems.reduce(
    (sum, item) => sum + item.price_data.unit_amount * item.quantity,
    0
  );

  return (
    <ContainerWithBorder>
      <Table>
        <thead>
          <tr>
            <th>Produkt</th>
            <th>Antal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      <Flex mt={10} justify={"flex-end"} sx={{ width: "100%" }}></Flex>
      <Flex mt={20} justify={"flex-end"} sx={{ width: "100%" }}>
        <Text color="dimmed">Totalt inkl. moms</Text>
        <Flex justify={"flex-end"} w={70} ml={47}>
          <Text weight={"bold"}>{totalSum} KR</Text>
        </Flex>
      </Flex>
    </ContainerWithBorder>
  );
};

export default CartCheckout;
