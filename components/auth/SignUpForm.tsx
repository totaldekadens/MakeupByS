import {
  Box,
  Button,
  Flex,
  Group,
  PasswordInput,
  TextInput,
  Text,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  address: string;
  postalcode: string;
  city: string;
  country: string;
  phone: string;
  co: string;
}

const schema = Yup.object<ShapeOf<FormValues>>({
  email: Yup.string()
    .required("Vänligen ange mailadress")
    .email("Mailadressen är ogiltig"),
  password: Yup.string()
    .required("Vänligen ange ett lösenord")
    .min(5, "Lösenordet måste innehålla minst 5 karaktärer"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Lösenorden stämmer inte överrens")
    .required("Vänligen ange lösenordet igen"),
  name: Yup.string().required("Vänligen fyll i fullständigt namn"),
  address: Yup.string().required("Vänligen fyll i address"),
  city: Yup.string().required("Vänligen fyll i stad"),
  country: Yup.string().required("Vänligen fyll i land"),
  postalcode: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Postkoden får bara innehålla siffror")
    .min(5, "Postkoden måste innehålla 5 siffror")
    .max(5, "Postkoden måste innehålla 5 siffror"),
  phone: Yup.string()
    .required("Vänligen fyll i fullständigt nummer med 10 siffror")
    .matches(/^[0-9]+$/, "Telefonnumret får bara innehålla siffror"),
  co: Yup.string(),
});

const SignUpForm = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      address: "",
      postalcode: "",
      city: "",
      country: "",
      phone: "",
      co: "",
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: FormValues) => {
    const createCustomerInStripe = {
      email: values.email,
      name: values.name,
      address: {
        line1: values.address,
        line2: values.co,
        postal_code: values.postalcode,
        city: values.city,
        country: values.country,
      },
      phone: values.phone,
    };

    const body = {
      createCustomerInStripe,
      email: values.email,
      password: values.password,
    };

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const response = await fetch("/api/open/users", request);
    let result = await response.json();

    if (response.status == 403) {
      form.setFieldError("email", "Emailadressen används redan");
      return;
    }

    if (result.success) {
      return await signIn("credentials", {
        inputValue: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: callbackUrl ? String(callbackUrl) : "/",
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex
        sx={(theme) => ({
          [theme.fn.smallerThan(500)]: {
            flexDirection: "column",
          },
        })}
      >
        <Box
          mr={10}
          sx={(theme) => ({
            [theme.fn.smallerThan(500)]: {
              marginRight: 0,
            },
          })}
        >
          <TextInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            label="Namn*"
            placeholder="Anna Svensson"
            name="name"
            {...form.getInputProps("name")}
          />
          <TextInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            label="Email*"
            placeholder="email@email.com"
            name="email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            label="Lösenord*"
            placeholder="********"
            name="password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            placeholder="********"
            label="Bekräfta lösenordet*"
            name="confirmPassword"
            {...form.getInputProps("confirmPassword")}
          />
          <TextInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            label="Telefon*"
            placeholder="0767123456"
            name="phone"
            {...form.getInputProps("phone")}
          />
        </Box>
        <Box>
          <TextInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            label="Adress*"
            placeholder="Vasagatan 3"
            name="address"
            {...form.getInputProps("address")}
          />
          <TextInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            label="CO"
            placeholder="CO"
            name="co"
            {...form.getInputProps("co")}
          />
          <TextInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            label="Postkod*"
            placeholder="12345"
            name="postalcode"
            {...form.getInputProps("postalcode")}
          />
          <TextInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            label="Stad*"
            placeholder="Göteborg"
            name="city"
            {...form.getInputProps("city")}
          />
          <TextInput
            styles={(theme) => ({
              label: {
                color: "black",
                [theme.fn.smallerThan(500)]: {
                  color: theme.black,
                },
              },
            })}
            label="Land*"
            placeholder="Sverige"
            name="country"
            {...form.getInputProps("country")}
          />
        </Box>
      </Flex>

      <Button
        mt="lg"
        fullWidth
        type="submit"
        sx={(theme) => ({
          backgroundColor: theme.colors.brand[7],
          "&:hover": {
            backgroundColor: theme.colors.brand[8],
            color: "white",
            border: "unset",
          },
        })}
      >
        Bli medlem
      </Button>
      <Flex mt={5} sx={{ width: "100%" }}>
        <Text
          w={340}
          size={9}
          color="black"
          sx={(theme) => ({
            flexWrap: "wrap",
            textAlign: "center",
            [theme.fn.smallerThan(500)]: {
              width: "90%",
              color: theme.black,
            },
            [theme.fn.smallerThan(400)]: {
              width: "95%",
            },
          })}
        >
          Genom att registrera ditt konto godkänner du MakeUpByS´s{" "}
          <Link href={"/kopvillkor"}>
            <b>villkor</b>
          </Link>{" "}
          för användning och köp. Samt bekräftar att du läst vår{" "}
          <Link href={"/integritet"}>
            <b>Integritetspolicy</b>
          </Link>
          .
        </Text>
      </Flex>
    </form>
  );
};

export default SignUpForm;
