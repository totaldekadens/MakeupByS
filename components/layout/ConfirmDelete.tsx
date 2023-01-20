import { Dispatch, FC, SetStateAction } from "react";
import { Modal, Text, Flex, Button } from "@mantine/core";
import { IconExclamationMark } from "@tabler/icons";
import { useRouter } from "next/router";

type Props = {
  product: any;
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
  setOpenedProductModal?: Dispatch<SetStateAction<boolean>>;
};

const ConfirmDelete: FC<Props> = ({
  product,
  setOpened,
  opened,
  setIsUpdated,
  setOpenedProductModal,
}) => {
  const router = useRouter();

  const handleYes = async () => {
    // Delete query here
    const response = await fetch(`/api/admin/subproduct/${product._id}`, {
      method: "DELETE",
    });
    let result = await response.json();
    if (result.success) {
      setIsUpdated(true);
      setOpened(false);
      setOpenedProductModal ? setOpenedProductModal(false) : null;
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Flex>
            <IconExclamationMark color="red" />
            <Text ml={8}>{"Vill du radera " + product.title + "?"} </Text>
          </Flex>
        }
      >
        <Flex justify={"flex-end"} gap={10}>
          <Button
            color={"red"}
            sx={{ minWidth: 70 }}
            onClick={() => handleYes()}
          >
            Ja
          </Button>
          <Button sx={{ minWidth: 90 }} onClick={() => setOpened(false)}>
            Nej
          </Button>
        </Flex>
      </Modal>
    </>
  );
};

export default ConfirmDelete;
