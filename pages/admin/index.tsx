import { AppShell, Title, Flex, Button } from "@mantine/core";
import { NextPage } from "next";
import HeaderCheckout from "../../components/layout/HeaderCheckout";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

const Admin: NextPage = ({}) => {
  const router = useRouter();
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
      <Head>
        <title>Admin - MakeUpByS</title>
        <meta property="og:title" content={`Admin - MakeUpByS`} />
      </Head>
      <AppShell fixed={false} header={<HeaderCheckout />}>
        <Flex direction={"column"} align="center" style={{ marginTop: 60 }}>
          <Title order={1}>ADMIN</Title>
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
