import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Radio, Flex, Title, Image, Text } from "@mantine/core";
import { SkinDocument } from "../../models/Skin";
import { ListType } from "./EyeColorSection";
import { useScrollIntoView, useWindowScroll } from "@mantine/hooks";

type Props = {
  setValueSkin: Dispatch<SetStateAction<string>>;
  valueSkin: string;
  setSkinList: Dispatch<SetStateAction<SkinDocument[] | undefined>>;
};

const SkinColorSection: FC<Props> = ({
  valueSkin,
  setValueSkin,
  setSkinList,
}) => {
  // State
  const [skin, setSkin] = useState<SkinDocument[]>();
  const [scroll, scrollTo] = useWindowScroll();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 0,
  });
  // Fetches list of skin colors fom DB
  useEffect(() => {
    const getResult = async () => {
      const response = await fetch("/api/open/skin");
      let result = await response.json();

      setSkin(result.data);
      setSkinList(result.data);
      scrollIntoView({ alignment: "start" });
    };
    getResult();
  }, [valueSkin]);

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

  const skinTypes = skin ? getTypes(skin) : getTypes([]);

  return (
    <Flex
      ref={targetRef}
      direction={"column"}
      sx={{
        minHeight: "60vh",
      }}
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
          Vilken hudton har du?
        </Title>
      </Flex>
      <Radio.Group
        value={valueSkin}
        onChange={setValueSkin}
        styles={{ root: { display: "flex", flexDirection: "column" } }}
      >
        {skinTypes.map((type, i) => {
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
                  {skin
                    ? skin.map((h, i) => {
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
                                      valueSkin == h._id.toString()
                                        ? "1px solid gray"
                                        : "1px solid white",
                                  },
                                }}
                                label={
                                  <Image
                                    alt={h.name}
                                    width={60}
                                    height={60}
                                    src={"/quiz/skin/" + h.image}
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

export default SkinColorSection;
