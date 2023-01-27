import { Flex, Button } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";


const ButtonSeason = () => {

  const router = useRouter();

  const list = [
    { name: "Vår", link: "/sasong/var", active: false },
    { name: "Sommar", link: "/sasong/sommar", active: false },
    { name: "Höst", link: "/sasong/host", active: false },
    { name: "Vinter", link: "/sasong/vinter", active: false },
  ];


  list.forEach((path) => {
    if (router.asPath.includes(path.link)) {
      path.active = true;
    } else {
      path.active = false;
    }
  });

  return (
    <Flex
      mt={20}
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
      {list.map((button, index) => {

        return (
          <Link key={index} href={button.link}>
            <Button
              sx={(theme) => ({
                backgroundColor: button.active ? "whitesmoke" : theme.colors.brand[9],
                color: button.active ? theme.colors.brand[3] : theme.colors.brand[0],
                borderColor: button.active ? theme.colors.brand[3] : theme.colors.brand[0],
                [theme.fn.smallerThan("sm")]: {
                  minWidth: "100px",
                  height: 28,
                },
              })}
              >
              {button.name}
            </Button>
          </Link>
        );
      })}
    </Flex>
  );
};

export default ButtonSeason;