import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Radio, Flex, Title, Image, Text } from "@mantine/core";
import { HairDocument } from "../../models/Hair";
import { ListType } from "./EyeColorSection";

type Props = {
  setValueHair: Dispatch<SetStateAction<string>>;
  valueHair: string;
  setHairList: Dispatch<SetStateAction<HairDocument[] | undefined>>;
};

const HairColorSection: FC<Props> = ({
  valueHair,
  setValueHair,
  setHairList,
}) => {
  // State
  const [hair, setHair] = useState<HairDocument[]>();

  // Fetches list of hair colors fom DB
  useEffect(() => {
    const getResult = async () => {
      const response = await fetch("/api/open/hair");
      let result = await response.json();
      setHair(result.data);
      setHairList(result.data);
    };
    getResult();
  }, [valueHair]);

  // Sets all types in a separate list
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
    <Flex
      px={20}
      direction={"column"}
      sx={(theme) => ({
        minHeight: "60vh",
        [theme.fn.smallerThan("xs")]: {
          paddingRight: 10,
          paddingLeft: 10,
        },
      })}
    >
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
            [theme.fn.smallerThan("xs")]: { fontSize: 24, textAlign: "center" },
          })}
        >
          Vilken hårfärg har du?
        </Title>

        <Text> Viktig att du väljer din naturliga hårfärg</Text>
      </Flex>
      <Radio.Group
        value={valueHair}
        onChange={setValueHair}
        styles={{ root: { display: "flex", flexDirection: "column" } }}
      >
        {hairTypes.map((type, i) => {
          return (
            <>
              <Flex
                key={i}
                gap={20}
                p={20}
                ml={40}
                direction={"column"}
                sx={(theme) => ({
                  border: "1px solid lightGray",
                  borderRadius: "20px",
                  [theme.fn.smallerThan("sm")]: {
                    marginLeft: 0,
                    gap: 5,
                  },
                  [theme.fn.smallerThan("xs")]: {
                    alignItems: "center",
                    paddingLeft: 5,
                    paddingRight: 5,
                  },
                })}
              >
                <Title order={5}>{type}</Title>
                <Flex
                  gap={20}
                  sx={(theme) => ({
                    flexWrap: "wrap",
                    [theme.fn.smallerThan("sm")]: {
                      gap: 10,
                    },
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
    </Flex>
  );
};

export default HairColorSection;
