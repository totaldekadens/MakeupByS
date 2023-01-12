import { Box } from "@mantine/core";
import { IconShoppingBag, IconPlus } from "@tabler/icons";
import { Dispatch, FC, SetStateAction, useContext } from "react";
import { useHover } from "@mantine/hooks";
import { useLocalStorage } from "@mantine/hooks";
import { openedCartContext } from "../context/OpenCartProvider";

type Props = {
  color: string;
  product: any;
};

export type LineItem = {
  quantity: number;
  price_data: {
    currency: string;
    unit_amount: number;
    product_data: {
      name: string;
      description: string;
      images: string[];
      metadata: { id: string; weight: number };
    };
  };
};

const AddToCartIcon: FC<Props> = ({ color, product }) => {
  const { hovered, ref } = useHover();
  const [cartItems, setCartItems] = useLocalStorage<LineItem[]>({
    key: "cart",
    defaultValue: [],
  });
  const { openedCart, setOpenedCart } = useContext(openedCartContext);
  const price = Number(product.mainProduct.price.$numberDecimal);
  const handleClick = () => {
    const lineItem = {
      quantity: 1,
      price_data: {
        currency: "sek",
        unit_amount: price,
        product_data: {
          name: product.title,
          description: product.description,
          images: product.images,
          metadata: {
            id: product._id,
            weight: product.mainProduct.weight ? product.mainProduct.weight : 0,
          },
        },
      },
    };

    let cartCopy = [...cartItems];

    let foundIndex = cartCopy.findIndex(
      (cartItem) => cartItem.price_data.product_data.metadata.id === product._id
    );

    if (foundIndex >= 0) {
      if (cartCopy[foundIndex].quantity >= product.availableQty) {
        return alert("Finns tyvärr inga fler produkter"); // Fixa modal till denna sen
      }
      cartCopy[foundIndex].quantity++;
    } else {
      cartCopy.push(lineItem);
    }

    setCartItems(cartCopy);
    setOpenedCart(true);
  };

  return (
    <>
      <Box
        onClick={handleClick}
        ref={ref}
        sx={{ width: "100%", height: "100%" }}
      >
        <Box pos={"absolute"} sx={{ right: 11, top: 13 }}>
          <IconShoppingBag strokeWidth={1.25} size={30} color={color} />
        </Box>
        <Box pos={"absolute"} sx={{ right: 8, top: 5 }}>
          <IconPlus
            strokeWidth={hovered ? 2.1 : 1.25}
            size={hovered ? 16 : 15}
            color={color}
          />
        </Box>
      </Box>
    </>
  );
};

export default AddToCartIcon;