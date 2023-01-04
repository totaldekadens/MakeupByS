import { Box, Button, Flex, Text } from "@mantine/core";
import { useSession, signIn, signOut } from "next-auth/react";
import { IconUser, IconShoppingBag } from "@tabler/icons";
import Link from "next/link";
import { createStyles } from "@mantine/core";

// Temporary component.
const IconsHeader = () => {
  const { classes } = useStyles();
  return (
    <Flex
      gap={"md"}
      justify="center"
      align="center"
      direction="row"
      mr={40}
      sx={(theme) => ({
        [theme.fn.smallerThan("sm")]: {
          marginRight: 10,
          gap: 5,
        },
      })}
    >
      <Link href="/mypage">
        <IconUser size={36} color="white" className={classes.icons} />
      </Link>
      <Link href="/">
        <IconShoppingBag size={36} color="white" className={classes.icons} />
      </Link>
    </Flex>
  );
};

const useStyles = createStyles((theme, _params, getRef) => ({
  icons: {
    [theme.fn.smallerThan("sm")]: {
      width: "28px",
      height: "28px",
    },
  },
}));

export default IconsHeader;
