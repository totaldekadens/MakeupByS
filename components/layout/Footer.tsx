import {
  Title,
  Footer as MantineFooter,
  Divider,
  Text,
  Flex,
  Image,
  Center,
  Box,
  MediaQuery,
} from "@mantine/core";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <MantineFooter
        fixed={false}
        height={270}
        sx={(theme) => ({
          paddingTop: 50,
          backgroundColor: theme.colors.brand[3],
          [theme.fn.smallerThan("xs")]: {
           paddingTop: 30,
          }
        })}
      >
          <Flex sx={(theme) => ({
            justifyContent: "space-evenly",
            [theme.fn.smallerThan("xs")]: {
              flexWrap: "wrap",
              justifyContent: "center",
              alignContent: "center",
            }
            })}>    
            <Box
              sx={(theme) => ({
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                paddingBottom: 10,
                paddingRight: 35,
                [theme.fn.smallerThan(473)]: {
                  paddingRight: 25,
                }
              })}
            >
              <Title sx={{ color: "white", paddingBottom: 5 }} order={4}>
                MakeUpByS
              </Title>
              <Link href={"/"}>
              <Text fz="sm" color={"white"} py={2}>
                About MakeUpByS
              </Text>
                </Link>
              <Link href={"/"}>
              <Text fz="sm" color={"white"} py={2}>
                Arbeta hos oss
              </Text>
                </Link>
              <Link href={"/integritet"}>
                <Text fz="sm" color={"white"} py={2}>
                  Integritetspolicy
                </Text>
              </Link>
              <Link href={"/"}>
              <Text fz="sm" color={"white"} py={2}>
                Hållbarhet
              </Text>
                </Link>
            </Box>


            <Box
              sx={(theme) => ({
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingRight: 30,
                [theme.fn.smallerThan(473)]: {
                  paddingLeft: 47,
                  paddingRight: 0,
                }
              })}
            >
              <Title sx={{ color: "white", paddingBottom: 5 }} order={4}>
                Kundservice
              </Title>
              <Link href={"/"}>
              <Text fz="sm" color={"white"} py={2}>
                Kundservice
              </Text>
                </Link>
              <Link href={"/kopvillkor"} style={{cursor: "pointer"}}>
              <Text fz="sm" color={"white"} py={2}>
                Köpvillkor
              </Text>
              </Link>
              <Link href={"/"}>
              <Text fz="sm" color={"white"} py={2}>
                Om cookies
              </Text>
                </Link>
            </Box>



            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                paddingRight: 35,
              }}
            >
              <Title sx={{ color: "white", paddingBottom: 5 }} order={4}>
                MakeUpByS Club
              </Title>
              <Link href={"/minsida"}>
              <Text fz="sm" color={"white"} py={2}>
                Bli medlem
              </Text>
              </Link>
              <Link href={"/"}>
              <Text fz="sm" color={"white"} py={2}>
                Medlemsvillkor
              </Text>
                </Link>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                contain: "content",
                paddingRight: 28,
              }}
            >
              <Title sx={{ color: "white", paddingBottom: 5 }} order={4}>
                Följ Oss
              </Title>
              <Flex>
                <Link href={"/"}>
                <Flex sx={{ width: 25, height: 25, cursor: "pointer" }}>
                  <Image src={"/uploads/instagram.svg"} />
                </Flex>
                </Link>
                <Link href={"/"}>
                <Flex sx={{ width: 25, height: 25, cursor: "pointer" }}>
                  <Image src={"/uploads/facebook.svg"} />
                </Flex>
                </Link>
                <Link href={"/"}>
                <Flex sx={{ width: 25, height: 25, cursor: "pointer" }}>
                  <Image src={"/uploads/youtube.svg"} />
                </Flex>
                </Link>
              </Flex>
            </Box>
            </Flex>

      </MantineFooter>
      <Flex
        sx={(theme) => ({
          backgroundColor: theme.colors.brand[3],
          alignContent: "center",
          justifyContent: "center",
        })}
      >
        <Divider color={"white"} />
        <MediaQuery smallerThan="xs" styles={{ fontSize: "10px" }}>
        <Text color={"dimmed"} >
          Copyright &copy; {new Date().getFullYear()} Angelica M.S, Jacob Hoggen
        </Text>
        </MediaQuery>
      </Flex>
    </>
  );
};

export default Footer;
