import { Button, Flex, TextInput, Title, Text, Modal } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { FC, useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { RestrictedUser } from "../../pages/api/open/users/[slug]";
import { Checkbox } from "@mantine/core";
import DeliveryForm from "./DeliveryForm";
import DisplayAddress from "./DisplayAddress";
import { useSession } from "next-auth/react";
import { checkoutContext } from "../context/checkoutProvider";
import DeliveryFormGuest from "./DeliveryFormGuest";
import { useScrollIntoView, useWindowScroll } from "@mantine/hooks";

interface FormValues {
  email: string;
}

// Reset values
const object = {
  name: "",
  email: "",
  phone: "",
  address: {
    line1: "",
    line2: "",
    postal_code: "",
    city: "",
    country: "",
  },
};

// Validation  of form
const schema = Yup.object<ShapeOf<FormValues>>({
  email: Yup.string()
    .email("Mailadressen har fel format")
    .required("Vänligen ange mailadress"),
});

const DeliveryInformation: FC = () => {
  // Context
  const { checkout, setCheckout } = useContext(checkoutContext);

  // States
  const [checked, setChecked] = useState(true);
  const [isGuest, setisGuest] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<
    RestrictedUser | undefined
  >();
  const [newDeliveryInfo, setNewDeliveryInfo] = useState<
    RestrictedUser | undefined
  >();

  // Session
  const session = useSession();

  // ScrollTo function
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>({
    offset: 10,
  });

  // If session exists set sessions address to state
  useEffect(() => {
    const updateCheckoutInfo = () => {
      if (session.data) {
        const sessionInfo = {
          name: session.data.user.name,
          email: session.data.user.email,
          address: session.data.user.address,
          phone: session.data.user.phone,
        };
        setDeliveryInfo(sessionInfo);
      }
    };
    updateCheckoutInfo();
  }, [session]);

  // If deliverInfo or newDeliveryInfo is updated checkout context gets updated as well
  useEffect(() => {
    const updateCheckoutInfo = () => {
      const checkoutCopy = { ...checkout };
      if (deliveryInfo) {
        checkoutCopy.address.invoice = deliveryInfo.address;
        checkoutCopy.name = deliveryInfo.name;
        checkoutCopy.email = deliveryInfo.email;
        checkoutCopy.phone = deliveryInfo.phone;
      }

      if (newDeliveryInfo) {
        checkoutCopy.name = newDeliveryInfo.name;
        checkoutCopy.email = newDeliveryInfo.email;
        checkoutCopy.phone = newDeliveryInfo.phone;
        checkoutCopy.address.delivery = newDeliveryInfo.address;
      } else {
        checkoutCopy.address.delivery = "";
      }

      setCheckout(checkoutCopy);

      if (!newDeliveryInfo && !deliveryInfo) {
        checkoutCopy.name = object.name;
        checkoutCopy.email = object.email;
        checkoutCopy.phone = object.phone;
        if (checkoutCopy.address.invoice) {
          checkoutCopy.address.invoice = object.address;
        }
        if (checkoutCopy.address.delivery) {
          checkoutCopy.address.delivery = object.address;
        }
        setCheckout(checkoutCopy);
        setNewDeliveryInfo(undefined);
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
        setisGuest(false);
        scrollIntoView({ alignment: "start" });
        return;
      }
      setDeliveryInfo(undefined);
      setisGuest(true);
      scrollIntoView({ alignment: "start" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Flex mt={40} direction={"column"} align="center" sx={{ width: "100%" }}>
      <Title order={2}>Dina uppgifter:</Title>
      {!deliveryInfo ? (
        <>
          <Flex
            ref={targetRef}
            mt={20}
            gap={20}
            direction="column"
            align={"center"}
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                width: "100%",
              },
            })}
          >
            <form
              style={{
                display: "flex",
                gap: 20,
                flexWrap: "wrap",
                justifyContent: "center",
                width: "100%",
              }}
              onSubmit={form.onSubmit(handleSubmit)}
            >
              <TextInput
                styles={(theme) => ({
                  input: {
                    backgroundColor: "white",
                    border: "1px solid " + theme.colors.gray[3],
                    width: 250,
                    [theme.fn.smallerThan("xs")]: {
                      width: "100%",
                    },
                  },
                  root: {
                    [theme.fn.smallerThan("xs")]: {
                      width: "90%",
                    },
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
              setNewDeliveryInfo={setNewDeliveryInfo}
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
      ) : null}

      {isGuest ? (
        <DeliveryFormGuest
          setDeliveryInfo={setDeliveryInfo}
          setisGuest={setisGuest}
        />
      ) : null}

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
