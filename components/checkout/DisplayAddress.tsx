import { Flex, Text } from "@mantine/core";
import { IconX } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { Dispatch, FC, SetStateAction } from "react";
import { RestrictedUser } from "../../pages/api/open/users/[slug]";
import ContainerWithBorder from "../layout/ContainerWithBorder";

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
  const session = useSession();
  const handleChange = () => {
    setNewDeliveryInfo ? setNewDeliveryInfo(undefined) : null;
    setDeliveryInfo(undefined);
  };
  return (
    <Flex mt={20} direction={"column"} align="center" sx={{ width: "100%" }}>
      <ContainerWithBorder bold={newInfo ? true : false}>
        <Text
          onClick={() =>
            newInfo && setNewDeliveryInfo
              ? setNewDeliveryInfo(undefined)
              : handleChange()
          }
          mb={10}
          color={"dimmed"}
          align="end"
          sx={{ cursor: "pointer" }}
        >
          {newInfo ? <IconX /> : session.data?.user ? "" : "Ändra"}
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
            {deliveryInfo && deliveryInfo.address.line2.length > 0
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
      </ContainerWithBorder>
    </Flex>
  );
};

export default DisplayAddress;
