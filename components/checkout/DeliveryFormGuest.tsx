import {
  Box,
  Button,
  Flex,
  MediaQuery,
  Select,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import * as Yup from "yup";
import { RestrictedUser } from "../../pages/api/open/users/[slug]";

interface FormValues {
  name: string;
  email: string;
  address: string;
  postalcode: string;
  city: string;
  country: string;
  phone: string;
  co: string;
}

const schema = Yup.object<ShapeOf<FormValues>>({
  name: Yup.string().required("Vänligen fyll i fullständigt namn"),
  email: Yup.string().email().required("Vänligen fyll i mejladress"),
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

type Props = {
  setDeliveryInfo: Dispatch<SetStateAction<RestrictedUser | undefined>>;
  deliveryInfo: RestrictedUser | undefined;
  setisGuest: Dispatch<SetStateAction<boolean>>;
};

const DeliveryFormGuest: FC<Props> = ({
  setDeliveryInfo,
  deliveryInfo,
  setisGuest,
}) => {
  const form = useForm<FormValues>({
    initialValues: {
      name: "",
      email: "",
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
    const updatedInfo: RestrictedUser = {
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
    setDeliveryInfo(updatedInfo);
    setisGuest(false);
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <MediaQuery largerThan={"xs"} styles={{ display: "none" }}>
        <Flex justify={"center"} direction="column" sx={{ width: "90%" }}>
          <TextInput
            mt="xs"
            label="Namn*"
            placeholder="Anna Svensson"
            name="name"
            {...form.getInputProps("name")}
          />
          <TextInput
            mt="xs"
            label="Adress*"
            placeholder="Vasagatan 3"
            name="address"
            {...form.getInputProps("address")}
          />
          <TextInput
            mt="xs"
            label="CO"
            placeholder="CO"
            name="co"
            {...form.getInputProps("co")}
          />
          <TextInput
            mt="xs"
            label="Postkod*"
            placeholder="12345"
            name="postalcode"
            {...form.getInputProps("postalcode")}
          />
          <TextInput
            mt="xs"
            label="Stad*"
            placeholder="Göteborg"
            name="city"
            {...form.getInputProps("city")}
          />
          <Select
            mt="xs"
            label="Land*"
            placeholder="Sverige"
            name="country"
            data={[{ value: "Sverige", label: "Sverige" }]}
            {...form.getInputProps("country")}
          />
          <TextInput
            mt="xs"
            label="Email*"
            placeholder="email@email.com"
            name="email"
            {...form.getInputProps("email")}
          />
          <TextInput
            mt="xs"
            label="Telefon*"
            placeholder="0767123456"
            name="phone"
            {...form.getInputProps("phone")}
          />
        </Flex>
      </MediaQuery>
      <MediaQuery smallerThan={"xs"} styles={{ display: "none" }}>
        <Flex
          justify={"center"}
          align="center"
          direction="column"
          sx={(theme) => ({
            width: "550px",
            [theme.fn.smallerThan("sm")]: {
              width: "470px",
              padding: 20,
            },
          })}
        >
          <Flex
            justify={"space-between"}
            sx={{ width: "100%", flexWrap: "wrap" }}
          >
            <TextInput
              sx={{ width: "48%" }}
              mt="xs"
              label="Namn*"
              placeholder="Anna Svensson"
              name="name"
              {...form.getInputProps("name")}
            />
            <TextInput
              sx={{ width: "48%" }}
              mt="xs"
              label="Email*"
              placeholder="email@email.com"
              name="email"
              {...form.getInputProps("email")}
            />
            <TextInput
              sx={{ width: "48%" }}
              mt="xs"
              label="Adress*"
              placeholder="Vasagatan 3"
              name="address"
              {...form.getInputProps("address")}
            />
            <TextInput
              sx={{ width: "48%" }}
              mt="xs"
              label="CO"
              placeholder="CO"
              name="co"
              {...form.getInputProps("co")}
            />
            <TextInput
              sx={{ width: "48%" }}
              mt="xs"
              label="Postkod*"
              placeholder="12345"
              name="postalcode"
              {...form.getInputProps("postalcode")}
            />
            <TextInput
              sx={{ width: "48%" }}
              mt="xs"
              label="Stad*"
              placeholder="Göteborg"
              name="city"
              {...form.getInputProps("city")}
            />
            <TextInput
              sx={{ width: "48%" }}
              mt="xs"
              label="Telefon*"
              placeholder="0767123456"
              name="phone"
              {...form.getInputProps("phone")}
            />
            <Select
              sx={{ width: "48%" }}
              mt="xs"
              label="Land*"
              placeholder="Sverige"
              name="country"
              data={[{ value: "Sverige", label: "Sverige" }]}
              {...form.getInputProps("country")}
            />
          </Flex>
        </Flex>
      </MediaQuery>
      <Button
        mt="lg"
        w={200}
        fullWidth
        type="submit"
        sx={(theme) => ({
          backgroundColor: theme.colors.brand[8],
          "&:hover": {
            backgroundColor: theme.colors.brand[7],
            color: theme.white,
            border: "unset",
          },
        })}
      >
        Bekräfta uppgifter
      </Button>
    </form>
  );
};

export default DeliveryFormGuest;
