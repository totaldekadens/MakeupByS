import {
  AppShell,
  Title,
  Flex,
  Accordion,
  Text,
  Select,
  Pagination,
  MediaQuery,
  Button,
  Menu,
} from "@mantine/core";
import { GetServerSideProps, GetStaticProps, NextPage } from "next";
import HeaderCheckout from "../../components/layout/HeaderCheckout";
import { useEffect, useRef, useState } from "react";
import dbConnect from "../../utils/dbConnect";
import Options from "../../components/admin/Options";
import OrderSummary from "../../components/OrderSummary";
import Order from "../../models/Order";
import OrderStatus, { OrderStatusDocument } from "../../models/OrderStatus";
import User from "../../models/User";
import { PopulatedOrder } from "../../utils/types";
import { SelectType } from "../../components/admin/SelectStatus";
import Link from "next/link";
import { IconChevronDown } from "@tabler/icons";
import { useRouter } from "next/router";

const Admin: NextPage = ({}) => {
  const router = useRouter();
  const [opened, setOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState<string>("Beställningar");
  const list = [
    {
      name: "Beställningar",
      link: "/admin/bestallningar",
      ref: "bestallningar",
      disabled: false,
    },
    {
      name: "Produkter",
      link: "/admin/produkter",
      ref: "produkter",
      disabled: false,
    },
    {
      name: "Kategorier",
      link: "/admin/kategorier",
      ref: "kategorier",
      disabled: true,
    },
    { name: "Frakt", link: "/admin/frakt", ref: "frakt", disabled: true },
    { name: "Kunder", link: "/admin/kunder", ref: "kunder", disabled: true },
  ];

  return (
    <>
      <AppShell fixed={false} header={<HeaderCheckout />}>
        <Flex direction={"column"} align="center" style={{ marginTop: 60 }}>
          <Title order={1}>ADMIN</Title>
          {/*  <MediaQuery smallerThan="sm" styles={{ display: "none" }}> */}
          <Flex
            gap={10}
            mt={20}
            sx={(theme) => ({
              width: "100%",
              flexWrap: "wrap",
              [theme.fn.smallerThan("xs")]: {
                flexDirection: "column",
              },
            })}
            justify="center"
          >
            {list.map((button, index) => {
              return (
                <Link
                  style={{ pointerEvents: button.disabled ? "none" : "unset" }}
                  key={index}
                  href={button.disabled ? "#" : button.link}
                >
                  <Button
                    disabled={button.disabled}
                    sx={(theme) => ({
                      fontSize: 18,
                      minWidth: 200,
                      width: 200,
                      height: 150,
                      "&:hover": {
                        backgroundColor: theme.colors.brand[7],
                        color: "white",
                        borderColor: theme.colors.brand[7],
                      },
                      [theme.fn.smallerThan("xs")]: {
                        width: "100%",
                        minWidth: "100%",
                        height: "12vh",
                      },
                    })}
                    variant={"outline"}
                    color={"brand.2"}
                  >
                    {button.name}
                  </Button>
                </Link>
              );
            })}
          </Flex>
        </Flex>
      </AppShell>
    </>
  );
};

export default Admin;
