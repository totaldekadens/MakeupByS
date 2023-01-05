import {
  AppShell,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Title,
} from "@mantine/core";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SignInForm from "../../components/auth/SignInForm";
import SignUpForm from "../../components/auth/SignUpForm";
import Cart from "../../components/cart/Cart";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const SignIn: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [toggleButtonText, setToggleButtonText] = useState<string>(
    "Registrera/Skapa konto"
  );

  // Redirect user back to the previous visited page when logged in
  useEffect(() => {
    if (session.data) {
      if (typeof router.query.callbackUrl === "string") {
        router.push(router.query.callbackUrl || "/");
      } else {
        router.push("/");
      }
    }
  }, [router, session.data]);

  if (session.data) return null;

  return (
    <>
      <AppShell
        padding={0}
        fixed={false}
        header={<Header />}
        footer={<Footer />}
      >
        <Flex
          justify="center"
          align="center"
          sx={(theme) => ({
            minHeight: "100vh",
            backgroundColor: theme.white,
            [theme.fn.smallerThan(600)]: {
              marginTop: 50,
            },
            [theme.fn.smallerThan(500)]: {
              alignItems: "flex-start",
              marginTop: 100,
              marginBottom: 100,
            },
          })}
        >
          <Box
            p={32}
            sx={(theme) => ({
              backgroundColor: theme.black,
              borderRadius: "8px",
              width: "430px",
              [theme.fn.smallerThan(500)]: {
                width: "90%",
                backgroundColor: theme.white,
              },
              [theme.fn.smallerThan(400)]: {
                width: "95%",
              },
            })}
          >
            {showSignUp ? (
              <Container
                sx={(theme) => ({
                  [theme.fn.smallerThan(500)]: {
                    width: "100%",
                  },
                })}
              >
                <Title
                  color="white"
                  order={3}
                  transform="uppercase"
                  sx={(theme) => ({
                    [theme.fn.smallerThan(500)]: {
                      color: theme.black,
                    },
                  })}
                >
                  Skapa konto
                </Title>
                <SignUpForm />
                <Button
                  mt="lg"
                  fullWidth
                  onClick={() => {
                    setShowSignUp(false);
                    setToggleButtonText("Registrera/Skapa konto");
                  }}
                  sx={(theme) => ({
                    backgroundColor: theme.black,
                    "&:hover": {
                      backgroundColor: theme.colors.grape[2],
                    },
                    [theme.fn.smallerThan(500)]: {
                      color: theme.black,
                      backgroundColor: theme.white,
                    },
                  })}
                >
                  {toggleButtonText}
                </Button>
              </Container>
            ) : (
              <Container
                sx={(theme) => ({
                  minWidth: 352,
                  [theme.fn.smallerThan(500)]: {
                    minWidth: "90%",
                  },
                  [theme.fn.smallerThan(400)]: {
                    minWidth: "95%",
                  },
                })}
              >
                <Title
                  color="white"
                  order={3}
                  transform="uppercase"
                  sx={(theme) => ({
                    [theme.fn.smallerThan(500)]: {
                      color: theme.black,
                    },
                  })}
                >
                  Logga in
                </Title>
                <SignInForm />
                <Button
                  mt="lg"
                  fullWidth
                  onClick={() => {
                    setShowSignUp(true);
                    setToggleButtonText("Gå tillbaka till inloggning");
                  }}
                  sx={(theme) => ({
                    backgroundColor: theme.black,
                    "&:hover": {
                      backgroundColor: theme.colors.red[4],
                    },
                    [theme.fn.smallerThan(500)]: {
                      color: theme.black,
                      backgroundColor: theme.white,
                    },
                  })}
                >
                  {toggleButtonText}
                </Button>
              </Container>
            )}
          </Box>
        </Flex>
        <Cart />
      </AppShell>
    </>
  );
};

export default SignIn;
