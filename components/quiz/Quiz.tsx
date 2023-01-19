import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import {
  Modal,
  Button,
  Group,
  Radio,
  Flex,
  Title,
  Image,
  Text,
} from "@mantine/core";
import { ListItem } from "@mantine/core/lib/List/ListItem/ListItem";
import { HairDocument } from "../../models/Hair";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const eyes: ListType[] = [
  {
    name: "blue",
    type: "blue",
    image: "/quiz/hair/B1.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Höst", bool: true, description: "" },
      { name: "Vinter", bool: true, description: "" },
    ],
  },
  {
    name: "brown",
    type: "dark",
    image: "/quiz/hair/B1.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Vinter", bool: false, description: "" },
    ],
  },
  {
    name: "green",
    type: "green",
    image: "/quiz/hair/B1.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Höst", bool: true, description: "" },
      { name: "Vinter", bool: false, description: "" },
    ],
  },
];

const skin: ListType[] = [
  {
    name: "pale",
    type: "rosy",
    image: "/quiz/hair/B1.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Höst", bool: true, description: "" },
      { name: "Vinter", bool: false, description: "" },
    ],
  },
  {
    name: "dark",
    type: "dark",
    image: "/quiz/hair/B1.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Höst", bool: true, description: "" },
      { name: "Vinter", bool: false, description: "" },
    ],
  },
  {
    name: "olive",
    type: "olive",
    image: "/quiz/hair/B1.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Höst", bool: true, description: "" },
      { name: "Vinter", bool: false, description: "" },
    ],
  },
];

type BoolType = {
  name: string;
  bool: boolean;
  description: string;
};

type Type = {
  item: string;
  qty: number;
  description: string;
};

type ListType = {
  name: string;
  type: string;
  image: string;
  seasons: BoolType[];
};

const Quiz: FC<Props> = ({ opened, setOpened }) => {
  const [valueHair, setValueHair] = useState("");
  const [valueSkin, setValueSkin] = useState("");
  const [valueEyes, setValueEyes] = useState("");
  const [hair, setHair] = useState<HairDocument[]>();

  useEffect(() => {
    const getResult = () => {
      const getHair = hair ? hair.filter((h) => h.name == valueHair) : null;
      const getSkin = skin.filter((h) => h.name == valueSkin);
      const getEyes = eyes.filter((h) => h.name == valueEyes);

      if (
        getHair &&
        getHair.length > 0 &&
        getSkin.length > 0 &&
        getEyes.length > 0
      ) {
        const mergeLists = [
          ...getHair[0].seasons,
          ...getSkin[0].seasons,
          ...getEyes[0].seasons,
        ];
        let list: Type[] = [];
        mergeLists.forEach((item) => {
          if (item.bool) {
            const findItem = list.find(
              (listItem) => listItem.item == item.name
            );
            if (!findItem) {
              list.push({
                item: item.name,
                qty: 1,
                description: item.description,
              });
              return;
            }
            let objIndex = list.findIndex((obj) => obj.item == item.name);
            list[objIndex].qty = list[objIndex].qty + 1;
          }
        });
        list.sort((a, b) => (a.qty < b.qty ? 1 : -1));
        console.log(list);
      }
    };
    getResult();
  }, [valueHair, valueSkin, valueEyes]);

  useEffect(() => {
    const getResult = async () => {
      const response = await fetch("/api/open/hair");
      let result = await response.json();
      setHair(result.data);
    };
    getResult();
  }, [opened]);

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
      <Modal
        styles={{
          body: { paddingLeft: 20, paddingRight: 20, paddingBottom: 20 },
        }}
        size={"90%"}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
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
      </Modal>
    </>
  );
};

export default Quiz;
