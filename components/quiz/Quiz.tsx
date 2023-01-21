import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Flex, Modal, Text } from "@mantine/core";
import { HairDocument } from "../../models/Hair";
import HairColorSection from "./HairColorSection";
import EyeColorSection from "./EyeColorSection";
import SkinColorSection from "./SkinColorSection";
import { SkinDocument } from "../../models/Skin";
import { EyeDocument } from "../../models/Eyes";
import useWindowSize from "../../utils/useWindowSize";
import { useWindowScroll } from "@mantine/hooks";
import Result from "./Result";
import { Circles } from "react-loader-spinner";

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
  const [result, setResult] = useState<{
    item: string;
    qty: number;
    description: string;
  }>();
  const [loading, setLoading] = useState<boolean>(false);

  const [scroll, scrollTo] = useWindowScroll();
  // Gets current window height and window width
  let size = useWindowSize();

  // Sets the result of the quiz. First index in the list is the winner!
  useEffect(() => {
    const getResult = () => {
      if (openNext == 2) {
        setResult(undefined);
      }

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
          setResult(list[0]);
        }
      }
    };
    getResult();
  }, [valueHair, valueSkin, valueEyes]);

  // Starts a spinner before the user gets the result
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, [result]);

  // Resets values when you leave the modal
  useEffect(() => {
    if (!opened) {
      setOpenNext(0);
      setValueEyes("");
      setValueHair("");
      setValueSkin("");
      setResult(undefined);
    }
  }, [opened]);

  return (
    <>
      <Modal
        styles={(theme) => ({
          modal: { maxWidth: 1200 },
          body: {
            minHeight: "70vh",

            paddingLeft: 20,
            paddingRight: 20,
            paddingBottom: 20,
            [theme.fn.smallerThan("sm")]: {
              paddingLeft: 0,
              paddingRight: 0,
            },
          },
        })}
        size={size.width > 576 ? "90%" : "95%"}
        centered
        opened={opened}
        onClose={() => setOpened(false)}
      >
        {openNext == 0 ? (
          <HairColorSection
            valueHair={valueHair}
            setValueHair={setValueHair}
            setHairList={setHairList}
          />
        ) : null}

        {openNext == 1 ? (
          <EyeColorSection
            valueEyes={valueEyes}
            setValueEyes={setValueEyes}
            setEyesList={setEyesList}
          />
        ) : null}
        {openNext == 2 ? (
          <SkinColorSection
            valueSkin={valueSkin}
            setValueSkin={setValueSkin}
            setSkinList={setSkinList}
          />
        ) : null}
        {openNext == 3 && result ? (
          <>
            {loading ? (
              <Flex
                sx={{ width: "100%", minHeight: "60vh" }}
                direction="column"
                justify="center"
                align={"center"}
                gap="md"
              >
                <Circles
                  height="80"
                  width="80"
                  color="#CC9887"
                  ariaLabel="circles-loading"
                  visible={true}
                />
                <Text>Kalkylerar...</Text>
              </Flex>
            ) : (
              <Result
                item={result.item}
                description={result.description}
                setOpened={setOpened}
              />
            )}
          </>
        ) : null}

        <Flex
          gap={20}
          mt={30}
          justify={"flex-end"}
          sx={(theme) => ({
            width: "100%",
            [theme.fn.smallerThan("xs")]: {
              justifyContent: "center",
              flexDirection: "column",
            },
          })}
        >
          {openNext == 0 || openNext == 3 ? null : (
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
          {openNext == 3 ? null : (
            <Button
              onClick={() => {
                setOpenNext(openNext + 1);
                scrollTo({ y: 0 });
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
          )}
        </Flex>
        <Text mt={10} size={"xs"} color={"dimmed"}>
          Källa:
          https://gabriellearruda.com/seasonal-color-analysis-what-season-are-you/
        </Text>
      </Modal>
    </>
  );
};

export default Quiz;
