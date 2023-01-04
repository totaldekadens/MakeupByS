import {
  Box,
  Title,
  Header as MantineHeader,
  Flex,
  Paper,
  Space,
  Input,
  Text,
  MediaQuery,
} from "@mantine/core";
import { IconChevronLeft } from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import IconsHeader from "./IconsHeader";

// Temporary header.

const HeaderCheckout = () => {
  const router = useRouter();
  return (
    <MantineHeader
      fixed={false}
      height={100}
      sx={(theme) => ({
        backgroundColor: theme.colors.brand[2],
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        [theme.fn.smallerThan("sm")]: {
          height: 70,
        },
        [theme.fn.smallerThan("xs")]: {
          height: 60,
        },
      })}
    >
      <Flex justify={"space-between"} align="center" sx={{ width: "100%" }}>
        <Flex
          ml={40}
          sx={(theme) => ({
            cursor: "pointer",
            [theme.fn.smallerThan("sm")]: {
              marginLeft: 10,
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
              onClick={() => router.back()}
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
                fontSize: 26,
              },
            })}
          >
            MakeUpByS
          </Title>
        </Link>
        <IconsHeader />
      </Flex>
    </MantineHeader>
  );
};

export default HeaderCheckout;
