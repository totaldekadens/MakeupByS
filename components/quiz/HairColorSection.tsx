import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Radio, Flex, Title, Image, Text } from "@mantine/core";
import { HairDocument } from "../../models/Hair";

type Props = {
  setValueHair: Dispatch<SetStateAction<string>>;
  valueHair: string;
  setHairList: Dispatch<SetStateAction<HairDocument[] | undefined>>;
};

type BoolType = {
  name: string;
  bool: boolean;
  description: string;
};

type ListType = {
  name: string;
  type: string;
  image: string;
  seasons: BoolType[];
};

const HairColorSection: FC<Props> = ({
  valueHair,
  setValueHair,
  setHairList,
}) => {
  const [hair, setHair] = useState<HairDocument[]>();

  useEffect(() => {
    const getResult = async () => {
      const response = await fetch("/api/open/hair");
      let result = await response.json();
      setHair(result.data);
      setHairList(result.data);
    };
    getResult();
  }, [valueHair]);

  const getTypes = (list: ListType[]) => {
    let types: string[] = [];
    if (list) {
      list.forEach((item) => {
        if (types.length < 1) {
          types.push(item.type);
          return;
        }
        const findType = types.find((item2) => item2 == item.type);
        if (!findType) {
          types.push(item.type);
          return;
        }
      });
    }
    return types;
  };

  const hairTypes = hair ? getTypes(hair) : getTypes([]);

  return (
    <>
      <Radio.Group
        value={valueHair}
        onChange={setValueHair}
        styles={{ root: { display: "flex", flexDirection: "column" } }}
        label={
          <Flex
            gap={20}
            mb={30}
            align="center"
            sx={(theme) => ({
              width: "100%",
              [theme.fn.smallerThan("md")]: {
                flexDirection: "column",
                gap: 10,
                alignItems: "flex-start",
              },
              [theme.fn.smallerThan("xs")]: {
                gap: 10,
                alignItems: "center",
              },
            })}
          >
            <Title
              sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: { fontSize: 26 },
              })}
            >
              Vilken hårfärg har du?
            </Title>

            <Text> Viktig att du väljer din naturliga hårfärg</Text>
          </Flex>
        }
      >
        {hairTypes.map((type) => {
          return (
            <>
              <Flex
                gap={20}
                p={20}
                ml={40}
                direction={"column"}
                sx={(theme) => ({
                  border: "1px solid lightGray",
                  borderRadius: "20px",
                  [theme.fn.smallerThan("xs")]: {
                    marginLeft: 0,
                    alignItems: "center",
                  },
                })}
              >
                <Title order={5}>{type}</Title>
                <Flex
                  gap={20}
                  sx={(theme) => ({
                    flexWrap: "wrap",
                    [theme.fn.smallerThan("xs")]: {
                      alignItems: "center",
                      justifyContent: "center",
                    },
                  })}
                >
                  {hair
                    ? hair.map((h, i) => {
                        if (h.type == type) {
                          return (
                            <Flex
                              key={i}
                              sx={(theme) => ({
                                [theme.fn.smallerThan("xs")]: {
                                  alignItems: "center",
                                  justifyContent: "center",
                                },
                              })}
                            >
                              <Radio
                                value={h._id.toString()}
                                styles={{
                                  radio: {
                                    opacity: 0,
                                    width: 0,
                                    height: 0,
                                  },
                                  label: {
                                    paddingLeft: "unset",
                                    padding: 10,
                                    borderRadius: "50%",
                                    border:
                                      valueHair == h._id.toString()
                                        ? "1px solid gray"
                                        : "1px solid white",
                                  },
                                }}
                                label={
                                  <Image
                                    alt={h.name}
                                    width={60}
                                    height={60}
                                    src={"/quiz/hair/" + h.image}
                                    fit="fill"
                                    radius={50}
                                    sx={{
                                      cursor: "pointer",
                                      borderRadius: "50%",
                                      objectFit: "fill",
                                    }}
                                  />
                                }
                              />
                            </Flex>
                          );
                        }
                      })
                    : null}
                </Flex>
              </Flex>
            </>
          );
        })}
      </Radio.Group>
      <Flex
        mt={30}
        justify={"flex-end"}
        sx={(theme) => ({
          width: "100%",
          [theme.fn.smallerThan("xs")]: {
            justifyContent: "center",
          },
        })}
      >
        <Button
          disabled={valueHair ? false : true}
          sx={(theme) => ({
            [theme.fn.smallerThan("xs")]: {
              width: "100%",
            },
          })}
        >
          Gå vidare
        </Button>
      </Flex>
    </>
  );
};

export default HairColorSection;