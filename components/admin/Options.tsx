import { Button, Flex, MediaQuery, Menu } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Options = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("Beställningar");
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

  useEffect(() => {
    const getNumber = () => {
      list.forEach((path) => {
        if (router.pathname == path.link) {
          setCurrentPage(path.name);
        } else {
        }
      });
    };
    getNumber();
  }, [opened]);
  return (
    <>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Flex gap={5} mt={20}>
          {list.map((button, index) => {
            return (
              <Link key={index} href={button.link}>
                <Button
                  sx={{ minWidth: 100 }}
                  variant={button.active ? "filled" : "outline"}
                  color="brand.7"
                >
                  {button.name}
                </Button>
              </Link>
            );
          })}
        </Flex>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Flex gap={5} mt={20}>
          <Menu opened={opened} onChange={setOpened}>
            <Menu.Target>
              <Button>
                {currentPage}{" "}
                <IconChevronDown style={{ marginLeft: 13 }} size={14} />
              </Button>
            </Menu.Target>
            <Menu.Dropdown w={200}>
              {list.map((button, index) => {
                return (
                  <Menu.Item key={index} color="brand.7">
                    <Link key={index} href={button.link}>
                      {button.name}
                    </Link>
                  </Menu.Item>
                );
              })}
            </Menu.Dropdown>
          </Menu>
        </Flex>
      </MediaQuery>
    </>
  );
};

export default Options;
