import { useState, useEffect, Dispatch, SetStateAction, FC } from "react";
import { Button, Image, FileInput, Flex, Title, Text } from "@mantine/core";
import { IconUpload } from "@tabler/icons";

type Props = {
  setImageList: Dispatch<SetStateAction<string[]>>;
  value: File[];
  setValue: Dispatch<SetStateAction<File[]>>;
};

const UploadForm: FC<Props> = ({ setImageList, value, setValue }) => {
  const [createObjectURL, setCreateObjectURL] = useState<string[]>([]);

  useEffect(() => {
    const uploadToClient = async () => {
      console.log(value);
      const hej = value.map((img) => URL.createObjectURL(img));
      //console.log(createObjectURL);
      console.log(hej);
      setCreateObjectURL(hej);
      const imageList = value.map((img) => img.name);
      setImageList(imageList);
    };
    uploadToClient();
  }, [value]);

  return (
    <div>
      <Title order={4}>Lägg till bilder:</Title>
      <FileInput
        icon={<IconUpload />}
        multiple
        value={value}
        onChange={setValue}
        accept="image/png, image/jpg, image/webp, image/jpeg"
      />
      <Flex
        direction={"row"}
        mt={10}
        sx={{ width: "100%", flexWrap: "wrap" }}
        justify="flex-end"
      >
        {createObjectURL.map((img, index) => {
          return (
            <Flex w={180}>
              <Image key={index} src={img} />
            </Flex>
          );
        })}
      </Flex>
    </div>
  );
};

export default UploadForm;
