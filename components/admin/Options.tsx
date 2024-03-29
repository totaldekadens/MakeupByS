import { Button, Flex, MediaQuery, Menu, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Options = () => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("Beställningar");
  const list = [
    {
      name: "Beställningar",
      link: "/admin/bestallningar",
      active: true,
      ref: "bestallningar",
      disabled: false,
    },
    {
      name: "Produkter",
      link: "/admin/produkter",
      active: false,
      ref: "produkter",
      disabled: false,
    },
    {
      name: "Kategorier",
      link: "/admin/kategorier",
      active: false,
      ref: "kategorier",
      disabled: true,
    },
    {
      name: "Frakt",
      link: "/admin/frakt",
      active: false,
      ref: "frakt",
      disabled: true,
    },
    {
      name: "Kunder",
      link: "/admin/kunder",
      active: false,
      ref: "kunder",
      disabled: true,
    },
  ];

  list.forEach((path) => {
    if (router.pathname.includes(path.ref)) {
      path.active = true;
    } else {
      path.active = false;
    }
  });

  useEffect(() => {
    const getPageName = () => {
      list.forEach((path) => {
        if (router.pathname.includes(path.ref)) {
          setCurrentPage(path.name);
        } else {
        }
      });
    };
    getPageName();
  }, [opened]);
  return (
    <>
      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Flex gap={5} mt={20}>
          {list.map((button, index) => {
            return (
              <Link
                key={index}
                href={button.disabled ? "#" : button.link}
                style={{ pointerEvents: button.disabled ? "none" : "unset" }}
              >
                <Button
                  disabled={button.disabled}
                  sx={(theme) => ({
                    minWidth: 100,
                    "&:hover": {
                      backgroundColor: button.active
                        ? theme.colors.brand[7]
                        : "white",
                      color: button.active
                        ? theme.colors.brand[0]
                        : theme.colors.brand[2],
                      borderColor: button.active
                        ? theme.colors.brand[7]
                        : theme.colors.brand[2],
                    },
                  })}
                  variant={button.active ? "filled" : "outline"}
                  color={button.active ? "brand.7" : "brand.2"}
                >
                  {button.name}
                </Button>
              </Link>
            );
          })}
        </Flex>
      </MediaQuery>
      <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        <Flex gap={5}>
          <Menu
            styles={(theme) => ({
              dropdown: { width: 300 },
              item: {
                width: 180,
                height: 50,
                "&:hover": { backgroundColor: theme.colors.brand[1] },
              },
            })}
            shadow="md"
            opened={opened}
            onChange={setOpened}
          >
            <Menu.Target>
              <Flex
                align={"center"}
                justify="center"
                sx={{ cursor: "pointer", width: 300 }}
              >
                <Text size={26}>{currentPage}</Text>
                <IconChevronDown style={{ marginLeft: 13 }} size={14} />
              </Flex>
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
