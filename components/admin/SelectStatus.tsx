import { Box, Button, Flex, Select } from "@mantine/core";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { OrderStatusDocument } from "../../models/OrderStatus";
import ResponseModal from "../layout/ResponseModal";

export type SelectType = {
  value: string;
  label: string;
};

type Props = {
  order: any;
};

export type ResponseModalType = {
  title: string;
  reason: "info" | "error" | "success";
  description?: string;
};

const SelectStatus: FC<Props> = ({ order }) => {
  const router = useRouter();
  const session = useSession();
  const [status, setStatus] = useState<string | null>(null);
  const [statusList, setStatusList] = useState<SelectType[]>([
    { value: "", label: "" },
  ]);
  const [opened, setOpened] = useState(false);
  const [response, setResponse] = useState<ResponseModalType>({
    title: "",
    reason: "info",
  });

  // Updates the order with new status and adjusts quantity on products in DB
  const handleClick = async () => {
    try {
      order.status = status;
      order.existingCustomer
        ? (order.existingCustomer = order.existingCustomer._id)
        : null;

      const request = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      };
      const response = await fetch("/api/admin/order", request);
      let result = await response.json();

      if (result.success) {
        // if status == Färdigbehandlad
        if (result.data.status == "63b94ba666d02095eb80e865") {
          try {
            for (let i = 0; i < result.data.lineItems!.length; i++) {
              let lineItem = result.data.lineItems[i];
              const newRequest = {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(lineItem),
              };
              const newResponse = await fetch(
                "/api/admin/subproduct/shippedorder",
                newRequest
              );
              let newResult = await newResponse.json();
              if (!newResult.success) {
                const object: ResponseModalType = {
                  title: "Något gick fel!",
                  description:
                    "Orderstatus är uppdaterad men inte antalet i databasen. Kontakta administratör",
                  reason: "error",
                };
                setResponse(object);
                setOpened(true);
                return;
              }
            }
          } catch (err) {
            console.log(err);
          }
          // if status == Avbruten
        } else if (result.data.status == "63b94c3e66d02095eb80e86b") {
          try {
            for (let i = 0; i < result.data.lineItems!.length; i++) {
              let lineItem = result.data.lineItems[i];
              const newRequest = {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(lineItem),
              };
              const newResponse = await fetch(
                "/api/admin/subproduct/cancelledorder",
                newRequest
              );
              let newResult = await newResponse.json();
              if (!newResult.success) {
                const object: ResponseModalType = {
                  title: "Något gick fel!",
                  description:
                    "Orderstatus är uppdaterad men inte antalet i databasen. Kontakta administratör",
                  reason: "error",
                };
                setResponse(object);
                setOpened(true);
                return;
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
        const object: ResponseModalType = {
          title: "Ordern är uppdaterad",
          reason: "success",
        };
        setResponse(object);
        setOpened(true);
        return;
      }
      const object: ResponseModalType = {
        title: "Något gick fel, ordern är inte uppdaterad",
        reason: "error",
      };
      setResponse(object);
      setOpened(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getOrderStatus = async () => {
      try {
        let response = await fetch(`/api/open/orderstatus/`);
        let result = await response.json();
        // Customizes the list of statuses depending on current status on order
        if (result.success) {
          let newList: SelectType[] = [];
          result.data.forEach((status: OrderStatusDocument) => {
            if (status._id) {
              let id = status._id.toString();

              if (
                order.status.status == status.status ||
                (order.status._id != "63b94b6966d02095eb80e861" &&
                  order.status._id != "63b94c1066d02095eb80e868") ||
                (order.status._id == "63b94c1066d02095eb80e868" &&
                  id == "63b94ba666d02095eb80e865")
              ) {
                return;
              }

              let object = {
                value: id,
                label: status.status,
              };
              newList.push(object);
            }
          });
          setStatusList(newList);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getOrderStatus();
  }, [order]);
  return (
    <>
      {order.status._id == "63b94ba666d02095eb80e865" ? (
        <Box></Box>
      ) : order.status._id == "63b94c3e66d02095eb80e86b" ? (
        <Box></Box>
      ) : (
        <Flex
          wrap={"wrap"}
          gap={10}
          align="center"
          mt={40}
          justify={"flex-end"}
          sx={{ width: "100%" }}
        >
          <>
            <Select
              placeholder="Välj ny status"
              value={status}
              onChange={setStatus}
              data={statusList}
            />
            <Button onClick={() => handleClick()}>Ändra status</Button>
          </>
        </Flex>
      )}
      <ResponseModal info={response} setOpened={setOpened} opened={opened} />
    </>
  );
};
export default SelectStatus;
