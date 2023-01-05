import { Radio, Title } from "@mantine/core";
import { FC, useContext, useEffect, useState } from "react";
import { CourrierDocument } from "../../models/Courrier";
import { checkoutContext } from "../context/checkoutProvider";
import ContainerWithBorder from "../layout/ContainerWithBorder";

const Courrier: FC = () => {
  const { checkout, setCheckout } = useContext(checkoutContext);
  const [courriers, setCourriers] = useState<CourrierDocument | []>([]);
  const [value, setValue] = useState("");
  const checkoutCopy = { ...checkout };

  // Hämta alla fraktsätt och sätt i ett state.
  useEffect(() => {
    const updateCheckoutInfo = async () => {
      let response = await fetch(`/api/open/courrier`);
      let result = await response.json();
      if (result.success) {
        setCourriers(result.data);
      }
    };
    updateCheckoutInfo();
  }, [checkout]);

  return (
    <>
      <Title order={2} mt={20}>
        Fraktsätt
      </Title>
      <ContainerWithBorder>
        <Radio.Group
          value={value}
          onChange={setValue}
          name="favoriteFramework"
          label="Select your favorite framework/library"
          description="This is anonymous"
          withAsterisk
        >
          <Radio value="react" label="React" />
          <Radio value="svelte" label="Svelte" />
          <Radio value="ng" label="Angular" />
          <Radio value="vue" label="Vue" />
        </Radio.Group>
      </ContainerWithBorder>
    </>
  );
};

export default Courrier;
