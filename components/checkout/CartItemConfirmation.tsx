import { Flex, Image, Title, Text } from "@mantine/core";
import { FC } from "react";
import { LineItem } from "../cart/AddToCartIcon";

type Props = {
  cartItem: LineItem;
};
// Displays cart item in order confirmation
const CartItemConfirmation: FC<Props> = ({ cartItem }) => {
  return (
    <tr key={cartItem.price_data.product_data.name}>
      <td style={{ height: "70px" }}>
        <Flex gap={10}>
          <Image
            src={`/uploads/${cartItem.price_data.product_data.images[0]}`}
            width={55}
            alt={cartItem.price_data.product_data.name}
            fit="contain"
          />
          <Flex direction={"column"}>
            <Title
              order={6}
              color="dimmed"
              sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: {
                  fontSize: theme.fontSizes.sm,
                },
                [theme.fn.smallerThan("xs")]: {
                  fontSize: 12,
                },
              })}
            >
              {cartItem.price_data.product_data.name}
            </Title>

            <Text weight={"bold"}>
              {cartItem.quantity * cartItem.price_data.unit_amount} KR
            </Text>
          </Flex>
        </Flex>
      </td>
      <td>
        <Text>{cartItem.quantity} st</Text>
      </td>
    </tr>
  );
};

export default CartItemConfirmation;
