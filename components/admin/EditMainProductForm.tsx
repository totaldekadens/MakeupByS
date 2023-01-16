import {
  Button,
  Flex,
  MediaQuery,
  Select,
  TextInput,
  Text,
  Textarea,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Decimal128, Types } from "mongoose";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import * as Yup from "yup";
import Category, { CategoryDocument } from "../../models/Category";
import { MainProductDocument } from "../../models/MainProduct";
import { PopulatedProduct } from "../../utils/types";
import { SelectType } from "./SelectStatus";

interface FormValues {
  brand: string;
  price: Decimal128;
  category: Types.ObjectId;
  weight: number;
  description1: string;
  description2?: string;
  ingredients: string;
}

const schema = Yup.object<ShapeOf<FormValues>>({
  brand: Yup.string().required("Vänligen fyll i märke"),
  price: Yup.number().required("Vänligen fyll i pris"),
  category: Yup.string().required("Vänligen fyll i kategori"),
  weight: Yup.number().required("Vänligen fyll i vikt på produkt"),
  description1: Yup.string().required("Vänligen fyll i beskrivning av produkt"),
  description2: Yup.string(),
  ingredients: Yup.string(),
});

type Props = {
  product: PopulatedProduct;
  setEditMainProduct: Dispatch<SetStateAction<boolean>>;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
};

const EditMainProductForm: FC<Props> = ({
  product,
  setEditMainProduct,
  setIsUpdated,
}) => {
  const [categories, setCategories] = useState<CategoryDocument[]>();

  useEffect(() => {
    const getCategories = async () => {
      const response = await fetch("/api/open/category");
      let result = await response.json();
      setCategories(result.data);
    };
    getCategories();
  }, [product]);

  const form = useForm<FormValues>({
    initialValues: {
      brand: product.mainProduct.brand || "",
      price: product.mainProduct.price.$numberDecimal || null,
      category: product.mainProduct.category._id,
      weight: product.mainProduct.weight || 0,
      description1: product.mainProduct.description1 || "",
      description2: product.mainProduct.description2 || "",
      ingredients: product.mainProduct.ingredients || "",
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: FormValues) => {
    const updatedInfo: MainProductDocument = {
      _id: product.mainProduct._id,
      partNo: product.mainProduct.partNo,
      brand: values.brand,
      price: values.price,
      category: values.category,
      weight: values.weight,
      description1: values.description1,
      description2: values.description2,
      ingredients: values.ingredients,
    };

    console.log(updatedInfo);
    // Uppdatera databasen här!

    const request = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedInfo),
    };
    const response = await fetch("/api/admin/mainproduct", request);
    let result = await response.json();
    console.log(result);
    if (result.success) {
      setIsUpdated(true);
      setEditMainProduct(false);
    }
  };

  const list: SelectType[] | null = categories
    ? categories.map((category) => ({
        label: category.title,
        value: category._id.toString(),
      }))
    : [];

  return (
    <>
      <Text color={"red"} size="sm">
        Observera! Ändringar på huvudartikeln påverkar samtliga tillhörande
        subartiklar
      </Text>
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
            placeholder={product.mainProduct.partNo}
            name="brand"
            disabled
          />
          <TextInput
            mt="xs"
            label="Märke*"
            placeholder="Märke"
            name="brand"
            {...form.getInputProps("brand")}
          />
          <TextInput
            mt="xs"
            label="Pris*"
            placeholder="Pris"
            name="price"
            {...form.getInputProps("price")}
          />
          <Select
            mt="xs"
            label="Kategori*"
            placeholder="Sverige"
            name="category"
            data={list}
            {...form.getInputProps("category")}
          />
          <TextInput
            mt="xs"
            label="Vikt*"
            placeholder="50"
            name="weight"
            {...form.getInputProps("weight")}
          />
          <Textarea
            mt="xs"
            autosize
            minRows={2}
            maxRows={6}
            label="Beskrivning 1*"
            placeholder="Beskrivning"
            name="description1"
            {...form.getInputProps("description1")}
          />
          <Textarea
            mt="xs"
            autosize
            minRows={2}
            maxRows={6}
            label="Beskrivning 2"
            placeholder="Beskrivning 2"
            name="description2"
            {...form.getInputProps("description2")}
          />
          <Textarea
            mt="xs"
            autosize
            minRows={2}
            maxRows={6}
            label="Ingredienser*"
            placeholder="Ingredienser"
            name="ingredients"
            {...form.getInputProps("ingredients")}
          />
        </Flex>

        <Flex mt={20} gap="md">
          <Button
            onClick={() => {
              setEditMainProduct(false);
            }}
            variant="outline"
          >
            Avbryt
          </Button>
          <Button
            //mt="lg"
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

export default EditMainProductForm;
