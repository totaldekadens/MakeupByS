import { Button, Flex, TextInput, Title, Text, Modal } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { FC, useState } from "react";
import * as Yup from "yup";
import { RestrictedUser } from "../pages/api/open/users/[slug]";
import { Checkbox } from "@mantine/core";
import DeliveryForm from "./deliveryForm";
import DisplayAddress from "./DisplayAddress";
interface FormValues {
  email: string;
}
const schema = Yup.object<ShapeOf<FormValues>>({
  email: Yup.string()
    .email("Mailadressen har fel format")
    .required("Vänligen ange mailadress"),
});

const DeliveryInformation: FC = () => {
  const [checked, setChecked] = useState(true);
  const [deliveryInfo, setDeliveryInfo] = useState<
    RestrictedUser | undefined
  >();
  const [newDeliveryInfo, setNewDeliveryInfo] = useState<
    RestrictedUser | undefined
  >();

  console.log(newDeliveryInfo);
  //console.log(DeliveryInfo);

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

      if (result.success) {
        setDeliveryInfo(result.data);
        return;
      }
      setDeliveryInfo(undefined);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex mt={40} direction={"column"} align="center" sx={{ width: "100%" }}>
      <Title mb={20} order={2}>
        Dina uppgifter:
      </Title>
      {!deliveryInfo ? (
        <>
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
        </>
      ) : null}
      {deliveryInfo ? (
        <>
          <DisplayAddress
            deliveryInfo={deliveryInfo}
            setDeliveryInfo={setDeliveryInfo}
          />
          <Title mt={20} order={3}>
            Leverans
          </Title>
          {newDeliveryInfo ? (
            <DisplayAddress
              deliveryInfo={newDeliveryInfo}
              setDeliveryInfo={setNewDeliveryInfo}
            />
          ) : (
            <Flex
              mt={20}
              p={20}
              direction="column"
              sx={(theme) => ({
                border: "1px solid" + theme.colors.gray[3],
                borderRadius: "10px",
                [theme.fn.smallerThan("sm")]: {},
              })}
            >
              <Checkbox
                styles={{
                  body: {
                    display: "flex",
                    align: "center",
                  },
                }}
                label="Samma adress som ovan"
                checked={checked}
                onChange={(event) => setChecked(event.currentTarget.checked)}
              />
            </Flex>
          )}
        </>
      ) : (
        <Flex>Address finns inte</Flex>
      )}

      {!checked ? (
        <Modal
          opened={!checked}
          onClose={() => setChecked(true)}
          title="Ändra dina leveransuppgifter"
        >
          <DeliveryForm
            deliveryInfo={deliveryInfo}
            setNewDeliveryInfo={setNewDeliveryInfo}
            setChecked={setChecked}
          />
        </Modal>
      ) : null}
    </Flex>
  );
};
export default DeliveryInformation;
