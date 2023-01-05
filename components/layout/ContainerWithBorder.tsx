import { Flex } from "@mantine/core";
import { FC, PropsWithChildren } from "react";

type Props = {
  bold?: boolean;
};

const ContainerWithBorder: FC<PropsWithChildren<Props>> = ({
  children,
  bold,
}) => {
  return (
    <Flex
      direction={"column"}
      p={30}
      mt="xl"
      sx={(theme) => ({
        border: bold
          ? `4px solid ${theme.colors.gray[3]}`
          : `1px solid ${theme.colors.gray[3]}`,
        borderRadius: "10px",
        width: "550px",
        [theme.fn.smallerThan("sm")]: {
          width: "470px",
          padding: 20,
        },
        [theme.fn.smallerThan("xs")]: {
          width: "100%",
        },
      })}
    >
      {children}
    </Flex>
  );
};

export default ContainerWithBorder;
