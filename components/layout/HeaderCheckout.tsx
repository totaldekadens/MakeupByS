import {
  Title,
  Header as MantineHeader,
  Flex,
  Text,
  MediaQuery,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { checkoutContext } from "../context/checkoutProvider";
import IconsCheckout from "../IconsCheckout";

const HeaderCheckout = () => {
  // Context
  const { checkout, setCheckout } = useContext(checkoutContext);

  // Router
  const router = useRouter();

  // Resets courrier when leaving page
  const handleClick = () => {
    const checkoutCopy = { ...checkout };
    checkoutCopy.courrier = "";
    setCheckout(checkoutCopy);
    router.back();
  };
  return (
    <MantineHeader
      fixed={false}
      height={100}
      px={40}
      sx={(theme) => ({
        backgroundColor: theme.colors.brand[2],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.fn.smallerThan("sm")]: {
          height: 75,
          padding: "0px 20px 0px 20px",
        },
        [theme.fn.smallerThan("xs")]: {
          height: 60,
        },
      })}
    >
      <Flex justify={"space-between"} align="center" sx={{ width: "100%" }}>
        <Flex
          w={100}
          onClick={() => handleClick()}
          sx={(theme) => ({
            cursor: "pointer",
            [theme.fn.smallerThan("xs")]: {
              width: 70,
            },
          })}
        >
          <IconChevronLeft color="white" />
          <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
            <Text
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  fontSize: 14,
                },
              })}
              color={"white"}
              align="center"
            >
              Tillbaka
            </Text>
          </MediaQuery>
        </Flex>
        <Link href="/">
          <Title
            size={48}
            color="white"
            sx={(theme) => ({
              [theme.fn.smallerThan("sm")]: {
                fontSize: theme.fontSizes.xl,
              },
              [theme.fn.smallerThan("xs")]: {
                fontSize: 24,
              },
            })}
          >
            MakeUpByS
          </Title>
        </Link>
        <IconsCheckout />
      </Flex>
    </MantineHeader>
  );
};

export default HeaderCheckout;
