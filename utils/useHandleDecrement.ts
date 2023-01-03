import { useLocalStorage } from "@mantine/hooks";
import { LineItem } from "../components/AddToCartIcon";

const useHandleDecrement = async (
  product: LineItem,
  cartItems: LineItem[],
  setCartItems: (
    val: LineItem[] | ((prevState: LineItem[]) => LineItem[])
  ) => void
) => {
  try {
    if (product) {
      let cartCopy = [...cartItems];

      let foundIndex = cartCopy.findIndex(
        (cartItem) =>
          cartItem.price_data.product_data.metadata.id ===
          product.price_data.product_data.metadata.id
      );
      if (foundIndex >= 0) {
        cartCopy[foundIndex].quantity--;
      }
      setCartItems(cartCopy);
    }
  } catch (err) {
    console.error(err);
  }
};

export default useHandleDecrement;
