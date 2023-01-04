import {
  Title,
  Header as MantineHeader,
  Flex,
  Text,
  MediaQuery,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import IconsHeader from "./IconsHeader";
import LoginButton from "./LoginButton";
import MobileLoginButton from "./MobileLoginButtons";

// Temporary header.

const HeaderCheckout = () => {
  const router = useRouter();

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
          padding: "0px 0px 0px 10px",
        },
      })}
    >
      <Flex justify={"space-between"} align="center" sx={{ width: "100%" }}>
        <Flex
          w={180}
          onClick={() => router.back()}
          sx={(theme) => ({
            cursor: "pointer",
            [theme.fn.smallerThan("xs")]: {
              width: 102,
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
            size="xxx-large"
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
        <LoginButton />
        <MobileLoginButton />
      </Flex>
    </MantineHeader>
  );
};

export default HeaderCheckout;
