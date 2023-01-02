import { Box } from "@mantine/core";
import { IconShoppingBag, IconPlus } from "@tabler/icons";
import { FC } from "react";
import { useHover } from "@mantine/hooks";

type Props = {
  color: string;
};

const AddToCartIcon: FC<Props> = ({ color }) => {
  const { hovered, ref } = useHover();

  const handleClick = () => {
    // Här lägger vi till produkten i varukorgen
    console.log("Lägger till produkten i varukorgen");
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
