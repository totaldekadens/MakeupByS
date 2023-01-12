import { Button, Flex } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";

const Options = () => {
  const router = useRouter();

  const list = [
    { name: "Beställningar", link: "/admin", active: true },
    { name: "Produkter", link: "/admin/produkter", active: false },
    { name: "Kategorier", link: "/admin/kategorier", active: false },
    { name: "Frakt", link: "/admin/frakt", active: false },
    { name: "Kunder", link: "/admin/kunder", active: false },
  ];

  list.forEach((path) => {
    if (router.pathname == path.link) {
      path.active = true;
    } else {
      path.active = false;
    }
  });
  return (
    <Flex gap={5} mt={20}>
      {list.map((button, index) => {
        return (
          <Link key={index} href={button.link}>
            <Button
              //size="xs"
              w={100}
              variant={button.active ? "filled" : "outline"}
              color="brand.7"
            >
              {button.name}
            </Button>
          </Link>
        );
      })}
    </Flex>
  );
};

export default Options;
