import {
  Box,
  CloseButton,
  Group,
  MultiSelect,
  MultiSelectValueProps,
  Text,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Dispatch, FC, forwardRef, SetStateAction } from "react";
import { SelectType } from "../SelectStatus";
import { FormValues } from "./CreateSubProductForm";
type Props = {
  data: SelectType[];
  value: string[];
  setValue: Dispatch<SetStateAction<string[]>>;
  form: UseFormReturnType<FormValues, (values: FormValues) => FormValues>;
};

function Value({
  value,
  label,
  onRemove,
  classNames,
  ...others
}: MultiSelectValueProps & { value: string }) {
  return (
    <div {...others}>
      <Box
        sx={(theme) => ({
          display: "flex",
          cursor: "default",
          alignItems: "center",
          backgroundColor: label,
          paddingLeft: 10,
          borderRadius: 4,
        })}
      >
        <Box sx={{ lineHeight: 1, fontSize: 12 }}>{label}</Box>
        <CloseButton
          onMouseDown={onRemove}
          variant="transparent"
          size={22}
          iconSize={14}
          tabIndex={-1}
        />
      </Box>
    </div>
  );
}

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap bg={label} h={20}>
        <Text>{label}</Text>
      </Group>
    </div>
  )
);

const MultiSelectColor: FC<Props> = ({ data, value, setValue, form }) => {
  return (
    <MultiSelect
      searchable
      mt="xs"
      valueComponent={Value}
      itemComponent={SelectItem}
      label="Färgnyans*"
      placeholder="Färgnyans"
      name="colors"
      data={data}
      {...form.getInputProps("colors")}
      value={value}
      onChange={setValue}
    />
  );
};
export default MultiSelectColor;
