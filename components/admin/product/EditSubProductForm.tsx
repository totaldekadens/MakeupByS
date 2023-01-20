import {
  Button,
  Flex,
  MediaQuery,
  Select,
  TextInput,
  Text,
  Textarea,
  MultiSelect,
  Radio,
  Image,
  Box,
  NumberInput,
  Checkbox,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Decimal128, Types } from "mongoose";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import Category, { CategoryDocument } from "../../../models/Category";
import { ColorDocument } from "../../../models/Color";
import { ColorTagDocument } from "../../../models/ColorTag";
import { MainProductDocument } from "../../../models/MainProduct";
import { SubProductDocument } from "../../../models/SubProduct";
import { PopulatedProduct } from "../../../utils/types";
import UploadToImagesToServer from "../../../utils/useUploadImagesToServer";
import ResponseModal from "../../layout/ResponseModal";
import { ResponseModalType, SelectType } from "../SelectStatus";
import MultiSelectColor from "./MultiSelect";
import UploadForm from "./UploadForm";

export interface FormValues {
  availableQty: number;
  colors: any;
  images: any;
}

const schema = Yup.object<ShapeOf<FormValues>>({
  availableQty: Yup.number().required("Vänligen fyll i antal"),
  colors: Yup.array().required("Vänligen fyll i färg"),
  images: Yup.array().required("Vänligen fyll i bilder"),
});

type Props = {
  product: PopulatedProduct;
  setEditSubProduct: Dispatch<SetStateAction<boolean>>;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
};

const EditSubProductForm: FC<Props> = ({
  product,
  setEditSubProduct,
  setIsUpdated,
}) => {
  // States
  const [colors, setColors] = useState<SelectType[]>([]);
  const [colortags, setColorTags] = useState<SelectType[]>([]);

  const [multiSelectColors, setMultiSelectColors] = useState<string[]>([]);
  const [valueTag, setValueTag] = useState<string | null>(null);
  const [direction, setDirection] = useState("set");
  const [imageList, setImageList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);
  const [checked, setChecked] = useState(false);
  const [opened, setOpened] = useState(false);
  const [response, setResponse] = useState<ResponseModalType>({
    title: "",
    reason: "info",
  });
  // Gets colortags on load
  useEffect(() => {
    const getColorTags = async () => {
      const response = await fetch("/api/open/colortag");
      let result = await response.json();

      const list: SelectType[] = result.data.map((color: ColorTagDocument) => ({
        label: color.color,
        value: color._id.toString(),
      }));
      setColorTags(list);
    };
    getColorTags();
  }, [product]);

  // Gets all colors belonging to chosen color tag
  useEffect(() => {
    const getColors = async () => {
      const response = await fetch("/api/open/color");
      let result = await response.json();
      if (result.success) {
        let newList: any[] = [];
        result.data.forEach((color: any) => {
          color._id = color._id.toString();
          color.colorTag = color.colorTag ? color.colorTag.toString() : null;
          newList.push(color);
        });
        const filteredList = newList.filter(
          (color) => color.colorTag == valueTag
        );
        const list: any = filteredList.map((color: ColorDocument) => ({
          label: color.hexcolor,
          value: color._id,
        }));
        setColors(list);
      }
    };
    getColors();
  }, [valueTag]);

  const colorIds = product.colors.map((color) => color._id?.toString());
  const form = useForm<FormValues>({
    initialValues: {
      availableQty: product.availableQty || 0,
      colors: colorIds,
      images: product.images,
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  // Updates product with new info
  const handleSubmit = async (values: FormValues) => {
    if (direction == "remove" && product.availableQty < values.availableQty) {
      const object: ResponseModalType = {
        title: "Kan inte ta bort mer än vad som finns tillgängligt",
        reason: "error",
      };
      setResponse(object);
      setOpened(true);
      return;
    }

    const updatedInfo = {
      _id: product._id,
      title: product.title,
      slug: product.slug,
      mainProduct: product.mainProduct._id,
      partNo: product.partNo,
      availableQty:
        direction == "add"
          ? Number(product.availableQty) + Number(values.availableQty)
          : direction == "remove"
          ? Number(product.availableQty) - Number(values.availableQty)
          : Number(values.availableQty),
      images: imageList.length > 0 ? imageList : values.images,
      colors:
        multiSelectColors.length > 0
          ? (multiSelectColors as unknown as Types.ObjectId[])
          : (values.colors as unknown as Types.ObjectId[]),
    };

    if (checked) {
      await UploadToImagesToServer(fileList);
    }

    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    };
    const response = await fetch("/api/admin/subproduct", request);
    let result = await response.json();

    if (result.success) {
      const object: ResponseModalType = {
        title: "Produkten är uppdaterad!",
        reason: "success",
      };
      setResponse(object);
      setOpened(true);
      setIsUpdated(true);
      setEditSubProduct(false);
      return;
    }
    const object: ResponseModalType = {
      title: "Något gick fel!",
      reason: "error",
    };
    setResponse(object);
    setOpened(true);
  };

  return (
    <>
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Flex justify={"center"} direction="column" sx={{ width: "90%" }}>
          <TextInput
            mt="xs"
            label="Artikelnummer"
            placeholder={product.partNo}
            name="brand"
            disabled
          />
          <TextInput
            mt="xs"
            label="Titel"
            placeholder={product.title}
            name="brand"
            disabled
          />
          <Radio.Group
            mt={10}
            value={direction}
            onChange={setDirection}
            name={"Tillgängligt antal"}
            label="Antal"
            description={"Tillgängligt antal: " + product.availableQty}
          >
            <Radio value="set" label="Sätt" />
            <Radio value="add" label="Lägg till" />
            <Radio value="remove" label="Ta bort" />
          </Radio.Group>
          <NumberInput
            min={0}
            mt="xs"
            label=""
            placeholder={0}
            name="availableQty"
            {...form.getInputProps("availableQty")}
            w={100}
          />
          {checked ? null : (
            <>
              <TextInput
                disabled
                mt="xs"
                label="Nuvarande bilder"
                placeholder="Nuvarande bilder"
                name="images"
                {...form.getInputProps("images")}
              />
              <Flex mt={30} sx={{ width: "100%" }} h={150}>
                {product.images.map((image, index) => {
                  return (
                    <Flex
                      key={index}
                      direction={"column"}
                      align={"center"}
                      w={100}
                      h={100}
                    >
                      <Image alt={image} src={`/uploads/${image}`} />
                      <Text size={"xs"}>{image}</Text>
                    </Flex>
                  );
                })}
              </Flex>
            </>
          )}
          <Checkbox
            mt={40}
            label={"Lägg till nya bilder"}
            checked={checked}
            onChange={(event) => setChecked(event.currentTarget.checked)}
          />
          {checked ? (
            <UploadForm
              setImageList={setImageList}
              setValue={setFileList}
              value={fileList}
            />
          ) : null}

          <Select
            label="Färg*"
            data={colortags}
            value={valueTag}
            onChange={setValueTag}
          />
          <MultiSelectColor
            data={colors}
            value={multiSelectColors}
            setValue={setMultiSelectColors}
            form={form}
          />
        </Flex>

        <Flex mt={20} gap="md">
          <Button
            onClick={() => {
              setEditSubProduct(false);
            }}
            variant="outline"
          >
            Avbryt
          </Button>
          <Button
            w={200}
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
            Bekräfta ändringar
          </Button>
        </Flex>
      </form>
      <ResponseModal info={response} setOpened={setOpened} opened={opened} />
    </>
  );
};

export default EditSubProductForm;
