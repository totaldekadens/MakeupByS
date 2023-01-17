import { AppShell, Flex, Menu, Select, Title, Text } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import Options from "../../../../components/admin/Options";
import HeaderCheckout from "../../../../components/layout/HeaderCheckout";

const CreateProduct: NextPage = () => {
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("Skapa produkt");
  const list = [
    { label: "Överblick", value: "/admin/produkter" },
    { label: "Skapa produkt", value: "/admin/produkter/skapa" },
  ];
  return (
    <AppShell fixed={false} header={<HeaderCheckout />}>
      <Flex direction={"column"} align="center" style={{ marginTop: 60 }}>
        <Options />
        <Flex
          direction={"column"}
          mt={40}
          mb={40}
          justify={"center"}
          align="center"
          sx={{ width: "100%" }}
        >
          <Flex
            justify="flex-end"
            sx={(theme) => ({
              width: "640px",
              [theme.fn.smallerThan("sm")]: {
                width: "100%",
              },
            })}
          >
            <Flex gap={5} mt={20}>
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
                  <Flex align={"center"} sx={{ cursor: "pointer" }}>
                    <Text>{currentPage}</Text>
                    <IconChevronDown style={{ marginLeft: 13 }} size={14} />
                  </Flex>
                </Menu.Target>
                <Menu.Dropdown w={200}>
                  {list.map((button, index) => {
                    return (
                      <Menu.Item key={index} color="brand.7">
                        <Link key={index} href={button.value}>
                          {button.label}
                        </Link>
                      </Menu.Item>
                    );
                  })}
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
        <Title>HEJ!</Title>
      </Flex>
    </AppShell>
  );
};
export default CreateProduct;
