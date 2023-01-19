import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Box, Button, Flex, Modal, ScrollArea } from "@mantine/core";
import { HairDocument } from "../../models/Hair";
import HairColorSection from "./HairColorSection";
import EyeColorSection from "./EyeColorSection";
import SkinColorSection from "./SkinColorSection";
import { SkinDocument } from "../../models/Skin";
import { EyeDocument } from "../../models/Eyes";
import useWindowSize from "../../utils/useWindowSize";
import { useScrollIntoView } from "@mantine/hooks";
import { IconChevronsDownLeft } from "@tabler/icons";

type Props = {
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

type Type = {
  item: string;
  qty: number;
  description: string;
};

const Quiz: FC<Props> = ({ opened, setOpened }) => {
  const [valueHair, setValueHair] = useState("");
  const [valueSkin, setValueSkin] = useState("");
  const [valueEyes, setValueEyes] = useState("");
  const [hairList, setHairList] = useState<HairDocument[]>();
  const [eyesList, setEyesList] = useState<EyeDocument[]>();
  const [skinList, setSkinList] = useState<SkinDocument[]>();
  const [openNext, setOpenNext] = useState<number>(0);

  // Gets current window height and window width
  let size = useWindowSize();

  // Sets height, minus known pixels in relation the container needs to be adjusted to
  const setHeight = size.height - 300;

  useEffect(() => {
    const getResult = () => {
      if (hairList && skinList && eyesList) {
        const getHair = hairList.filter((h) => h._id.toString() == valueHair);
        const getSkin = skinList.filter((h) => h._id.toString() == valueSkin);
        const getEyes = eyesList.filter((h) => h._id.toString() == valueEyes);

        if (getHair.length > 0 && getSkin.length > 0 && getEyes.length > 0) {
          const mergeLists = [
            ...getHair[0].seasons,

            ...getEyes[0].seasons,
            ...getSkin[0].seasons,
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
      }
    };
    getResult();
  }, [valueHair, valueSkin, valueEyes]);

  return (
    <>
      <Modal
        styles={{
          body: {
            height: "80vh",
            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
          },
        }}
        size={"90%"}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        <ScrollArea
          style={{ height: setHeight, width: "100%" }}
          scrollbarSize={8}
        >
          {openNext == 0 ? (
            <HairColorSection
              valueHair={valueHair}
              setValueHair={setValueHair}
              setHairList={setHairList}
              setOpen={setOpenNext}
            />
          ) : null}

          {openNext == 1 ? (
            <EyeColorSection
              valueEyes={valueEyes}
              setValueEyes={setValueEyes}
              setEyesList={setEyesList}
              setOpen={setOpenNext}
            />
          ) : null}
          {openNext == 2 ? (
            <SkinColorSection
              valueSkin={valueSkin}
              setValueSkin={setValueSkin}
              setSkinList={setSkinList}
              setOpen={setOpenNext}
            />
          ) : null}
        </ScrollArea>
        <Flex
          gap={20}
          mt={30}
          justify={"flex-end"}
          sx={(theme) => ({
            width: "100%",
            [theme.fn.smallerThan("xs")]: {
              justifyContent: "center",
            },
          })}
        >
          {openNext == 0 ? null : (
            <Button
              variant="outline"
              onClick={() => {
                setOpenNext(openNext - 1);
              }}
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  width: "100%",
                },
              })}
            >
              Gå tillbaka
            </Button>
          )}

          <Button
            onClick={() => {
              setOpenNext(openNext + 1);
            }}
            disabled={
              openNext == 0 && valueHair
                ? false
                : openNext == 1 && valueEyes
                ? false
                : openNext == 2 && valueSkin
                ? false
                : true
            }
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                width: "100%",
              },
            })}
          >
            {openNext == 2 && valueSkin ? "Gå till resultat" : "Gå vidare"}
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default Quiz;
