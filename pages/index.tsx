import Head from "next/head";
import FrontPageHeader from "../components/FrontPageHeader";
import Footer from "../components/Footer";
import {
  AppShell,
  MediaQuery,
  Image,
  Flex,
  Title,
  Text,
  BackgroundImage,
  Space,
  Button,
  Grid,
  Box,
} from "@mantine/core";
import Cart from "../components/cart/Cart";
import { IconCheck } from "@tabler/icons";
import { PopulatedColor, PopulatedProduct } from "../utils/types";
import { GetStaticProps, NextPage } from "next";
import useWindowSize from "../utils/useWindowSize";
import dbConnect from "../utils/dbConnect";
import SubProduct from "../models/SubProduct";
import MainProduct from "../models/MainProduct";
import Category, { CategoryDocument } from "../models/Category";
import Color from "../models/Color";
import Season, { SeasonDocument } from "../models/Season";
import CarouselProduct from "../components/product/CarouselProduct";
import Quiz from "../components/quiz/Quiz";
import { Key, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { sortAndDeduplicateDiagnostics } from "typescript";

type Props = {
  product: PopulatedProduct;
  products: PopulatedProduct[];
  seasons: SeasonDocument[];
};

type ProductsBySeason = {
  season: string;
  products: PopulatedProduct[] | [];
};

const Home: NextPage<Props> = ({ products, seasons }) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [change, setChange] = useState(true);
  let size = useWindowSize();

  // Sets an interval of 8 seconds before the image changes.
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setChange(!change);
  //   }, 8000);

  //   return () => clearInterval(intervalId);
  // }, [change]);

  const seasonTitles: ProductsBySeason[] | any = seasons.map((season) => [
    {
      seasons: season.title,
      products: [],
    },
  ]);

  products.forEach((product) => {
    product.colors.forEach((color) => {
      color.seasons.forEach((season) => {
        seasonTitles.forEach((seasonTitle: any) => {
          seasonTitle.forEach((title: any) => {
            if (title.seasons == season.title) {
              title.products.push(product);
            }
          });
        });
      });
    });
  });

  seasonTitles.forEach((season: any) => {
    season[0].products.sort((a: any, b: any) =>
      a.createdDate < b.createdDate ? 1 : -1
    );
    const slicedList = season[0].products.slice(0, 10);
    season[0].products = slicedList;
  });

  return (
    <>
      <Head>
        <meta name="theme-color" content="#000000"></meta>
        <meta
          name="description"
          content="Vi ger dig anpassade produkter baserade på dina naturliga färger. Observera! Detta är en demobutik. Dvs, du kan inte köpa något härifrån."
        />
        <title>Hem - MakeUpByS</title>
        <meta property="og:title" content="Hem - MakeUpByS" />
        <meta
          property="og:description"
          content="Vi ger dig anpassade produkter baserade på dina naturliga färger. Observera! Detta är en demobutik. Dvs, du kan inte köpa något härifrån."
        />
        <meta property="og:url" content="https://makeupbys.se/" />
      </Head>

      <MediaQuery smallerThan={"sm"} styles={{ display: "none", zIndex: 900 }}>
        <Image src="/uploads/fadetoblackbig.svg" pos={"absolute"} top={0} />
      </MediaQuery>

      <MediaQuery largerThan={"sm"} styles={{ display: "none", zIndex: 900 }}>
        <Image src="/uploads/fadeblackmobilesvg.svg" pos={"absolute"} top={0} />
      </MediaQuery>
      <BackgroundImage
        sx={(theme) => ({
          height: "90vh",
          width: "100%",
          [theme.fn.smallerThan("lg")]: {
            height: "80vh",
          },
          [theme.fn.smallerThan("md")]: {
            height: "80vh",
          },
          [theme.fn.smallerThan("sm")]: {
            height: "70vh",
          },
          [theme.fn.smallerThan("xs")]: {
            height: "100vh",
          },
        })}
        src="/uploads/hero.jpg"
      >
        <Flex
          className="asdasdasd"
          direction={"column"}
          align={"center"}
          sx={(theme) => ({
            width: "100%",
          })}
        >
          <Flex
            className="top"
            display={"flex"}
            justify={"center"}
            align={"center"}
            sx={(theme) => ({
              zIndex: 2,
              height: "40px",
              transition: "height 1s",
              width: "100%",
            })}
          >
            <Flex
              sx={(theme) => ({
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2,
                [theme.fn.smallerThan("xs")]: {
                  display: "none",
                },
              })}
            >
              <Title fw={"400"} mr={30} tt={"uppercase"} c={"white"} fz={"md"}>
                <IconCheck size={18} /> fri frakt inom sverige
              </Title>

              <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                <Space w={"lg"} />
              </MediaQuery>

              <Title fw={"400"} ml={10} tt={"uppercase"} c={"white"} fz={"md"}>
                <IconCheck size={18} /> 100% vegan
              </Title>
            </Flex>

            <Flex
              sx={(theme) => ({
                [theme.fn.largerThan("xs")]: {
                  display: "none",
                },
              })}
            >
              <Title
                fw={"400"}
                tt={"uppercase"}
                c={"white"}
                fz={"12px"}
                sx={(theme) => ({
                  [theme.fn.smallerThan("xs")]: {
                    marginRight: "0px",
                  },
                })}
              >
                <IconCheck size={12} /> fri frakt från sverige
              </Title>

              <Space w={"lg"} />

              <Title fw={"400"} tt={"uppercase"} c={"white"} fz={"12px"}>
                <IconCheck size={12} /> 100% vegan
              </Title>
            </Flex>
          </Flex>
        </Flex>

        <Flex
          className="quizbox"
          sx={(theme) => ({
            marginTop: 270,
            gap: 100,
            width: "100%",

            justifyContent: "center",
            alignItems: "left",
            [theme.fn.smallerThan("xl")]: {
              marginTop: 230,
            },
            [theme.fn.smallerThan("lg")]: {
              marginTop: 220,
            },
            [theme.fn.smallerThan("md")]: {},
            [theme.fn.smallerThan("sm")]: {
              marginTop: 170,
              gap: 30,
            },
            [theme.fn.smallerThan("xs")]: {
              marginTop: 0,
              height: "80vh",
              gap: 20,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            },
          })}
        >
          <Flex
            justify={"space-between"}
            sx={(theme) => ({
              width: "80%",
              maxWidth: 1320,
              [theme.fn.smallerThan("lg")]: {
                width: "90%",
                maxWidth: 1320,
              },
              [theme.fn.smallerThan("xs")]: {
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              },
            })}
          >
            <Flex direction={"column"}>
              <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
                <Title
                  mb={20}
                  size={70}
                  styles={{
                    width: "100%",
                    paddingTop: "150px",
                  }}
                  sx={(theme) => ({
                    zIndex: 4000,
                    textShadow: "0px 1px 30px black",
                    [theme.fn.smallerThan("lg")]: {
                      fontSize: 65,
                    },
                    [theme.fn.smallerThan("md")]: {
                      fontSize: 55,
                    },

                    [theme.fn.smallerThan("sm")]: {
                      fontSize: 46,
                    },
                  })}
                  color={"white"}
                >
                  Make Up By Season
                </Title>
              </MediaQuery>
              <MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
                <Title
                  size={38}
                  mb={10}
                  sx={(theme) => ({
                    textShadow: "0px 1px 30px black",
                    zIndex: 400,
                    textAlign: "center",
                    [theme.fn.smallerThan(420)]: {
                      fontSize: 34,
                    },
                    [theme.fn.smallerThan(380)]: {
                      fontSize: 30,
                    },
                  })}
                  color={"white"}
                >
                  Make Up By Season
                </Title>
              </MediaQuery>
              <Flex
                sx={(theme) => ({
                  width: "100%",

                  justifyContent: "flex-start",
                  alignItems: "flex-end",
                  [theme.fn.smallerThan("xs")]: {
                    justifyContent: "center",
                  },
                })}
              >
                <Text
                  lineClamp={6}
                  w={500}
                  color={"whiteSmoke"}
                  fz={"35px"}
                  fw={"bold"}
                  sx={(theme) => ({
                    zIndex: 400,
                    textShadow: "0px 1px 10px black",
                    [theme.fn.smallerThan("lg")]: {
                      fontSize: "30px",
                    },
                    [theme.fn.smallerThan("md")]: {
                      width: 420,
                      fontSize: 28,
                    },
                    [theme.fn.smallerThan("sm")]: {
                      width: 370,
                      fontSize: "22px",
                    },
                    [theme.fn.smallerThan("xs")]: {
                      textAlign: "center",
                      fontSize: "20px",
                      width: "80%",
                      marginBottom: 40,
                    },
                    [theme.fn.smallerThan(420)]: {
                      width: "80%",
                    },
                    [theme.fn.smallerThan(380)]: {
                      width: "90%",
                    },
                  })}
                >
                  Ta reda på vilken säsong du tillhör och få skräddarsydda
                  produkter som passar just dig
                </Text>
              </Flex>
            </Flex>

            <Flex sx={{ alignItems: "flex-end" }}>
              <Button
                onClick={() => setOpened(true)}
                sx={(theme) => ({
                  height: 100,
                  color: "black",
                  minWidth: 170,
                  backgroundColor: "#E6FCF5",
                  border: "1px solid white",
                  fontSize: 25,
                  [theme.fn.smallerThan("md")]: {
                    height: 70,
                    fontSize: 22,
                    minWidth: 140,
                  },
                  [theme.fn.smallerThan("sm")]: {
                    fontSize: 20,
                    minWidth: 120,
                  },
                  [theme.fn.smallerThan("xs")]: {
                    fontSize: 21,
                    minWidth: 10,
                  },
                })}
              >
                GÅ TILL QUIZ
              </Button>
            </Flex>
          </Flex>
        </Flex>
        {/*  */}
      </BackgroundImage>
      <AppShell
        styles={(theme) => ({
          main: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
          },
        })}
        fixed={false}
        header={<FrontPageHeader />}
        footer={<Footer />}
      >
        <>
          <main
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 60,
              minHeight: "100vh",
              width: "100%",
              maxWidth: 1320,
              justifyContent: "center",
            }}
          >
            <Text
              align="center"
              fw={800}
              color={"#1D464E"}
              tt={"uppercase"}
              fz={35}
              ff={"mada"}
              mb={40}
            >
              By Season
            </Text>

            <Grid justify={"center"} gutter={6} gutterXs={"xl"}>
              {seasons
                ? seasons.map((seasons, index) => {
                    return (
                      <Grid.Col
                        key={index}
                        styles={{
                          borderRadius: "5px",
                          display: "flex",
                        }}
                        sx={(theme) => ({
                          display: "flex",
                          [theme.fn.smallerThan("md")]: {
                            width: 160,
                          },
                          [theme.fn.smallerThan("sm")]: {
                            width: 90,
                            justifyContent: "center",
                          },
                        })}
                        md={3}
                        sm={6}
                        xs={12}
                      >
                        <Link
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          key={index}
                          href={`/sasong/${seasons.slug}`}
                        >
                          <Box
                            pos={"relative"}
                            sx={(theme) => ({
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              [theme.fn.smallerThan("xl")]: {
                                width: 270,
                              },
                              [theme.fn.smallerThan("lg")]: {
                                width: 220,
                              },
                              [theme.fn.smallerThan("md")]: {
                                width: 300,
                              },

                              [theme.fn.smallerThan("sm")]: {
                                width: 380,
                              },
                              [theme.fn.smallerThan("xs")]: {
                                width: "85%",
                              },
                            })}
                          >
                            <Image
                              alt={seasons.images[0]}
                              src={`/uploads/${seasons.images[0]}`}
                              sx={{
                                transition: "opacity 2s",
                                opacity: change ? 1 : 0,
                                img: {
                                  borderRadius: "10px",
                                },
                              }}
                            />
                            <Image
                              pos={"absolute"}
                              top={0}
                              alt={seasons.images[1]}
                              src={`/uploads/${seasons.images[1]}`}
                              sx={{
                                transition: "opacity 2s",
                                opacity: !change ? 1 : 0,
                                img: {
                                  borderRadius: "10px",
                                },
                              }}
                            />
                          </Box>
                          <Title
                            sx={{
                              textAlign: "center",
                              color: "#1D464E",
                              fontSize: 15,
                              paddingTop: "10px",
                              paddingBottom: "20px",
                            }}
                          >
                            {seasons.title}
                          </Title>
                        </Link>
                      </Grid.Col>
                    );
                  })
                : null}
            </Grid>

              {seasonTitles.map((season: any, index: Key) => {
                return (
                  <>
            <Flex direction={"column"} mt={20} 
                  sx={(theme) => ({ 
                    width: "100%",
                  })}
                  >
                    <Title
                      align="center"
                      fw={800}
                      color={"#1D464E"}
                      tt={"uppercase"}
                      fz={35}
                      ff={"mada"}
                      mb={30}
                      mt={100}
                    >
                      {season[0].seasons}
                    </Title>
                    {season[0].products ? (
                      <>
                    <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
                    <Box>
                      <CarouselProduct
                        products={season[0].products}
                        slideGap="md"
                        slideSize="30.3333%"
                        slidesToScroll={undefined}
                      />
                    </Box>
                  </MediaQuery>
                  <Box
                    sx={{
                      display:
                        size.width < 767 || size.width > 1200
                          ? "none"
                          : "block",
                    }}
                  >
                    <CarouselProduct
                      products={season[0].products}
                      slideGap="md"
                      slideSize="50%"
                      slidesToScroll={2}
                    />
                  </Box>
                  <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                    <Box>
                      <CarouselProduct
                        products={season[0].products}
                        slideGap="xs"
                        slideSize="100%"
                        slidesToScroll={undefined}
                      />
                    </Box>
                  </MediaQuery>
                      </>
                      ) : null }
                </Flex>
                  </>
                )
              })}
          </main>
          <Cart />
          <Quiz opened={opened} setOpened={setOpened} />
        </>
      </AppShell>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await dbConnect();

  const product = await SubProduct.findOne({ slug: params?.slug })
    .populate({
      path: "mainProduct",
      model: MainProduct,
      populate: {
        path: "category",
        model: Category,
      },
    })
    .populate({
      path: "colors",
      model: Color,
      populate: {
        path: "seasons",
        model: Season,
      },
    });

  const subProducts = await SubProduct.find({})
    .populate({
      path: "mainProduct",
      model: MainProduct,
      populate: {
        path: "category",
        model: Category,
      },
    })
    .populate({
      path: "colors",
      model: Color,
      populate: {
        path: "seasons",
        model: Season,
      },
    });

  const seasons = await Season.find({});

  // Todo if time: #67 Find a better way. Should be able to filter the query above.
  //Check aggregation and virtuals with match
  let list: any[] = [];
  subProducts.forEach((product) => {
    product.colors.forEach((color: PopulatedColor) => {
      color.seasons.forEach((season) => {
        if (season.slug == product.colors[0].seasons[0].slug) {
          list.push(product);
        }
      });
    });
  });

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      products: JSON.parse(JSON.stringify(list)),
      seasons: JSON.parse(JSON.stringify(seasons)),
    },
  };
};

export default Home;


