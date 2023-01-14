import { Dispatch, FC, SetStateAction } from "react";
import { Modal, Text, Flex } from "@mantine/core";
import { IconCheck, IconInfoCircle, IconX } from "@tabler/icons";

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
      </Modal>
    </>
  );
};

export default ResponseModal;
