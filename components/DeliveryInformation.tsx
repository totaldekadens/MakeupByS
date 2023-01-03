import { Button, Flex, TextInput, Title, Text } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { FC, useState } from "react";
import * as Yup from "yup";
import { RestrictedUser } from "../pages/api/open/users/[slug]";

interface FormValues {
  email: string;
}
const schema = Yup.object<ShapeOf<FormValues>>({
  email: Yup.string()
    .email("Mailadressen har fel format")
    .required("Vänligen ange mailadress"),
});

const DeliveryInformation: FC = () => {
  const [deliveryInfo, setDeliveryInfo] = useState<
    RestrictedUser | undefined
  >();

  const form = useForm<FormValues>({
    initialValues: {
      email: "",
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      let response = await fetch(`/api/open/users/${values.email}`);
      let result = await response.json();
      console.log(result);
      if (result.success) {
        setDeliveryInfo(result.data);
        return;
      }
      setDeliveryInfo(undefined);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(deliveryInfo);
  return (
    <Flex mt={40} direction={"column"} align="center" sx={{ width: "100%" }}>
      <Title mb={20} order={2}>
        Dina uppgifter:{" "}
      </Title>{" "}
      <Flex gap={20} direction="column" align={"center"}>
        <form
          style={{ display: "flex", gap: 20 }}
          onSubmit={form.onSubmit(handleSubmit)}
        >
          <TextInput
            styles={(theme) => ({
              input: {
                backgroundColor: "white",
                border: "1px solid " + theme.colors.gray[3],
                width: 250,
              },
            })}
            bg={"white"}
            placeholder="Mejladress"
            name="email"
            variant="filled"
            type="email"
            {...form.getInputProps("email")}
          />
          <Button type="submit">Fortsätt</Button>
        </form>
      </Flex>
      {deliveryInfo ? (
        <Flex
          mt={20}
          direction={"column"}
          align="center"
          sx={{ width: "100%" }}
        >
          <Title order={3}>Leveransadress</Title>
          <Flex
            mt={20}
            p={30}
            direction="column"
            sx={(theme) => ({
              border: "1px solid" + theme.colors.gray[3],
              borderRadius: "10px",
              [theme.fn.smallerThan("sm")]: {},
            })}
          >
            <Text weight={"bold"}>{deliveryInfo.name}</Text>
            <Flex gap={3}>
              <Text>{deliveryInfo.address.line1}</Text>
              <Text>{deliveryInfo.address.line2},</Text>
              <Text>{deliveryInfo.address.postal_code},</Text>
              <Text>{deliveryInfo.address.city}</Text>
            </Flex>
            <Flex gap={3}>
              <Text>{deliveryInfo.email},</Text>
              <Text>{deliveryInfo.phone}</Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex>Address finns inte</Flex>
      )}
    </Flex>
  );
};
export default DeliveryInformation;
