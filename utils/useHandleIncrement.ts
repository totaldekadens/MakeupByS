import { useLocalStorage } from "@mantine/hooks";
import { LineItem } from "../components/cart/AddToCartIcon";
import useSlugify from "./useSlugify";

const UseHandleIncrement = async (
  product: LineItem,
  cartItems: LineItem[],
  setCartItems: (
    val: LineItem[] | ((prevState: LineItem[]) => LineItem[])
  ) => void
) => {
  try {
    if (product) {
      const getSlug = useSlugify(product.price_data.product_data.name);

      let response = await fetch(`/api/open/subproduct/${getSlug}`);
      let result = await response.json();

      if (result.success) {
        let cartCopy = [...cartItems];

        let foundIndex = cartCopy.findIndex(
          (cartItem) =>
            cartItem.price_data.product_data.metadata.id ===
            product.price_data.product_data.metadata.id
        );

        if (foundIndex >= 0) {
          if (cartCopy[foundIndex].quantity >= result.data.availableQty) {
            return false;
          }
          cartCopy[foundIndex].quantity++;
        }
        setCartItems(cartCopy);

        return true;
      }
    }
  } catch (err) {
    console.error(err);
  }
};

export default UseHandleIncrement;
