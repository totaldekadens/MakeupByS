import { Dispatch, FC, SetStateAction } from "react";
import {
  Modal,
  Text,
  Flex,
  Button,
  MediaQuery,
  Box,
  Tooltip,
  Title,
  Image,
  createStyles,
} from "@mantine/core";
import {
  IconCheck,
  IconEdit,
  IconInfoCircle,
  IconTrash,
  IconX,
} from "@tabler/icons";
import { PopulatedProduct } from "../../utils/types";
import Details from "../product/Details";
import { Carousel } from "@mantine/carousel";
import MainProduct from "../../models/MainProduct";

type Props = {
  product: PopulatedProduct;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};
//////////////////
type Section = {
  title: string;
  description: string;
};

export const Section: FC<Section> = ({ title, description }) => {
  return (
    <Flex gap={10}>
      <Text size={14} weight="bold">
        {title + ":"}
      </Text>
      <Text size={14}>{description}</Text>
    </Flex>
  );
};
/////////////////////
const ProductModal: FC<Props> = ({ product, setOpened, opened }) => {
  const { classes } = useStyles();
  const handleClick = () => {
    setOpened(false);
    window.location.reload();
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={product.title}
        sx={{ width: "100%" }}
        styles={{ modal: { width: "100%" } }}
      >
        <Flex sx={{ width: "100%" }}>
          <Flex direction={"column"} sx={{ width: "100%" }}>
            <Flex
              sx={(theme) => ({
                width: "100%",
                [theme.fn.smallerThan("sm")]: {
                  flexDirection: "column",
                },
              })}
              gap={20}
            >
              <Flex
                pr={20}
                pb={20}
                sx={(theme) => ({
                  width: "50%",
                  borderRight: "1px solid gray",

                  [theme.fn.smallerThan("sm")]: {
                    width: "100%",
                    borderRight: "unset",
                    borderBottom: "1px solid gray",
                  },
                })}
                direction={"column"}
              >
                <Flex justify={"space-between"}>
                  <Title mb={20} order={4}>
                    Huvudartikel:
                  </Title>
                  <Flex gap={10}>
                    <IconEdit style={{ cursor: "pointer" }} size={24} />
                  </Flex>
                </Flex>
                <Section
                  title="Artikelnummer"
                  description={product.mainProduct.partNo}
                />
                <Section
                  title="Märke"
                  description={product.mainProduct.brand}
                />
                <Section
                  title="Pris"
                  description={product.mainProduct.price.$numberDecimal + " KR"}
                />

                <Section
                  title="Kategori"
                  description={product.mainProduct.category.title}
                />
                <Section
                  title="Vikt"
                  description={product.mainProduct.weight + " g"}
                />

                <Flex direction="column">
                  <Text size={14} weight="bold">
                    Beskrivning 1:
                  </Text>
                  <Text size={14}>{product.mainProduct.description1}</Text>
                </Flex>
                <Flex direction="column">
                  <Text size={14} weight="bold">
                    Beskrivning 2: (valbar)
                  </Text>
                  <Text size={14}>
                    {product.mainProduct.description2
                      ? product.mainProduct.description2
                      : null}
                  </Text>
                </Flex>
                <Flex direction="column">
                  <Text size={14} weight="bold">
                    Ingredienser:
                  </Text>
                  <Text size={14}>{product.mainProduct.ingredients}</Text>
                </Flex>
              </Flex>
              <Flex
                sx={(theme) => ({
                  width: "50%",
                  [theme.fn.smallerThan("sm")]: {
                    width: "100%",
                  },
                })}
                direction={"column"}
              >
                <Flex justify={"space-between"}>
                  <Title mb={20} order={4}>
                    Subartikel:
                  </Title>
                  <Flex gap={10}>
                    <IconEdit style={{ cursor: "pointer" }} size={24} />
                    <IconTrash style={{ cursor: "pointer" }} size={24} />
                  </Flex>
                </Flex>

                <Section title="Artikelnummer" description={product.partNo} />
                <Section title="Titel" description={product.title} />
                <Flex gap={10}>
                  <Text size={14} weight="bold">
                    Färg:
                  </Text>
                  <Flex>
                    {product.colors.map((color) => {
                      return (
                        <Flex
                          w={30}
                          h={30}
                          sx={{ borderRadius: "50%" }}
                          bg={color.hexcolor}
                        ></Flex>
                      );
                    })}
                  </Flex>
                </Flex>
                <Flex direction={"column"}>
                  <Text size={14} weight="bold">
                    Säsong (Baserad på vilken färg produkten har):
                  </Text>
                  <Flex justify={"space-between"}>
                    <Flex>
                      {product.colors
                        ? product.colors.map((color) => {
                            return color.seasons.map((season, index) => {
                              return (
                                <Tooltip
                                  key={index}
                                  color="black"
                                  label={season.title}
                                  withArrow
                                >
                                  <Flex
                                    mt={10}
                                    key={index}
                                    mr={20}
                                    w={30}
                                    h={30}
                                    justify="center"
                                    align="center"
                                    sx={(theme) => ({
                                      borderRadius: "50%",
                                      border: "1px solid black",
                                      [theme.fn.smallerThan("md")]: {
                                        marginRight: 10,
                                        width: 25,
                                        height: 25,
                                      },
                                    })}
                                  >
                                    <Text
                                      color={"black"}
                                      size={"sm"}
                                      sx={(theme) => ({
                                        [theme.fn.smallerThan("md")]: {
                                          fontSize: theme.fontSizes.xs,
                                        },
                                      })}
                                    >
                                      {season.title.slice(0, 2)}
                                    </Text>
                                  </Flex>
                                </Tooltip>
                              );
                            });
                          })
                        : null}
                    </Flex>
                  </Flex>
                </Flex>
                <Text size={14} weight="bold" mb={10} mt={10}>
                  Bilder:
                </Text>
                <Carousel
                  withControls={product.images.length < 2 ? false : true}
                  classNames={classes}
                  mx="auto"
                  align="center"
                  styles={(theme) => ({
                    viewport: {
                      [theme.fn.smallerThan("xs")]: {
                        height: "40vh",
                      },
                    },
                    container: {
                      [theme.fn.smallerThan("xs")]: {
                        height: "40vh",
                      },
                    },
                  })}
                  loop
                  slideSize={"101%"}
                >
                  {product.images ? (
                    product.images.map((image: string, index: number) => {
                      return (
                        <Carousel.Slide key={index}>
                          <Image
                            alt={image}
                            fit="contain"
                            styles={{
                              root: {
                                display: "flex",
                                align: "center",
                                justifyContent: "center",
                              },
                              imageWrapper: {
                                display: "flex",
                                align: "center",
                              },
                              figure: {
                                display: "flex",
                                align: "center",
                              },
                            }}
                            src={`/uploads/${image}`}
                          />
                        </Carousel.Slide>
                      );
                    })
                  ) : (
                    <Carousel.Slide></Carousel.Slide>
                  )}
                </Carousel>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex mt={20} justify={"flex-end"}>
          <Button onClick={() => handleClick()}>OK</Button>
        </Flex>
      </Modal>
    </>
  );
};

const useStyles = createStyles((_theme, _params, getRef) => ({
  controls: {
    ref: getRef("controls"),
    transition: "opacity 150ms ease",
    opacity: 0,
  },

  root: {
    "&:hover": {
      [`& .${getRef("controls")}`]: {
        opacity: 1,
      },
    },
  },
  slide: {
    display: "flex",
    align: "center",
  },
}));
export default ProductModal;
