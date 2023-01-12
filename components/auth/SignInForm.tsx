import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import * as Yup from "yup";

interface FormValues {
  email: string;
  password: string;
}

// Sets requirements of each input
const schema = Yup.object<ShapeOf<FormValues>>({
  email: Yup.string().required("Vänligen ange mailadress"),
  password: Yup.string().required("Vänligen och ange ett lösenord"),
});

const SignInForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const router = useRouter();
  const callbackUrl = router.query.callbackUrl;
  const form = useForm<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: FormValues) => {
    const res = await signIn("credentials", {
      inputValue: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: callbackUrl ? String(callbackUrl) : "/",
    });
    if (res?.error) {
      const errorMessage = "Mailadressen eller lösenordet stämmer inte";
      form.setFieldError("email", errorMessage);
      form.setFieldError("password", errorMessage);
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          w={240}
          mt="xs"
          label="email"
          styles={(theme) => ({
            label: {
              color: "black",
              [theme.fn.smallerThan(500)]: {
                color: theme.black,
              },
            },
          })}
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
          mt="xs"
          placeholder="********"
          label="Lösenord"
          name="password"
          {...form.getInputProps("password")}
        />
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
          Logga in
        </Button>
      </form>
    </>
  );
};

export default SignInForm;
