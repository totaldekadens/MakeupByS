import { Button, Flex, Select } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { OrderStatusDocument } from "../../models/OrderStatus";

type SelectType = {
  value: string;
  label: string;
};

type Props = {
  order: any;
};

const SelectStatus: FC<Props> = ({ order }) => {
  const router = useRouter();
  const session = useSession();
  const [status, setStatus] = useState<string | null>(null);
  const [statusList, setStatusList] = useState<SelectType[]>([
    { value: "", label: "" },
  ]);

  const handleClick = () => {
    // Uppdatera status på ordern här!
  };

  useEffect(() => {
    const getOrderStatus = async () => {
      let response = await fetch(`/api/open/orderstatus/`);
      let result = await response.json();

      if (result.success) {
        let newList: SelectType[] = [];
        result.data.forEach((status: OrderStatusDocument) => {
          if (order.status.status == status.status) {
            return;
          }
          if (status._id) {
            let object = {
              value: status._id.toString(),
              label: status.status,
            };
            newList.push(object);
          }
        });
        setStatusList(newList);
      }
    };
    getOrderStatus();
  }, [order]);
  return (
    <Flex
      wrap={"wrap"}
      gap={10}
      align="center"
      mt={40}
      justify={"flex-end"}
      sx={{ width: "100%" }}
    >
      <Select
        placeholder="Välj ny status"
        value={status}
        onChange={setStatus}
        data={statusList}
      />
      <Button onClick={() => handleClick()}>Ändra status</Button>
    </Flex>
  );
};
export default SelectStatus;
