import { Box, Button, Flex, Select, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import * as Yup from "yup";
import { RestrictedUser } from "../../pages/api/open/users/[slug]";

interface FormValues {
  name: string;
  address: string;
  postalcode: string;
  city: string;
  country: string;
  phone: string;
  co: string;
}

const schema = Yup.object<ShapeOf<FormValues>>({
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

type Props = {
  deliveryInfo: RestrictedUser | undefined;
  setNewDeliveryInfo: Dispatch<SetStateAction<RestrictedUser | undefined>>;
  setChecked: Dispatch<SetStateAction<boolean>>;
};

const DeliveryForm: FC<Props> = ({
  deliveryInfo,
  setNewDeliveryInfo,
  setChecked,
}) => {
  const form = useForm<FormValues>({
    initialValues: {
      name: deliveryInfo?.name || "",
      address: deliveryInfo?.address.line1 || "",
      postalcode: deliveryInfo?.address.postal_code || "",
      city: deliveryInfo?.address.city || "",
      country: deliveryInfo?.address.country || "",
      phone: deliveryInfo?.phone || "",
      co: deliveryInfo?.address.line2 || "",
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: FormValues) => {
    console.log("Kommer jag in hör?");

    const updatedInfo: RestrictedUser = {
      email: deliveryInfo!.email,
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

    setNewDeliveryInfo(updatedInfo);
    setChecked(true);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex justify={"center"} direction="column">
        <Box mr={10}>
          <TextInput
            mt="xs"
            label="Namn*"
            placeholder="Anna Svensson"
            name="name"
            {...form.getInputProps("name")}
          />
        </Box>
        <Box>
          <TextInput
            mt="xs"
            label="Telefon*"
            placeholder="0767123456"
            name="phone"
            {...form.getInputProps("phone")}
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
        </Box>
      </Flex>

      <Button
        mt="lg"
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

export default DeliveryForm;
