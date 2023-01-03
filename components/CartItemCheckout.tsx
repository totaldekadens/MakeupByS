import { Flex, Group, Image, Title, Text } from "@mantine/core";
import { IconCircleMinus, IconCirclePlus, IconTrash } from "@tabler/icons";
import { FC } from "react";
import useHandleDecrement from "../utils/useHandleDecrement";
import UseHandleIncrement from "../utils/useHandleIncrement";
import useHandleRemoveCartItem from "../utils/useHandleRemoveCartItem";
import { LineItem } from "./AddToCartIcon";

type Props = {
  cartItem: LineItem;
  cartItems: LineItem[];
  setCartItems: (
    val: LineItem[] | ((prevState: LineItem[]) => LineItem[])
  ) => void;
};

const CartItemCheckout: FC<Props> = ({ cartItem, cartItems, setCartItems }) => {
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
          <Title
            order={6}
            color="dimmed"
            sx={(theme) => ({
              [theme.fn.smallerThan("sm")]: {
                fontSize: theme.fontSizes.sm,
              },
            })}
          >
            {cartItem.price_data.product_data.name}
          </Title>
        </Flex>
      </td>
      <td>
        <Group w={100} spacing={5}>
          <IconCircleMinus
            style={{
              cursor: cartItem.quantity < 2 ? "unset" : "pointer",
              pointerEvents: cartItem.quantity < 2 ? "none" : "unset",
            }}
            strokeWidth={1.2}
            color={cartItem.quantity < 2 ? "gray" : "black"}
            onClick={() =>
              useHandleDecrement(cartItem, cartItems, setCartItems)
            }
          />
          <Text>{cartItem.quantity}</Text>
          <IconCirclePlus
            style={{ cursor: "pointer" }}
            strokeWidth={1.2}
            onClick={() =>
              UseHandleIncrement(cartItem, cartItems, setCartItems)
            }
          />
        </Group>
      </td>
      <td>
        <Text>{cartItem.quantity * cartItem.price_data.unit_amount} KR</Text>
      </td>
      <td>
        <IconTrash
          size={16}
          style={{ cursor: "pointer" }}
          strokeWidth={1.25}
          onClick={() =>
            useHandleRemoveCartItem(cartItem, cartItems, setCartItems)
          }
        />
      </td>
    </tr>
  );
};

export default CartItemCheckout;
