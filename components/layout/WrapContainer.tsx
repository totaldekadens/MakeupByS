import { Flex } from "@mantine/core";
import { FC, PropsWithChildren } from "react";

const WrapContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Flex
      direction={"column"}
      align="center"
      style={{
        marginTop: 60,
        width: "100%",
        minHeight: "100vh",
        maxWidth: "1320px",
      }}
    >
      {children}
    </Flex>
  );
};

export default WrapContainer;
