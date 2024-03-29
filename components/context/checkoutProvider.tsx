import React, { useEffect } from "react";
import { FC, PropsWithChildren, useState } from "react";
import { LineItem } from "../cart/AddToCartIcon";

// Fix interface
export interface Checkout {
  cartItems: LineItem[] | undefined;
  name: string;
  email: string;
  phone: string;
  address: {
    invoice?: any;
    delivery?: any;
  };
  courrier: any;
}

const object = {
  cartItems: [],
  name: "",
  email: "",
  phone: "",
  address: {
    invoice: "",
    delivery: "",
  },
  courrier: "",
};

interface checkoutContextData {
  checkout: Checkout | any;
  setCheckout: React.Dispatch<React.SetStateAction<Checkout | undefined>>;
}

export const checkoutContext = React.createContext<checkoutContextData>({
  checkout: undefined,
  setCheckout: () => {},
});

// Collects everything to be handled in an order
const CheckOutProvider: FC<PropsWithChildren> = (props) => {
  const [checkout, setCheckout] = useState<Checkout | undefined>(object);
  return (
    <checkoutContext.Provider value={{ checkout, setCheckout }}>
      {props.children}
    </checkoutContext.Provider>
  );
};

export default CheckOutProvider;
