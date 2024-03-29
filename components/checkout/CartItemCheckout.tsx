import { Flex, Group, Image, Title, Text, MediaQuery } from "@mantine/core";
import { IconCircleMinus, IconCirclePlus, IconTrash } from "@tabler/icons";
import { FC, useState } from "react";
import useHandleDecrement from "../../utils/useHandleDecrement";
import UseHandleIncrement from "../../utils/useHandleIncrement";
import useHandleRemoveCartItem from "../../utils/useHandleRemoveCartItem";
import { ResponseModalType } from "../admin/SelectStatus";
import { LineItem } from "../cart/AddToCartIcon";
import ResponseModal from "../layout/ResponseModal";

type Props = {
  cartItem: LineItem;
  cartItems: LineItem[];
  setCartItems: (
    val: LineItem[] | ((prevState: LineItem[]) => LineItem[])
  ) => void;
};
// Displays cart item in checkout
const CartItemCheckout: FC<Props> = ({ cartItem, cartItems, setCartItems }) => {
  const [opened, setOpened] = useState(false);
  const [response, setResponse] = useState<ResponseModalType>({
    title: "",
    reason: "info",
  });
  return (
    <tr key={cartItem.price_data.product_data.name}>
      <td style={{ height: "70px" }}>
        <Flex gap={10}>
          <Image
            src={`https://res.cloudinary.com/dkzh2lxon/image/upload/v1675178603/makeupbys/${cartItem.price_data.product_data.images[0]}`}
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
        <Group w={85} spacing={5}>
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
            onClick={async () => {
              const result = await UseHandleIncrement(
                cartItem,
                cartItems,
                setCartItems
              );
              if (!result) {
                const object: ResponseModalType = {
                  title: "Finns tyvärr inte fler av denna produkt!",
                  reason: "error",
                };
                setResponse(object);
                setOpened(true);
              }
            }}
          />
        </Group>
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
      <ResponseModal info={response} setOpened={setOpened} opened={opened} />
    </tr>
  );
};

export default CartItemCheckout;
