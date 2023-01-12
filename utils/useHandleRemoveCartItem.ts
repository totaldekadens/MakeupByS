import { LineItem } from "../components/cart/AddToCartIcon";

const useHandleRemoveCartItem = async (
  product: LineItem,
  cartItems: LineItem[],
  setCartItems: (
    val: LineItem[] | ((prevState: LineItem[]) => LineItem[])
  ) => void
) => {
  try {
    if (product) {
      let cartCopy = [...cartItems];

      const updateCart = cartCopy.filter(
        (cartItem) =>
          cartItem.price_data.product_data.metadata.id !=
          product.price_data.product_data.metadata.id
      );
      setCartItems(updateCart);
    }
  } catch (err) {
    console.error(err);
  }
};

export default useHandleRemoveCartItem;
