import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Modal, Button, Group, Radio, Flex, Title, Image } from "@mantine/core";
import { ListItem } from "@mantine/core/lib/List/ListItem/ListItem";
import { HairDocument } from "../../models/Hair";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

/* const hair: ListType[] = [
  {
    name: "blond",
    type: "Ash",
    image: "/quiz/hair/B1.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Höst", bool: true, description: "" },
      { name: "Vinter", bool: false, description: "" },
    ],
  },
  {
    name: "light brown",
    type: "Ash",
    image: "/quiz/hair/B3.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Höst", bool: true, description: "" },
      { name: "Vinter", bool: false, description: "" },
    ],
  },
  {
    name: "brown",
    type: "Golden",
    image: "/quiz/hair/G2.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Höst", bool: true, description: "" },
      { name: "Vinter", bool: false, description: "" },
    ],
  },
  {
    name: "black",
    type: "Dark",
    image: "/quiz/hair/B9.png",
    seasons: [
      { name: "Vår", bool: true, description: "" },
      { name: "Sommar", bool: false, description: "" },
      { name: "Höst", bool: true, description: "" },
      { name: "Vinter", bool: false, description: "" },
    ],
  },
]; */

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
  //console.log(valueHair);
  //console.log(hair);
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

  const eyeTypes = getTypes(eyes);
  const skinTypes = getTypes(skin);
  return (
    <>
      <Modal
        size={"90%"}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <Radio.Group
          value={valueHair}
          onChange={setValueHair}
          label="Vad har du för hårfärg?"
        >
          {hairTypes.map((type) => {
            return (
              <>
                <Flex gap={20} p={20} direction={"column"}>
                  <Title order={5}>{type}</Title>
                  <Flex gap={20}>
                    {hair
                      ? hair.map((h, i) => {
                          if (h.type == type) {
                            return (
                              <Flex key={i}>
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
        <Radio.Group
          value={valueEyes}
          onChange={setValueEyes}
          label="Vad har du för ögonfärg?"
        >
          {eyes.map((e, i) => {
            return <Radio key={i} value={e.name} label={e.name} />;
          })}
        </Radio.Group>
        <Radio.Group
          value={valueSkin}
          onChange={setValueSkin}
          label="Vad har du för hudton?"
        >
          {skin.map((h, i) => {
            return <Radio key={i} value={h.name} label={h.name} />;
          })}
        </Radio.Group>
      </Modal>
    </>
  );
};

export default Quiz;
