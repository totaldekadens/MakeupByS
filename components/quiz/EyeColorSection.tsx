import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Radio, Flex, Title, Image } from "@mantine/core";
import { HairDocument } from "../../models/Hair";

type Props = {
  setValueEyes: Dispatch<SetStateAction<string>>;
  valueEyes: string;
  setEyesList: Dispatch<SetStateAction<HairDocument[] | undefined>>;
};

export type BoolType = {
  name: string;
  bool: boolean;
  description: string;
};

export type ListType = {
  name: string;
  type: string;
  image: string;
  seasons: BoolType[];
};

const EyeColorSection: FC<Props> = ({
  setValueEyes,
  valueEyes,
  setEyesList,
}) => {
  // State
  const [eyeColors, setEyeColors] = useState<HairDocument[]>();

  // Fetches list of eye colors fom DB
  useEffect(() => {
    const getResult = async () => {
      const response = await fetch("/api/open/eyes");
      let result = await response.json();
      setEyeColors(result.data);
      setEyesList(result.data);
    };
    getResult();
  }, [valueEyes]);

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

  const EyeColorTypes = eyeColors ? getTypes(eyeColors) : getTypes([]);

  return (
    <Flex
      direction={"column"}
      sx={{
        minHeight: "60vh",
      }}
    >
      <Flex
        gap={10}
        mb={30}
        align="center"
        sx={(theme) => ({
          width: "100%",
          [theme.fn.smallerThan("md")]: {
            flexDirection: "column",

            alignItems: "flex-start",
          },
          [theme.fn.smallerThan("xs")]: {
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
          Vilken ögonfärg har du?
        </Title>
      </Flex>
      <Radio.Group
        value={valueEyes}
        onChange={setValueEyes}
        styles={{ root: { display: "flex", flexDirection: "column" } }}
      >
        {EyeColorTypes.map((type, i) => {
          return (
            <Flex
              key={i}
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
                gap={10}
                sx={(theme) => ({
                  flexWrap: "wrap",
                  [theme.fn.smallerThan("xs")]: {
                    alignItems: "center",
                    justifyContent: "center",
                  },
                })}
              >
                {eyeColors
                  ? eyeColors.map((h, i) => {
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
                                    valueEyes == h._id.toString()
                                      ? "1px solid gray"
                                      : "1px solid white",
                                },
                              }}
                              label={
                                <Image
                                  alt={h.name}
                                  width={60}
                                  height={60}
                                  src={"/quiz/eyes/" + h.image}
                                  fit="contain"
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
          );
        })}
      </Radio.Group>
    </Flex>
  );
};

export default EyeColorSection;
