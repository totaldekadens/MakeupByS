import React, { useEffect } from "react";
import { FC, PropsWithChildren, useState } from "react";
import { LineItem } from "../AddToCartIcon";

interface Props {}

interface Checkout {
  cartItems: LineItem[] | undefined;
  name: string;
  email: string;
  phone: string;
  address: {
    invoice: Address;
    delivery?: Address;
  };
  courrier: any; // Fix
}

interface Address {
  line1: string;
  line2: string;
  postal_code: string;
  city: string;
  country: string;
}

const object = {
  cartItems: [
    {
      quantity: 0,
      price_data: {
        currency: "sek",
        unit_amount: 0,
        product_data: {
          name: "",
          description: "",
          images: [""],
          metadata: {
            id: "",
          },
        },
      },
    },
  ],
  name: "",
  email: "",
  phone: "",
  address: {
    invoice: { line1: "", line2: "", postal_code: "", city: "", country: "" },
    delivery: undefined,
  },
  courrier: "", // Fix
};

interface checkoutContextData {
  checkout: Checkout | any;
  setCheckout: React.Dispatch<React.SetStateAction<Checkout | undefined>>;
}

export const checkoutContext = React.createContext<checkoutContextData>({
  checkout: undefined,
  setCheckout: () => {},
});

const CheckOutProvider: FC<PropsWithChildren<Props>> = (props) => {
  const [checkout, setCheckout] = useState<Checkout | undefined>(object);

  return (
    <checkoutContext.Provider value={{ checkout, setCheckout }}>
      {props.children}
    </checkoutContext.Provider>
  );
};

export default CheckOutProvider;
