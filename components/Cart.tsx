import { Drawer } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";

type Props = {
  opened: boolean;
  openCart: Dispatch<SetStateAction<boolean>>;
};

const Cart: FC<Props> = ({ opened, openCart }) => {
  return (
    <Drawer
      opened={opened}
      onClose={() => openCart(false)}
      //title="Register"
      padding="xl"
      size="lg"
      position="right"
    >
      {/* Drawer content */}
      Öppen
    </Drawer>
  );
};

export default Cart;
