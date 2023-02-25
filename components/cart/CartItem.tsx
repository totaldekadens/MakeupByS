import { Flex, Group, Image, Title, Text } from "@mantine/core";
import { IconCircleMinus, IconCirclePlus, IconTrash } from "@tabler/icons";
import { FC, useState } from "react";
import useHandleDecrement from "../../utils/useHandleDecrement";
import UseHandleIncrement from "../../utils/useHandleIncrement";
import useHandleRemoveCartItem from "../../utils/useHandleRemoveCartItem";
import { LineItem } from "./AddToCartIcon";
import ResponseModal from "../layout/ResponseModal";
import { ResponseModalType } from "../admin/SelectStatus";
type Props = {
  product: LineItem;
  cartItems: LineItem[];
  setCartItems: (
    val: LineItem[] | ((prevState: LineItem[]) => LineItem[])
  ) => void;
};

// Displays cart item in cart
const CartItem: FC<Props> = ({ product, cartItems, setCartItems }) => {
  const [opened, setOpened] = useState(false);
  const [response, setResponse] = useState<ResponseModalType>({
    title: "",
    reason: "info",
  });
  return (
    <Flex
      h={100}
      pb={15}
      mb={15}
      sx={(theme) => ({
        width: "95%",

        borderBottom: "1px solid" + theme.colors.gray[2],
      })}
    >
      <Image
        src={`https://res.cloudinary.com/dkzh2lxon/image/upload/v1675178603/makeupbys/${product.price_data.product_data.images[0]}`}
        width={55}
        alt={product.price_data.product_data.name}
        fit="contain"
      />

      <Flex ml={"xs"} direction={"column"} justify="space-between">
        <Title
          order={6}
          sx={(theme) => ({
            [theme.fn.smallerThan("sm")]: {
              fontSize: theme.fontSizes.sm,
            },
          })}
        >
          {product.price_data.product_data.name}
        </Title>
        <Group w={100} spacing={5}>
          <IconCircleMinus
            style={{
              cursor: product.quantity < 2 ? "unset" : "pointer",
              pointerEvents: product.quantity < 2 ? "none" : "unset",
            }}
            strokeWidth={1.2}
            color={product.quantity < 2 ? "gray" : "black"}
            onClick={() => useHandleDecrement(product, cartItems, setCartItems)}
          />
          <Text>{product.quantity}</Text>
          <IconCirclePlus
            style={{ cursor: "pointer" }}
            strokeWidth={1.2}
            onClick={async () => {
              const result = await UseHandleIncrement(
                product,
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
      </Flex>
      <Flex
        sx={{ width: "100%" }}
        direction={"column"}
        justify="flex-end"
        align={"flex-end"}
      >
        <Title
          mb={10}
          order={4}
          sx={(theme) => ({
            [theme.fn.smallerThan("sm")]: {
              fontSize: "16px",
            },
            [theme.fn.smallerThan("xs")]: {
              fontSize: "14px",
            },
          })}
        >
          {product.quantity * product.price_data.unit_amount} KR
        </Title>
        <IconTrash
          size={20}
          style={{ cursor: "pointer" }}
          strokeWidth={1.25}
          onClick={() =>
            useHandleRemoveCartItem(product, cartItems, setCartItems)
          }
        />
      </Flex>
      <ResponseModal info={response} setOpened={setOpened} opened={opened} />
    </Flex>
  );
};
export default CartItem;
