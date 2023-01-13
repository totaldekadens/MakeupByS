import { Button, Flex, Select } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { OrderDocument } from "../../models/Order";
import { OrderStatusDocument } from "../../models/OrderStatus";
import { PopulatedOrder } from "../../utils/types";

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

  // Updates the order with new status
  const handleClick = async () => {
    order.status = status;
    order.existingCustomer = order.existingCustomer._id;

    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    const response = await fetch("/api/admin/order", request);
    let result = await response.json();
    console.log(result);
    // Todo: Continue with errorboundary and add a popup modal so the user gets some feedback
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
