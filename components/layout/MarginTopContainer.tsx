import { Flex } from "@mantine/core";
import { FC, PropsWithChildren, useContext } from "react";
import { hideContext } from "../context/HideProvider";

const MarginTopContainer: FC<PropsWithChildren> = ({ children }) => {
  const { hide, setHide } = useContext(hideContext);
  return (
    <Flex
      sx={(theme) => ({
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        marginTop: hide ? 150 : 200,
        [theme.fn.smallerThan("md")]: {
          marginTop: hide ? 150 : 180,
        },
        [theme.fn.smallerThan("sm")]: { marginTop: hide ? 135 : 150 },
        [theme.fn.smallerThan("xs")]: { marginTop: hide ? 85 : 121 },
      })}
    >
      {children}
    </Flex>
  );
};

export default MarginTopContainer;
