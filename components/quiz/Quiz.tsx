import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Modal } from "@mantine/core";
import { HairDocument } from "../../models/Hair";
import HairColorSection from "./HairColorSection";
import EyeColorSection from "./EyeColorSection";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

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
  //const [hair, setHair] = useState<HairDocument[]>();
  const [hairList, setHairList] = useState<HairDocument[]>();
  const [eyesList, setEyesList] = useState<HairDocument[]>();

  console.log(hairList);
  console.log(valueHair);
  useEffect(() => {
    const getResult = () => {
      const getHair = hairList
        ? hairList.filter((h) => h.name == valueHair)
        : null;
      //const getSkin = skin.filter((h) => h.name == valueSkin);
      const getEyes = eyesList
        ? eyesList.filter((h) => h.name == valueEyes)
        : null;

      if (
        getHair &&
        getHair.length > 0 &&
        getEyes &&
        getEyes.length > 0 /* && */
        //getSkin.length > 0 &&
        //getEyes.length > 0
      ) {
        const mergeLists = [
          ...getHair[0].seasons,

          ...getEyes[0].seasons,
          //...getSkin[0].seasons,
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

  const hairTypes = hairList ? getTypes(hairList) : getTypes([]);

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
        <HairColorSection
          valueHair={valueHair}
          setValueHair={setValueHair}
          setHairList={setHairList}
        />
        <EyeColorSection
          valueEyes={valueEyes}
          setValueEyes={setValueEyes}
          setEyesList={setEyesList}
        />
      </Modal>
    </>
  );
};

export default Quiz;
