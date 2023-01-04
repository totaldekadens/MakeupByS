import { Flex, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { Dispatch, FC, SetStateAction } from "react";
import { RestrictedUser } from "../../pages/api/open/users/[slug]";

type Props = {
  deliveryInfo: RestrictedUser | undefined;
  setDeliveryInfo: Dispatch<SetStateAction<RestrictedUser | undefined>>;
  newInfo: boolean;
  setNewDeliveryInfo?: Dispatch<SetStateAction<RestrictedUser | undefined>>;
  setChecked?: Dispatch<SetStateAction<boolean>>;
};

const DisplayAddress: FC<Props> = ({
  deliveryInfo,
  setDeliveryInfo,
  newInfo,
  setNewDeliveryInfo,
}) => {
  return (
    <Flex mt={20} direction={"column"} align="center" sx={{ width: "100%" }}>
      <Flex
        p={30}
        direction="column"
        sx={(theme) => ({
          border: newInfo
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
        <Text
          onClick={() =>
            newInfo && setNewDeliveryInfo
              ? setNewDeliveryInfo(undefined)
              : setDeliveryInfo(undefined)
          }
          mb={10}
          color={"dimmed"}
          align="end"
          sx={{ cursor: "pointer" }}
        >
          {newInfo ? <IconX /> : "Ändra"}
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
