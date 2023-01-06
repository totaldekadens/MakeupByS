import { Flex, Table, Text } from "@mantine/core";
import { FC } from "react";
import { LineItem } from "../AddToCartIcon";
import ContainerWithBorder from "../layout/ContainerWithBorder";
import CartItemCheckout from "./CartItemCheckout";

type Props = {
  cartItems: LineItem[];
  setCartItems: (
    val: LineItem[] | ((prevState: LineItem[]) => LineItem[])
  ) => void;
};

const CartCheckout: FC<Props> = ({ cartItems, setCartItems }) => {
  const rows = cartItems.map((cartItem, index) => (
    <CartItemCheckout
      key={index}
      cartItem={cartItem}
      cartItems={cartItems}
      setCartItems={setCartItems}
    />
  ));

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
        <Flex>Totalt inkl. moms</Flex>
        <Flex justify={"flex-end"} w={70} ml={47}>
          <Text weight={"bold"}>{totalSum} KR</Text>
        </Flex>
      </Flex>
    </ContainerWithBorder>
  );
};

export default CartCheckout;
