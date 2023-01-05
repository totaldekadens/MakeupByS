import {
  Flex,
  Radio,
  Title,
  Text,
  Image,
  HoverCard,
  Button,
  Box,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons";
import { FC, useContext, useEffect, useState } from "react";
import { CourrierDocument } from "../../models/Courrier";
import { checkoutContext } from "../context/checkoutProvider";
import ContainerWithBorder from "../layout/ContainerWithBorder";
import useWindowSize from "../../utils/useWindowSize";

const Courrier: FC = () => {
  const { checkout, setCheckout } = useContext(checkoutContext);
  const [courriers, setCourriers] = useState<CourrierDocument[] | []>([]);
  const [value, setValue] = useState("");

  let size = useWindowSize();

  // Hämta alla fraktsätt och sätt i ett state.
  useEffect(() => {
    const updateCourrierInfo = async () => {
      let response = await fetch(`/api/open/courrier`);
      let result = await response.json();
      if (result.success) {
        setCourriers(result.data);
      }
    };
    updateCourrierInfo();
  }, [checkout]);

  useEffect(() => {
    const updateCheckoutInfo = async () => {
      const getCourrier = courriers.find((courrier) =>
        courrier.options.some((option) => option._id == value)
      );
      if (getCourrier) {
        var result = getCourrier.options.filter((obj) => {
          return obj._id == value;
        });
        if (result) {
          const costOption = result[0];

          const courrierInfo = {
            name: getCourrier.name,
            cost: costOption,
          };

          const checkoutCopy = { ...checkout };

          checkoutCopy.courrier = courrierInfo;
          // Kolla om du kan räkna ut den rätt kostnad också beroende på vikt.
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
                                <Text>{option.cost[0].cost} KR</Text>
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
