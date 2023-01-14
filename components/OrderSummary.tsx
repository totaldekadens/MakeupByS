import {
  Flex,
  Title,
  Text,
  MediaQuery,
  HoverCard,
  Box,
  Table,
} from "@mantine/core";

import { IconInfoCircle, IconPoint } from "@tabler/icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC } from "react";
import { PopulatedOrder } from "../utils/types";
import SelectStatus from "./admin/SelectStatus";
import CartItemConfirmation from "./checkout/CartItemConfirmation";

type Props = {
  order: PopulatedOrder;
};

const OrderSummary: FC<Props> = ({ order }) => {
  // Admin part
  const router = useRouter();
  const session = useSession();

  // Gets list of finished displayed products
  const rows = order?.lineItems.map((cartItem, index: number) => (
    <CartItemConfirmation key={index} cartItem={cartItem} />
  ));

  let totalSum = order?.lineItems.reduce(
    (sum, item) => sum + item.price_data.unit_amount * item.quantity,
    0
  );

  return (
    <Flex p={10} align="center" direction="column" sx={{ width: "100%" }}>
      <Flex gap={10} mb={10} direction="column" sx={{ width: "100%" }}>
        <Flex direction={"column"} align="flex-start">
          <Text size={"sm"} align="end" color={"dimmed"}>
            Beställningen lagd: {order.registerDate}
          </Text>
          <Text size={"sm"} align="end" color={"dimmed"}>
            Beställningen skickad: {order?.shippingDate}
          </Text>
        </Flex>

        {order.deliveryAddress ? (
          <>
            <Flex
              gap={20}
              justify={"space-between"}
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  gap: 0,
                  flexDirection: "column",
                },
              })}
            >
              <Box mb={20}>
                <Title order={5}>Beställare: </Title>
                <Flex direction={"column"}>
                  <Flex direction="column">
                    <Text size={"sm"}>{order.email}</Text>
                    <Text size={"sm"}>{order.invoiceAddress.line1},</Text>
                    <Text size={"sm"}>
                      {order.invoiceAddress?.line2
                        ? order.invoiceAddress?.line2 + ","
                        : null}
                    </Text>

                    <Flex gap={7}>
                      <Text size={"sm"}>
                        {order.invoiceAddress?.postal_code}
                      </Text>
                      <Text size={"sm"}>{order.invoiceAddress?.city}</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    gap={3}
                    sx={(theme) => ({
                      [theme.fn.smallerThan("xs")]: {
                        flexDirection: "column",
                      },
                    })}
                  ></Flex>
                </Flex>
              </Box>
              <Box>
                <Title order={5}>Levereras till: </Title>
                <Flex direction={"column"}>
                  <Text size={"sm"}>{order.name}</Text>
                  <Flex direction="column">
                    <Text size={"sm"}>{order.deliveryAddress?.line1},</Text>
                    <Text size={"sm"}>
                      {order.deliveryAddress?.line2
                        ? order.deliveryAddress?.line2 + ","
                        : null}
                    </Text>

                    <Flex gap={7}>
                      <Text size={"sm"}>
                        {order.deliveryAddress?.postal_code}
                      </Text>
                      <Text size={"sm"}>{order.deliveryAddress?.city},</Text>
                    </Flex>
                  </Flex>
                  <Flex
                    gap={3}
                    sx={(theme) => ({
                      [theme.fn.smallerThan("xs")]: {
                        flexDirection: "column",
                      },
                    })}
                  >
                    <Text size={"sm"}>{order.phone}</Text>
                  </Flex>
                </Flex>
              </Box>
            </Flex>
          </>
        ) : (
          <Box mb={20}>
            <Title order={5}>Levereras till: </Title>
            <Flex direction={"column"}>
              <Text size={"sm"}>{order.name}</Text>
              <Flex
                gap={3}
                sx={(theme) => ({
                  [theme.fn.smallerThan("xs")]: {
                    flexDirection: "column",
                  },
                })}
              >
                <Text size={"sm"}>{order.invoiceAddress?.line1},</Text>
                <Text size={"sm"}>
                  {order.invoiceAddress?.line2
                    ? order.invoiceAddress?.line2 + ","
                    : null}
                </Text>

                <Flex gap={7}>
                  <Text size={"sm"}>{order.invoiceAddress?.postal_code}</Text>
                  <Text size={"sm"}>{order.invoiceAddress?.city},</Text>
                </Flex>
              </Flex>
              <Flex
                gap={3}
                sx={(theme) => ({
                  [theme.fn.smallerThan("xs")]: {
                    flexDirection: "column",
                  },
                })}
              >
                <Text size={"sm"}>{order.email}, </Text>
                <Text size={"sm"}>{order.phone}</Text>
              </Flex>
            </Flex>
          </Box>
        )}
        <Title order={5}>Fraktsätt</Title>
        <Flex
          justify={"space-between"}
          sx={{
            width: "100%",
          }}
        >
          <Flex>
            <Flex direction={"column"} w={230}>
              <Flex gap={10}>
                <Text size={"sm"}>{order.courrier.info.description}</Text>
                <HoverCard width={280} shadow="md">
                  <HoverCard.Target>
                    <Box>
                      <IconInfoCircle size={20} />
                    </Box>
                  </HoverCard.Target>
                  <HoverCard.Dropdown>
                    <Text size="sm">{order.courrier.info.description2}</Text>
                  </HoverCard.Dropdown>
                </HoverCard>
              </Flex>
              <Flex align={"center"}>
                <Text size={"sm"} color={"dimmed"}>
                  {order.courrier.info.cost} KR
                </Text>

                <MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
                  <Flex align={"center"} ml={12}>
                    <IconPoint size={15} fill="black" />
                    <Text color={"dimmed"} size={"sm"} ml={12}>
                      {order.courrier.info.deliveryTime.from} -{" "}
                      {order.courrier.info.deliveryTime.to} dagar
                    </Text>
                  </Flex>
                </MediaQuery>
              </Flex>
            </Flex>
          </Flex>
          <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
            <Flex>
              <Text size={"sm"} color={"dimmed"}>
                {order.courrier.info.deliveryTime.from} -{" "}
                {order.courrier.info.deliveryTime.to} dagar
              </Text>
            </Flex>
          </MediaQuery>
        </Flex>

        <Title order={5}>Produkter</Title>
        <Flex direction={"column"}>
          <Table>
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Antal</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>

          <Flex mt={10} justify={"flex-end"} sx={{ width: "100%" }}></Flex>
          <Flex mt={20} justify={"flex-end"} sx={{ width: "100%" }}>
            <Text size={"sm"} color="dimmed">
              Moms
            </Text>
            <Flex justify={"flex-end"} w={70} ml={47}>
              <Text size={"sm"}>
                {totalSum ? totalSum * 0.25 + " KR" : "Något gick fel"}
              </Text>
            </Flex>
          </Flex>
          <Flex mt={10} justify={"flex-end"} sx={{ width: "100%" }}>
            <Text size={"sm"} color="dimmed">
              Frakt
            </Text>
            <Flex justify={"flex-end"} w={70} ml={47}>
              <Text size={"sm"}>{order.courrier.info.cost + " KR"}</Text>
            </Flex>
          </Flex>
          <Flex mt={10} justify={"flex-end"} sx={{ width: "100%" }}>
            <Text size={"sm"} color="dimmed">
              Totalt inkl. moms och frakt
            </Text>
            <Flex justify={"flex-end"} w={70} ml={47}>
              <Text weight={"bold"}>
                {totalSum
                  ? totalSum + order.courrier.info.cost
                  : "Något gick fel"}{" "}
                KR
              </Text>
            </Flex>
          </Flex>
          {session.data?.user.admin && router.pathname == "/admin" ? (
            <SelectStatus order={order} />
          ) : null}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OrderSummary;
