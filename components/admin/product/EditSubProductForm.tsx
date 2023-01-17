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
import { SelectType } from "../SelectStatus";
import MultiSelectColor from "./MultiSelect";

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
  const [value, setValue] = useState<string[]>([]);
  const [valueTag, setValueTag] = useState<string | null>(null);
  const [direction, setDirection] = useState("set");
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
      // #136 Fix modal!
      alert("Kan inte ta bort mer än vad som finns");
      return;
    }

    const updatedInfo: SubProductDocument = {
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
      images: values.images,
      colors:
        value.length > 0
          ? (value as unknown as Types.ObjectId[])
          : (values.colors as unknown as Types.ObjectId[]),
    };

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
      // #136 Modal success!
      setIsUpdated(true);
      setEditSubProduct(false);
      return;
    }
    // #136 Modal error!
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
          <TextInput
            mt="xs"
            label=""
            placeholder={0}
            name="availableQty"
            {...form.getInputProps("availableQty")}
            w={100}
          />
          <TextInput
            mt="xs"
            label="Bild*"
            placeholder="Bilder"
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
                  <Image src={`/uploads/${image}`} />
                  <Text size={"xs"}>{image}</Text>
                </Flex>
              );
            })}
          </Flex>
          <Select
            label="Färg*"
            data={colortags}
            value={valueTag}
            onChange={setValueTag}
          />
          <MultiSelectColor
            data={colors}
            value={value}
            setValue={setValue}
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
    </>
  );
};

export default EditSubProductForm;
