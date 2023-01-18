import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Modal, Button, Group, Radio } from "@mantine/core";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const hair: ListType[] = [
  {
    name: "blond",
    type: "ash",
    seasons: [
      { name: "spring", bool: true },
      { name: "summer", bool: false },
      { name: "autumn", bool: true },
      { name: "winter", bool: false },
    ],
  },
  {
    name: "brown",
    type: "golden",
    seasons: [
      { name: "spring", bool: true },
      { name: "summer", bool: false },
      { name: "autumn", bool: true },
      { name: "winter", bool: false },
    ],
  },
  {
    name: "black",
    type: "ash",
    seasons: [
      { name: "spring", bool: true },
      { name: "summer", bool: false },
      { name: "autumn", bool: true },
      { name: "winter", bool: false },
    ],
  },
];

const eyes: ListType[] = [
  {
    name: "blue",
    type: "blue",
    seasons: [
      { name: "spring", bool: true },
      { name: "summer", bool: false },
      { name: "autumn", bool: true },
      { name: "winter", bool: false },
    ],
  },
  {
    name: "brown",
    type: "dark",
    seasons: [
      { name: "spring", bool: true },
      { name: "summer", bool: false },
      { name: "autumn", bool: true },
      { name: "winter", bool: false },
    ],
  },
  {
    name: "green",
    type: "green",
    seasons: [
      { name: "spring", bool: true },
      { name: "summer", bool: false },
      { name: "autumn", bool: true },
      { name: "winter", bool: false },
    ],
  },
];

const skin: ListType[] = [
  {
    name: "pale",
    type: "rosy",
    seasons: [
      { name: "spring", bool: true },
      { name: "summer", bool: false },
      { name: "autumn", bool: true },
      { name: "winter", bool: false },
    ],
  },
  {
    name: "dark",
    type: "dark",
    seasons: [
      { name: "spring", bool: true },
      { name: "summer", bool: false },
      { name: "autumn", bool: true },
      { name: "winter", bool: false },
    ],
  },
  {
    name: "olive",
    type: "olive",
    seasons: [
      { name: "spring", bool: true },
      { name: "summer", bool: false },
      { name: "autumn", bool: true },
      { name: "winter", bool: false },
    ],
  },
];

type BoolType = {
  name: string;
  bool: boolean;
};

type ListType = {
  name: string;
  type: string;
  seasons: BoolType[];
};

const Quiz: FC<Props> = ({ opened, setOpened }) => {
  const [valueHair, setValueHair] = useState("");
  const [valueSkin, setValueSkin] = useState("");
  const [valueEyes, setValueEyes] = useState("");

  useEffect(() => {
    const hej = () => {
      const getHair = hair.filter((h) => h.name == valueHair);
      const getSkin = skin.filter((h) => h.name == valueSkin);
      const getEyes = eyes.filter((h) => h.name == valueEyes);

      if (getHair.length > 0 && getSkin.length > 0 && getEyes.length > 0) {
        const mergeLists = [
          ...getHair[0].seasons,
          ...getSkin[0].seasons,
          ...getEyes[0].seasons,
        ];
        console.log(mergeLists);
        let list = { spring: 0, summer: 0, autumn: 0, winter: 0 };
        let hej = mergeLists.forEach((item) => {});
      }
    };
    hej();
  }, [valueHair, valueSkin, valueEyes]);

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
          {hair.map((h, i) => {
            return <Radio key={i} value={h.name} label={h.name} />;
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
