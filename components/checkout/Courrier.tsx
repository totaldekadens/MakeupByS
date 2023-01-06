import { Flex, Radio, Title, Text, Image, HoverCard, Box } from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { FC, useContext, useEffect, useRef, useState } from "react";
import { CourrierDocument } from "../../models/Courrier";
import { checkoutContext } from "../context/checkoutProvider";
import ContainerWithBorder from "../layout/ContainerWithBorder";
import useWindowSize from "../../utils/useWindowSize";
import { LineItem } from "../AddToCartIcon";

const Courrier: FC = () => {
  // Context
  const { checkout, setCheckout } = useContext(checkoutContext);

  // States
  const [courriers, setCourriers] = useState<CourrierDocument[] | []>([]);
  const [value, setValue] = useState("");
  const [freight, setFreight] = useState();
  const [weight, setWeight] = useState<number>();

  // Refs
  const valueRef = useRef<any | null>();
  valueRef.current = checkout;

  // Gets current window height and window width
  let size = useWindowSize();

  // Gets totalsum of cart items
  let totalSum = checkout.cartItems.reduce(
    (sum: any, item: LineItem) =>
      sum + item.price_data.unit_amount * item.quantity,
    0
  );

  // Gets all courriers and sets to a state
  useEffect(() => {
    const updateCourrierInfo = async () => {
      let response = await fetch(`/api/open/courrier`);
      let result = await response.json();
      if (result.success) {
        // Sets freight cost to 0 if free or freeFrom is enabled
        result.data.map((courrier: CourrierDocument) => {
          return courrier.options.map((option) => {
            return option.cost.map((freightCost) => {
              if (option.free) {
                freightCost.cost = 0;
              }
              if (
                option.freeFrom.enabled &&
                totalSum > option.freeFrom.amount
              ) {
                freightCost.cost = 0;
              }
            });
          });
        });
        setCourriers(result.data);
      }
    };
    updateCourrierInfo();
  }, [checkout, totalSum]);

  // Sets total weight of cartItems
  useEffect(() => {
    let checkoutCopy = valueRef.current;
    const updateWeight = async () => {
      let totalWeight = checkoutCopy.cartItems.reduce(
        (sum: any, item: LineItem) =>
          sum + item.price_data.product_data.metadata.weight * item.quantity,
        0
      );
      setWeight(totalWeight);
    };
    updateWeight();
  }, [checkout.cartItems]);

  // Sets checkout state with the current courrier info
  useEffect(() => {
    const updateCheckoutInfo = async () => {
      // Gets chosen courrier e.g Postnord
      const getCourrier = courriers.find((courrier) =>
        courrier.options.some((option) => option._id == value)
      );
      // Gets chosen freight option
      if (getCourrier) {
        var result = getCourrier.options.filter((obj) => {
          return obj._id == value;
        });
        if (result) {
          const costOption = result[0];
          // Gets chosen freight cost in option
          const getFreightCost = costOption.cost.filter((freight) => {
            if (weight) {
              if (weight < freight.maxWeight && weight > freight.minWeight) {
                return freight;
              }
            }
          });

          const freightOption = getFreightCost[0];

          const courrierInfo = {
            name: getCourrier.name,
            info: costOption,
            chosenFreightOption: freightOption,
          };

          const checkoutCopy = { ...checkout };
          checkoutCopy.courrier = courrierInfo;

          setCheckout(checkoutCopy);
        }
      }
    };
    updateCheckoutInfo();
  }, [value]);

  return (
    <>
      <Title order={2} mt={20}>
        Fraktsätt
      </Title>
      <ContainerWithBorder>
        <Radio.Group
          value={value}
          onChange={setValue}
          orientation="vertical"
          name="favoriteFramework"
        >
          {courriers
            ? courriers[0]
              ? courriers.map((courrier) => {
                  return courrier.options.map((option, index) => {
                    return (
                      <Radio
                        key={index}
                        styles={{
                          root: {
                            width: "100%",
                          },
                          body: {
                            width: "100%",
                          },
                          labelWrapper: {
                            width: "100%",
                            display: "flex",
                          },
                        }}
                        value={option._id}
                        label={
                          <Flex
                            justify={"space-between"}
                            sx={{ width: "100%" }}
                          >
                            <Flex>
                              <Flex direction={"column"} w={175}>
                                <Flex gap={10}>
                                  <Title
                                    order={5}
                                    sx={(theme) => ({
                                      [theme.fn.smallerThan("xs")]: {
                                        fontSize: "14px",
                                      },
                                    })}
                                  >
                                    {option.title}
                                  </Title>
                                  <HoverCard width={280} shadow="md">
                                    <HoverCard.Target>
                                      <Box>
                                        <IconInfoCircle size={20} />
                                      </Box>
                                    </HoverCard.Target>
                                    <HoverCard.Dropdown>
                                      <Text size="sm">
                                        {option.description2}
                                      </Text>
                                    </HoverCard.Dropdown>
                                  </HoverCard>
                                </Flex>
                                <Text>{option.description}</Text>
                                {option.cost.map((freightCost, index) => {
                                  if (
                                    weight &&
                                    weight < freightCost.maxWeight &&
                                    weight > freightCost.minWeight
                                  ) {
                                    return (
                                      <Text key={index}>
                                        {freightCost.cost} KR
                                      </Text>
                                    );
                                  }
                                })}
                              </Flex>
                            </Flex>
                            <Flex>
                              <Text>
                                {option.deliveryTime.from} -{" "}
                                {option.deliveryTime.to} dagar
                              </Text>
                            </Flex>
                            <Flex
                              sx={(theme) => ({
                                width: 60,
                                [theme.fn.smallerThan("xs")]: {
                                  width: 20,
                                },
                              })}
                            >
                              <Image
                                alt={courriers[0].name}
                                src={
                                  size.width > 550
                                    ? `/uploads/${courriers[0].image}`
                                    : `/uploads/postnord2.png` // Lägg till denna i schemat, temporärt!
                                }
                              />
                            </Flex>
                          </Flex>
                        }
                      />
                    );
                  });
                })
              : null
            : null}
        </Radio.Group>
      </ContainerWithBorder>
    </>
  );
};

export default Courrier;
