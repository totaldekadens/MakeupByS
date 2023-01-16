import { Flex, Image, Title, Text, Group } from "@mantine/core";
import { FC } from "react";
import { PopulatedProduct } from "../../utils/types";
type Props = {
  product: PopulatedProduct;
};

const OverviewProduct: FC<Props> = ({ product }) => {
  return (
    <tr key={product.title}>
      <td style={{ height: "50px" }}>
        <Flex gap={10}>
          <Image
            src={`/uploads/${product.images[0]}`}
            width={40}
            alt={product.title}
            fit="contain"
          />
          <Flex direction={"column"}>
            <Text
              size={12}
              color="dimmed"
              sx={(theme) => ({
                [theme.fn.smallerThan("sm")]: {
                  fontSize: theme.fontSizes.sm,
                },
                [theme.fn.smallerThan("xs")]: {
                  fontSize: 12,
                },
              })}
            >
              {product.title}
            </Text>
            <Text size={12}>
              {product.mainProduct.price.$numberDecimal + " KR"}{" "}
            </Text>
          </Flex>
        </Flex>
      </td>
      <td>
        <Text size={11}>{product.partNo}</Text>
      </td>

      <td>
        <Text size={11}>{product.mainProduct.category.title}</Text>
      </td>
      <td>
        <Text size={11}>{product.reservedQty}</Text>
      </td>
      <td>
        <Text size={11}>{product.availableQty}</Text>
      </td>
    </tr>
  );
};

export default OverviewProduct;
