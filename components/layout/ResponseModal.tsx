import { Dispatch, FC, SetStateAction } from "react";
import { Modal, Text, Flex, Button } from "@mantine/core";
import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons";
import { useRouter } from "next/router";

type Props = {
  info: {
    title: string;
    reason: "info" | "error" | "success";
    description?: string;
  };
  opened: boolean;
  setOpened: Dispatch<SetStateAction<boolean>>;
};

const ResponseModal: FC<Props> = ({ info, setOpened, opened }) => {
  const router = useRouter();

  const handleClick = () => {
    setOpened(false);
    if (router.pathname.includes("bestallningar")) {
      window.location.reload();
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Flex>
            {info.reason == "success" ? (
              <IconCheck color="green" />
            ) : info.reason == "error" ? (
              <IconX color="red" />
            ) : (
              <IconInfoCircle />
            )}
            <Text ml={8}>{info.title}</Text>
          </Flex>
        }
      >
        <Text>{info.description}</Text>
        <Flex justify={"flex-end"}>
          <Button onClick={() => handleClick()}>OK</Button>
        </Flex>
      </Modal>
    </>
  );
};

export default ResponseModal;
