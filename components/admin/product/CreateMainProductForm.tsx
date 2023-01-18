import {
  Button,
  Flex,
  MediaQuery,
  Select,
  TextInput,
  Text,
  Textarea,
  NumberInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { Decimal128, Types } from "mongoose";
import { Dispatch, FC, SetStateAction, useState } from "react";
import * as Yup from "yup";
import { CategoryDocument } from "../../../models/Category";
import ResponseModal from "../../layout/ResponseModal";
import { ResponseModalType, SelectType } from "../SelectStatus";

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
  ingredients: Yup.string().required("Vänligen fyll i ingredienser"),
});

type Props = {
  categories: CategoryDocument[];
  setIsCreated: Dispatch<SetStateAction<boolean>>;
};

const CreateMainProductForm: FC<Props> = ({ categories, setIsCreated }) => {
  const [opened, setOpened] = useState(false);
  const [response, setResponse] = useState<ResponseModalType>({
    title: "",
    reason: "info",
  });
  const form = useForm<FormValues>({
    initialValues: {
      brand: "",
      price: "" as unknown as Decimal128,
      category: "" as unknown as Types.ObjectId,
      weight: 0,
      description1: "",
      description2: "",
      ingredients: "",
    },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  const handleSubmit = async (values: FormValues) => {
    const createProduct = {
      brand: values.brand,
      price: values.price,
      category: values.category,
      weight: values.weight,
      description1: values.description1,
      description2: values.description2,
      ingredients: values.ingredients,
    };

    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createProduct),
    };
    const response = await fetch("/api/admin/mainproduct", request);
    let result = await response.json();

    if (result.success) {
      setIsCreated(true);
      const object: ResponseModalType = {
        title: "Produkt skapad!",
        reason: "success",
      };
      setResponse(object);
      setOpened(true);
      window.location.reload();
      return;
    }
    const object: ResponseModalType = {
      title: "Något gick fel!",
      reason: "error",
    };
    setResponse(object);
    setOpened(true);
  };

  const list: SelectType[] | null = categories
    ? categories.map((category) => ({
        label: category.title,
        value: category._id.toString(),
      }))
    : [];

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
          <Select
            mt="xs"
            label="Kategori*"
            placeholder="Välj kategori"
            name="category"
            data={list}
            {...form.getInputProps("category")}
          />
          <TextInput
            mt="xs"
            label="Märke*"
            placeholder="Märke"
            name="brand"
            {...form.getInputProps("brand")}
          />
          <NumberInput
            min={0}
            mt="xs"
            label="Pris*"
            placeholder="Pris"
            name="price"
            {...form.getInputProps("price")}
          />

          <NumberInput
            min={0}
            mt="xs"
            label="Vikt (gram)*"
            placeholder="Fyll i vikt"
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

        <Flex mt={40} gap="md" sx={{ width: "100%" }} justify="flex-end">
          <Button
            onClick={() => {
              form.reset();
            }}
            variant="outline"
          >
            Rensa
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
            Skapa huvudprodukt
          </Button>
        </Flex>
      </form>
      <ResponseModal info={response} setOpened={setOpened} opened={opened} />
    </>
  );
};

export default CreateMainProductForm;
