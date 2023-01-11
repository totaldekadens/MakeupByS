import { Flex } from "@mantine/core";
import { FC, PropsWithChildren } from "react";

const MarginTopContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      sx={(theme) => ({
        width: "100%",
        flexDirection: "column",
        marginTop: 200,
        [theme.fn.smallerThan("md")]: {
          marginTop: 180,
        },
        [theme.fn.smallerThan("sm")]: { marginTop: 150 },
        [theme.fn.smallerThan("xs")]: { marginTop: 0 },
      })}
    >
      {children}
    </Flex>
  );
};

export default MarginTopContainer;
