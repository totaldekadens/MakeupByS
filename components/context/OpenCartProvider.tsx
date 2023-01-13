import React, { useEffect } from "react";
import { FC, PropsWithChildren, useState } from "react";
import { LineItem } from "../cart/AddToCartIcon";

interface Props {}

interface openedCartContextData {
  openedCart: boolean;
  setOpenedCart: React.Dispatch<React.SetStateAction<boolean>>;
}

export const openedCartContext = React.createContext<openedCartContextData>({
  openedCart: false,
  setOpenedCart: () => {},
});
// Decides whether the cart is open or not
const OpenedCartProvider: FC<PropsWithChildren<Props>> = (props) => {
  const [openedCart, setOpenedCart] = useState<boolean>(false);

  return (
    <openedCartContext.Provider value={{ openedCart, setOpenedCart }}>
      {props.children}
    </openedCartContext.Provider>
  );
};

export default OpenedCartProvider;
