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
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

type Props = {
  product: PopulatedProduct;
  products: PopulatedProduct[];
  seasons: SeasonDocument[];
};

type ProductsBySeason = {
  season: string;
  products: PopulatedProduct[] | [];
}


const Home: NextPage<Props> = ({ product, products, seasons }) => {
  const router = useRouter();
  const { seasonSlug } = router.query;
  const [opened, setOpened] = useState(false);
  let size = useWindowSize();


  const seasonTitles: ProductsBySeason[] | any = seasons.map((season) => [
    {
      seasons: season.title,
      products: []
    },
  ]);

  products.forEach((product) => {
    product.colors.forEach((color) => {
      color.seasons.forEach((season) => {
        seasonTitles.forEach((seasonTitle: any) => {
          seasonTitle.forEach((title: any) => {
            if (title.season == season.title) {
              title.products.push(product);
            }
          })
        })
      })
    })
  })


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
      
      <MediaQuery smallerThan={"sm"} styles={{ display: "none" }}>
        <Image src="/uploads/fadetoblackbig.svg" pos={"absolute"} top={0} />
      </MediaQuery>

      <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
        <Image src="/uploads/fadeblackmobilesvg.svg" pos={"absolute"} top={0} />
      </MediaQuery>
      <BackgroundImage
        sx={(theme) => ({
          height: "80vh",
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
            height: "90vh",
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
            marginTop: 230,
            gap: 100,
            width: "80%",
            justifyContent: "left",
            alignItems: "left",
            [theme.fn.smallerThan("lg")]: {
              marginTop: 220,
              width: "82%",
            },
            [theme.fn.smallerThan("md")]: {
              width: "90%",
            },
            [theme.fn.smallerThan("sm")]: {
              width: "95%",
              marginTop: 300,
              gap: 30,
            },
            [theme.fn.smallerThan("xs")]: {
              gap: 20,
              width: "100%",
              marginTop: 220,
              justifyContent: "flex-end",
              alignItems: "center",
              flexDirection: "column",
            },
          })}
        >
          <MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
            <Title
              styles={{ width: "100%", paddingTop: "150px" }}
              color={"white"}
            >
              Make Up By Season
            </Title>
          </MediaQuery>
          <Flex
            sx={(theme) => ({
              width: "70%",
              justifyContent: "flex-end",
              alignItems: "flex-end",
              [theme.fn.smallerThan("xs")]: {
                width: "60%",
              },
            })}
          >
            <Text
              lineClamp={6}
              w={400}
              align="center"
              color={"white"}
              fz={"40px"}
              fw={"bold"}
              sx={(theme) => ({
                [theme.fn.smallerThan("lg")]: {
                  fontSize: "40px",
                },
                [theme.fn.smallerThan("sm")]: {
                  fontSize: "25px",
                },
                [theme.fn.smallerThan("xs")]: {
                  fontSize: "20px",
                },
              })}
            >
              Ta reda på vilken säsong du tillhör och få skräddarsydda produkter
              som passar just dig
            </Text>
          </Flex>

          <Flex sx={{ alignItems: "flex-end" }}>
            <Button
              onClick={() => setOpened(true)}
              sx={(theme) => ({
                height: 100,
                width: 40,
                backgroundColor: "transparent",
                border: "1px solid white",
                [theme.fn.smallerThan("xs")]: {
                  height: 70,
                  width: 20,
                },
              })}
            >
              GÅ TILL QUIZ
            </Button>
          </Flex>
        </Flex>
        {/*  */}
      </BackgroundImage>
      <AppShell fixed={false} header={<FrontPageHeader />} footer={<Footer />}>
        <>
          <main style={{ marginTop: 60, minHeight: "100vh" }}>
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
            {seasons ? (
              seasons.map((seasons, index) => {
                return (
                  <Grid.Col key={index} styles={{ borderRadius: "5px" }} span={8} md={3} sm={3} xs={3}>
                    <Link key={index} href={`/sasong/${seasons.slug}`}>
                      <Image
                        alt={seasons.image}
                        src={`/uploads/${seasons.image}`}
                        sx={{
                          img: {
                            borderRadius: "10px",
                          },
                        }}
                      />
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
              ): null}
              </Grid>


            {/* <Flex direction={"column"} mt={20} sx={{ width: "100%" }}>
              <Text
                align="center"
                fw={800}
                color={"#1D464E"}
                tt={"uppercase"}
                fz={35}
                ff={"mada"}
                mb={30}
                mt={100}
              >
                vårens nyheter
              </Text>
              
              <MediaQuery smallerThan={"lg"} styles={{ display: "none" }}>
                <Box>
                  <CarouselProduct
                    products={products}
                    slideGap="md"
                    slideSize="30.3333%"
                    slidesToScroll={undefined}
                  />
                </Box>
              </MediaQuery>

              <Box
                sx={{
                  display:
                    size.width < 767 || size.width > 1200 ? "none" : "block",
                }}
              >
                <CarouselProduct
                  products={products}
                  slideGap="md"
                  slideSize="50%"
                  slidesToScroll={2}
                />
              </Box>

              <MediaQuery largerThan={"sm"} styles={{ display: "none" }}>
                <Box>
                  <CarouselProduct
                    products={products}
                    slideGap="xs"
                    slideSize="100%"
                    slidesToScroll={undefined}
                  />
                </Box>
              </MediaQuery>
            </Flex> */}
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

    const seasons = await Season.find({})
    
    
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
      seasons: JSON.parse(JSON.stringify(seasons))
    },
  };
};

export default Home;
