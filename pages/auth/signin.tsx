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
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoginButton from "../../components/LoginButton";

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
      <AppShell fixed={false} header={<Header />} footer={<Footer />}>
        {/* <Box> */}
        <main style={{ marginTop: 60, minHeight: "100vh" }}>
          <Center
            mt={100}
            sx={(theme) => ({
              backgroundColor: theme.white,
              [theme.fn.smallerThan(400)]: {
                backgroundColor: theme.colors.gray[7],
              },
            })}
          >
            <Container
              sx={(theme) => ({
                backgroundColor: theme.black,
                borderRadius: "0.5em",
                padding: "2em",
              })}
            >
              {showSignUp ? (
                <Container
                  sx={(theme) => ({
                    width: "22rem",
                    [theme.fn.smallerThan(400)]: {
                      width: 245,
                    },
                  })}
                >
                  <Title color="white" order={3} transform="uppercase">
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
                      backgroundColor: theme.colors.blue[4],
                      "&:hover": {
                        backgroundColor: theme.colors.grape[2],
                      },
                    })}
                  >
                    {toggleButtonText}
                  </Button>
                </Container>
              ) : (
                <Container
                  sx={(theme) => ({
                    minWidth: "22rem",
                    [theme.fn.smallerThan(400)]: {
                      minWidth: 245,
                    },
                  })}
                >
                  <Title color="white" order={3} transform="uppercase">
                    Logga in
                  </Title>
                  <SignInForm />
                  <Button
                    data-cy="toggle-signup"
                    mt="lg"
                    fullWidth
                    onClick={() => {
                      setShowSignUp(true);
                      setToggleButtonText("Gå tillbaka till inloggning");
                    }}
                    sx={(theme) => ({
                      backgroundColor: theme.colors.gray[5],
                      "&:hover": {
                        backgroundColor: theme.colors.red[4],
                      },
                    })}
                  >
                    {toggleButtonText}
                  </Button>
                </Container>
              )}
            </Container>
          </Center>
        </main>
        {/* </Box> */}
      </AppShell>
    </>
  );
};

export default SignIn;
