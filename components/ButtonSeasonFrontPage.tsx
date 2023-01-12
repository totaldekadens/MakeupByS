import { Flex, Button } from "@mantine/core";
import Link from "next/link";

const ButtonSeason = () => {
  return (
    <Flex
      mih={100}
      gap="md"
      justify="center"
      align="center"
      direction={{ base: "row", sm: "row" }}
      sx={(theme) => ({
        [theme.fn.smallerThan("xs")]: {
          display: "none",
        },
      })}
    >
      <Link href={`/sasong/var`}>
        <Button
          sx={(theme) => ({
            backgroundColor: "transparent",
            borderColor: theme.colors.brand[0],
            color: theme.colors.brand[0],
            [theme.fn.smallerThan("sm")]: {
              minWidth: "100px",
            },
          })}
        >
          vår
        </Button>
      </Link>

      <Link href={`/sasong/sommar`}>
        <Button
          sx={(theme) => ({
            backgroundColor: "transparent",
            borderColor: theme.colors.brand[0],
            color: theme.colors.brand[0],
            [theme.fn.smallerThan("sm")]: {
              minWidth: "100px",
            },
          })}
        >
          sommar
        </Button>
      </Link>

      <Link href={`/sasong/host`}>
        <Button
          sx={(theme) => ({
            backgroundColor: "transparent",
            borderColor: theme.colors.brand[0],
            color: theme.colors.brand[0],
            [theme.fn.smallerThan("sm")]: {
              minWidth: "100px",
            },
          })}
        >
          höst
        </Button>
      </Link>

      <Link href={`/sasong/vinter`}>
        <Button
          sx={(theme) => ({
            backgroundColor: "transparent",
            borderColor: theme.colors.brand[0],
            color: theme.colors.brand[0],
            [theme.fn.smallerThan("sm")]: {
              minWidth: "100px",
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
