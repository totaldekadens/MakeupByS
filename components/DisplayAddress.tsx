import { Flex, Text } from "@mantine/core";
import { Dispatch, FC, SetStateAction } from "react";
import { RestrictedUser } from "../pages/api/open/users/[slug]";

type Props = {
  deliveryInfo: RestrictedUser | undefined;
  setDeliveryInfo: Dispatch<SetStateAction<RestrictedUser | undefined>>;
};

const DisplayAddress: FC<Props> = ({ deliveryInfo, setDeliveryInfo }) => {
  return (
    <Flex direction={"column"} align="center" sx={{ width: "100%" }}>
      <Flex
        p={30}
        direction="column"
        sx={(theme) => ({
          border: "1px solid" + theme.colors.gray[3],
          borderRadius: "10px",
          [theme.fn.smallerThan("sm")]: {},
        })}
      >
        <Text
          onClick={() => setDeliveryInfo(undefined)}
          mb={10}
          color={"dimmed"}
          align="end"
          sx={{ cursor: "pointer" }}
        >
          Ändra
        </Text>
        <Text weight={"bold"}>{deliveryInfo?.name}</Text>
        <Flex
          gap={3}
          sx={(theme) => ({
            [theme.fn.smallerThan("xs")]: {
              flexDirection: "column",
            },
          })}
        >
          <Text>{deliveryInfo?.address.line1},</Text>
          <Text>
            {deliveryInfo!.address!.line2.length > 0
              ? `${deliveryInfo?.address.line2}, `
              : null}
          </Text>
          <Text>{deliveryInfo?.address.postal_code},</Text>
          <Text>{deliveryInfo?.address.city},</Text>
        </Flex>
        <Flex
          gap={3}
          sx={(theme) => ({
            [theme.fn.smallerThan("xs")]: {
              flexDirection: "column",
            },
          })}
        >
          <Text>{deliveryInfo?.email},</Text>
          <Text>{deliveryInfo?.phone}</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DisplayAddress;
