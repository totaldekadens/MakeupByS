import {
  Box,
  Button,
  Flex,
  Group,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const schema = Yup.object<ShapeOf<FormValues>>({
  email: Yup.string()
    .required("Vänligen ange mailadress")
    .email("Mailadressen är ogiltig"),
  password: Yup.string().required("Vänligen ange ett lösenord"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Lösenorden stämmer inte överrens")
    .required("Vänligen ange lösenordet igen"),
});

const SignUpForm = () => {
  const router = useRouter();
  const callbackUrl = router.query.callbackUrl;

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: FormValues) => {
    const body = {
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

    // Ändra till check av koder instället
    if (result.success) {
      return await signIn("credentials", {
        inputValue: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: callbackUrl ? String(callbackUrl) : "/",
      });
    }
    // Ändra till statuskod istället
    if (result.success == "Email taken") {
      form.setFieldError("email", "Emailadressen används redan");
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex>
        <Box mr={10}>
          <TextInput
            styles={{ label: { color: "white" } }}
            mt="xs"
            variant="filled"
            label="Namn"
            placeholder="Anna Svensson"
            name="name"
            {...form.getInputProps("name")}
          />
          <TextInput
            styles={{ label: { color: "white" } }}
            mt="xs"
            variant="filled"
            label="Email"
            placeholder="email@email.com"
            name="email"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            styles={{ label: { color: "white" } }}
            mt="xs"
            label="Lösenord"
            placeholder="********"
            name="password"
            {...form.getInputProps("password")}
          />
          <PasswordInput
            styles={{ label: { color: "white" } }}
            mt="xs"
            placeholder="********"
            label="Bekräfta lösenordet"
            name="confirmPassword"
            {...form.getInputProps("confirmPassword")}
          />
        </Box>
        <Box>
          <TextInput
            styles={{ label: { color: "white" } }}
            mt="xs"
            variant="filled"
            label="Adress"
            placeholder="Vasagatan 3"
            name="address"
            {...form.getInputProps("address")}
          />
          <TextInput
            styles={{ label: { color: "white" } }}
            mt="xs"
            variant="filled"
            label="Postkod"
            placeholder="12345"
            name="postalcode"
            {...form.getInputProps("postalcode")}
          />
          <TextInput
            styles={{ label: { color: "white" } }}
            mt="xs"
            variant="filled"
            label="Stad"
            placeholder="Göteborg"
            name="city"
            {...form.getInputProps("city")}
          />
          <TextInput
            styles={{ label: { color: "white" } }}
            mt="xs"
            variant="filled"
            label="Land"
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
          backgroundColor: theme.colors.gray[6],
          "&:hover": {
            backgroundColor: theme.colors.gray[4],
          },
        })}
      >
        Bli medlem
      </Button>
    </form>
  );
};

export default SignUpForm;
