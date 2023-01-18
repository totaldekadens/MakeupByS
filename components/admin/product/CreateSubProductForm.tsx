import {
  Button,
  Flex,
  Select,
  TextInput,
  Text,
  Box,
  NumberInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Types } from "mongoose";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import { ColorDocument } from "../../../models/Color";
import { ColorTagDocument } from "../../../models/ColorTag";
import { PopulatedMainProduct, PopulatedProduct } from "../../../utils/types";
import { SelectType } from "../SelectStatus";
import MultiSelectColor from "./MultiSelectColor";
import UploadForm from "./UploadForm";

export interface FormValues {
  availableQty: number;
  colors: string[] | Types.ObjectId[];
  title: string;
}

const schema = Yup.object<ShapeOf<FormValues>>({
  availableQty: Yup.number().required("Vänligen fyll i antal"),
  colors: Yup.array().required("Vänligen fyll i färg"),
  title: Yup.string().required("Vänligen fyll i titel"),
});

type Props = {
  setIsCreated: Dispatch<SetStateAction<boolean>>;
  mainProducts: PopulatedMainProduct[];
};

const CreateSubProductForm: FC<Props> = ({ setIsCreated, mainProducts }) => {
  // States
  const [colors, setColors] = useState<SelectType[]>([]);
  const [colortags, setColorTags] = useState<SelectType[]>([]);
  const [multiSelectColors, setMultiSelectColors] = useState<string[]>([]);
  const [valueTag, setValueTag] = useState<string | null>(null);
  const [currentMainProduct, setCurrentMainProduct] = useState<string | null>(
    null
  );
  const [imageList, setImageList] = useState<string[]>([]);
  const [fileList, setFileList] = useState<File[]>([]);

  console.log(imageList);
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
  }, []);

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

  const mainProductSelect = mainProducts
    ? mainProducts.map((product) => ({
        label:
          product.partNo +
          " - " +
          product.category.title +
          " - " +
          product.brand,
        value: product._id.toString(),
      }))
    : [];

  // const colorIds = product.colors.map((color) => color._id?.toString());
  const form = useForm<FormValues>({
    initialValues: {
      availableQty: 0,
      colors: [],
      //images: [],
      title: "",
      //mainProduct: "",
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  // Updates product with new info
  const handleSubmit = async (values: FormValues) => {
    console.log("kommer jag in?");
    const createProduct: any = {
      title: values.title,
      mainProduct: currentMainProduct,
      availableQty: Number(values.availableQty),
      images: imageList,
      colors: multiSelectColors,
    };

    const body = new FormData();

    for (let i = 0; i < fileList.length; i++) {
      let img = fileList[i];
      body.append("file", img);
      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body,
      });
      let result = await response.json();
      console.log(result);
    }

    console.log(createProduct);
  };

  return (
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
        <Flex
          gap={10}
          sx={(theme) => ({
            [theme.fn.smallerThan("sm")]: {
              flexDirection: "column",
            },
          })}
        >
          <Select
            searchable
            w={270}
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                width: "100%",
              },
            })}
            value={currentMainProduct}
            onChange={setCurrentMainProduct}
            placeholder="Välj huvudartikel"
            label="Huvudartikel"
            data={mainProductSelect}
            name="mainProduct"
          />
          <Flex
            direction={"column"}
            sx={(theme) => ({
              width: 400,
              [theme.fn.smallerThan("xs")]: {
                width: "90%",
              },
            })}
          >
            {currentMainProduct
              ? mainProducts.map((product, index) => {
                  const id = product._id.toString();
                  if (id == currentMainProduct) {
                    return (
                      <Box key={index}>
                        <Flex key={index} direction={"column"}>
                          <Text weight={"bold"} size={"xs"}>
                            Pris:
                          </Text>
                          <Text size={"xs"}>
                            {Number(product.price.$numberDecimal) + " KR"}
                          </Text>
                        </Flex>
                        <Flex direction={"column"}>
                          <Text weight={"bold"} size={"xs"}>
                            Vikt:
                          </Text>
                          <Text size={"xs"}>{product.weight}</Text>
                        </Flex>
                        <Flex direction={"column"}>
                          <Text weight={"bold"} size={"xs"}>
                            Beskrivning 1:
                          </Text>
                          <Text size={"xs"}>{product.description1}</Text>
                        </Flex>
                        <Flex direction={"column"}>
                          <Text weight={"bold"} size={"xs"}>
                            Beskrivning 2:
                          </Text>
                          <Text size={"xs"}>{product.description2}</Text>
                        </Flex>
                      </Box>
                    );
                  }
                })
              : null}
          </Flex>
        </Flex>
        <TextInput
          mt="xs"
          label="Titel"
          placeholder={"Produktens namn"}
          name="title"
          {...form.getInputProps("title")}
        />
        <NumberInput
          min={0}
          mt="xs"
          label="Antal"
          placeholder={0}
          name="availableQty"
          {...form.getInputProps("availableQty")}
          w={100}
        />
        <UploadForm
          setImageList={setImageList}
          value={fileList}
          setValue={setFileList}
        />
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
        <Flex mt={20} gap="md">
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
            Skapa produkt
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default CreateSubProductForm;
