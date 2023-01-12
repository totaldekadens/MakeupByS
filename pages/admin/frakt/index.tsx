import { AppShell, Button, Flex, Text, Title } from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import Options from "../../../components/admin/Options";
import HeaderCheckout from "../../../components/layout/HeaderCheckout";

const FreightHandler = () => {
  const list = [
    { name: "Beställningar", link: "/admin", active: false },
    { name: "Produkter", link: "/admin/produkter", active: false },
    { name: "Kategorier", link: "/admin/kategorier", active: false },
    { name: "Frakt", link: "/admin/frakt", active: true },
    { name: "Kunder", link: "/admin/kunder", active: false },
  ];
  return (
    <AppShell fixed={false} header={<HeaderCheckout />}>
      <Flex direction={"column"} align="center" style={{ marginTop: 60 }}>
        <Title order={1}>ADMIN</Title>
        <Options />
      </Flex>
    </AppShell>
  );
};

export default FreightHandler;
