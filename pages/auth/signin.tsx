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
import MarginTopContainer from "../../components/layout/MarginTopContainer";

const SignIn: NextPage = () => {
  const session = useSession();
  const router = useRouter();
  const [showSignUp, setShowSignUp] = useState<boolean>(false);
  const [toggleButtonText, setToggleButtonText] =
    useState<string>("Skapa konto här...");

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
        <MarginTopContainer>
          <Flex
            justify="center"
            mt={20}
            sx={(theme) => ({
              minHeight: "100vh",
            })}
          >
            <Box
              p={32}
              sx={(theme) => ({
                height: "auto",
                borderRadius: "8px",
                width: "430px",
                [theme.fn.smallerThan(500)]: {
                  width: "100%",
                  paddingTop: 20,
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
                    color="black"
                    order={2}
                    align="center"
                    transform="uppercase"
                    mb={20}
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
                      setToggleButtonText("Skapa konto här...");
                    }}
                    styles={{
                      label: {
                        fontSize: 12,
                        fontWeight: "lighter",
                      },
                    }}
                    sx={(theme) => ({
                      backgroundColor: theme.white,
                      color: "black",
                      "&:hover": {
                        backgroundColor: "unset",
                        color: theme.colors.brand[8],
                        border: "1px solid " + theme.colors.brand[8],
                      },
                    })}
                  >
                    {toggleButtonText}
                  </Button>
                </Container>
              ) : (
                <Container
                  sx={(theme) => ({
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    minWidth: 352,
                    [theme.fn.smallerThan(500)]: {
                      width: "100%",
                    },
                    [theme.fn.smallerThan(400)]: {
                      width: "100%",
                    },
                  })}
                >
                  <Title
                    color="black"
                    order={2}
                    transform="uppercase"
                    mb={20}
                    sx={(theme) => ({
                      [theme.fn.smallerThan(500)]: {
                        color: theme.black,
                        marginBottom: 0,
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
                    styles={{
                      label: {
                        fontSize: 12,
                        fontWeight: "lighter",
                      },
                    }}
                    sx={(theme) => ({
                      backgroundColor: theme.white,
                      color: "black",
                      "&:hover": {
                        backgroundColor: "unset",
                        color: theme.colors.brand[8],
                        border: "1px solid " + theme.colors.brand[8],
                      },
                    })}
                  >
                    {toggleButtonText}
                  </Button>
                </Container>
              )}
            </Box>
          </Flex>
        </MarginTopContainer>
        <Cart />
      </AppShell>
    </>
  );
};

export default SignIn;
