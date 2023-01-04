import { Button, Flex, TextInput, Title, Text, Modal } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { FC, useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { RestrictedUser } from "../../pages/api/open/users/[slug]";
import { Checkbox } from "@mantine/core";
import DeliveryForm from "./DeliveryForm";
import DisplayAddress from "./DisplayAddress";
import { checkoutContext } from "../context/CheckoutProvider";

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
  const { checkout, setCheckout } = useContext(checkoutContext);

  useEffect(() => {
    const updateCheckoutInfo = () => {
      if (deliveryInfo) {
        const checkoutCopy = { ...checkout };
        checkoutCopy.address.invoice = deliveryInfo.address;
        checkoutCopy.name = deliveryInfo.name;
        checkoutCopy.email = deliveryInfo.email;
        checkoutCopy.phone = deliveryInfo.phone;
        if (newDeliveryInfo) {
          checkoutCopy.name = newDeliveryInfo.name;
          checkoutCopy.email = newDeliveryInfo.email;
          checkoutCopy.phone = newDeliveryInfo.phone;
          checkoutCopy.address.delivery = newDeliveryInfo.address;
        }
        setCheckout(checkoutCopy);
      }
    };
    updateCheckoutInfo();
  }, [deliveryInfo, newDeliveryInfo]);

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
      <Title order={2}>Dina uppgifter:</Title>
      {!deliveryInfo ? (
        <>
          <Flex mt={20} gap={20} direction="column" align={"center"}>
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
            newInfo={false}
          />
          <Title mt={20} order={3}>
            Leveransadress
          </Title>
          {newDeliveryInfo ? (
            <DisplayAddress
              deliveryInfo={newDeliveryInfo}
              setDeliveryInfo={setNewDeliveryInfo}
              newInfo={true}
              setChecked={setChecked}
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
        <Flex></Flex> // om address inte finns.
      )}
      {!checked ? (
        <Modal
          opened={!checked}
          onClose={() => setChecked(true)}
          title="Lägg till leveransadress"
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
