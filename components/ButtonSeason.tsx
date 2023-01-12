import { Flex, Button } from "@mantine/core";
import Link from "next/link";

const ButtonSeason = () => {
  return (
    <Flex
      //mih={100}
      mt={20}
      gap="md"
      justify="center"
      align="center"
      direction={{ base: "row", sm: "row" }}
      sx={(theme) => ({
        /*  [theme.fn.smallerThan("sm")]: {
          height: 60,
        }, */
        [theme.fn.smallerThan("xs")]: {
          display: "none",
        },
      })}
    >
      <Link href={`/sasong/var`}>
        <Button
          sx={(theme) => ({
            backgroundColor: theme.colors.brand[9],
            borderColor: theme.colors.brand[0],
            color: theme.colors.brand[0],
            [theme.fn.smallerThan("sm")]: {
              minWidth: "100px",
              height: 28,
            },
          })}
        >
          vår
        </Button>
      </Link>

      <Link href={`/sasong/sommar`}>
        <Button
          sx={(theme) => ({
            backgroundColor: theme.colors.brand[9],
            borderColor: theme.colors.brand[0],
            color: theme.colors.brand[0],
            [theme.fn.smallerThan("sm")]: {
              minWidth: "100px",
              height: 28,
            },
          })}
        >
          sommar
        </Button>
      </Link>

      <Link href={`/sasong/host`}>
        <Button
          sx={(theme) => ({
            backgroundColor: theme.colors.brand[9],
            borderColor: theme.colors.brand[0],
            color: theme.colors.brand[0],
            [theme.fn.smallerThan("sm")]: {
              minWidth: "100px",
              height: 28,
            },
          })}
        >
          höst
        </Button>
      </Link>

      <Link href={`/sasong/vinter`}>
        <Button
          sx={(theme) => ({
            backgroundColor: theme.colors.brand[9],
            borderColor: theme.colors.brand[0],
            color: theme.colors.brand[0],
            [theme.fn.smallerThan("sm")]: {
              minWidth: "100px",
              height: 28,
            },
          })}
        >
          vinter
        </Button>
      </Link>
    </Flex>
  );
};

export default ButtonSeason;
